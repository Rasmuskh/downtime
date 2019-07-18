const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");




dotenv.config();

// Bring in user  model
// let User = require("../models/users");

//Login form
router.get("/login", function(req, res) {
  res.render("login");
});

//Login Process
router.post("/login", function(req, res) {
    login(req, res, req.body.username, req.body.password).then(result => {
        res.send(result);
    });
});

//Logout
router.get("/logout", function(req, res) {
    //Make cookie expire by setting expiration date in the past
    //https://expressjs.com/en/api.html#res.cookie
    res.cookie('jwtToken', "", {expires: new Date(Date.now()-10^8)});
    res.cookie('authenticated', 'false');
    req.flash('success', 'You have logged out!');
    res.redirect("/");
});


/**
 * Uses an external service to perform a AD/LDAP user authentication.
 * Returns a promise that resolves to:
 * {
 *  authenticated: boolean,
 *  jwtToken: string
 * }
 * The jwtToken is meant to be used to subsequent to auth, which verifies
 * that the user is part of the 'Operator' group
 * @param {string} username
 * @param {string} password
 */
async function login(req, res, username, password) {
  try {
    const res = await axios.post("https://jwt-auth.maxiv.lu.se/v1/login", {
      username: username,
      password: password
    });
    jwtDecoded = jwt.verify(res.data.jwt, process.env.jwtSecret);
    const groups = jwtDecoded.groups;
    const filtered = groups.filter(group => group === "Operators");
    if (filtered.length > 0){
        req.flash('success', 'You have logged in!');   
    }
    return {authenticated: filtered.length > 0, jwtToken: res.data.jwt};
  } catch (err) {
    return {
      authenticated: false,
      jwtToken: ""
    };
  }
}

/**
 * Decrypts the jwtToken and returns true iff the user belongs to the group 'Operator'
 */
// function auth(jwtToken) {
//   try {
//     const data = jwt.verify(jwtToken, process.env.jwtSecret);
//     const groups = data.groups;
//     const filtered = groups.filter(group => group === "Operators");
//     return filtered.length > 0;
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// }

module.exports = router;
