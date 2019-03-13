const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in user  model
let User = require('../models/users');

// // Register form
// router.get('/register', function(req, res){
//     res.render('register');
// })

// //Register process
// router.post('/register', function(req, res){
//     const name = req.body.name;
//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;
//     const password2 = req.body.password2;
//     const bcrypt = require('bcryptjs');

//     req.checkBody('name', 'Name is required').notEmpty();
//     req.checkBody('email', 'Email is required').notEmpty();
//     req.checkBody('email', 'Invalid email address').isEmail();
//     req.checkBody('username', 'Username is required').notEmpty();
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('password2', 'passwords do not match').equals(req.body.password);

//     let errors = req.validationErrors();

//     if(errors){
//         res.render('register', {
//             errors:errors
//         });
//     } else {
//         let newUser = new User({
//             name:name,
//             email:email,
//             username:username,
//             password:password
//         });

//         bcrypt.genSalt(10, function(err, salt){
//             bcrypt.hash(newUser.password, salt, function(err, hash){
//                 if(err){
//                     console.log(err);
//                 }
//                 newUser.password = hash;
//                 newUser.save(function(err){
//                     if(err){
//                         console.log(err);
//                         return;
//                     } else {
//                         req.flash('succes', 'You are now registered and can log in');
//                         res.redirect('/user/login');
//                     }
//                 });
//             });
//         });
//     }
// });


//Login form
router.get('/login', function(req, res){
    res.render('login');
});

//Login Process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'login',
        failureFlash: true
    })(req, res, next);
});

//Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('succes', 'You have logged out');
    res.redirect('/user/login');
});

module.exports = router;
