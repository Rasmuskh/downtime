const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config()
mongoose.connect(process.env.DBURL || "mongodb://localhost/maxivkb");
let db = mongoose.connection;


//Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check for DB erros
db.on('error', function(err){
    console.log('db error');
    console.log(err);
});

// Initialize app
const app = express();

// Bring in Models
let Downtimeevent = require('./models/downtimeevents');
let Deliveryplan = require('./models/deliveryplans');

// Load view enginec  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
 }));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.lengh) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

// Passport Config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});



//====================================
// Home Route
app.get('/',function(req, res){
    //Make downtime collection accessible
    Downtimeevent.find({}, function(err,downtimeevents){
        if(err){
            console.log(err);
        }
        //Make deliveryplan collection accessible
        Deliveryplan.find({}, function(err,deliveryplans){
            if(err){
                console.log(err);
            } else{
                res.render('index',{
                    downtimeevents:downtimeevents,
                    deliveryplans:deliveryplans,
                });
            }
        });
    });
});

//====================================
// Archived events Route
app.get('/archive',function(req, res){
    Downtimeevent.find({}, function(err,downtimeevents){
        if(err){
            console.log(err);
        } else{
            res.render('archive',{
                downtimeevents:downtimeevents
            });
        }
    });
});

//====================================
//delivery plan Route
app.get('/schedule', ensureAuthenticated, function(req, res){
    Deliveryplan.find({}, function(err,deliveryplans){
        if(err){
            console.log(err);
        } else{
            res.render('schedule',{
                deliveryplans:deliveryplans
            });
        }
    });
});


//Add submit deliveryplan Route
app.get('/schedule/submit', ensureAuthenticated, function(req, res){
    res.render('schedule_submit', {
        title: 'Submit entry',
    });
});


// Add submit deliveryplan POST Route
app.post('/schedule/submit', ensureAuthenticated, function(req, res){
    let deliveryplan = new Deliveryplan();
    deliveryplan.date = req.body.date;
    deliveryplan.R1plan = req.body.R1plan;
    deliveryplan.R3plan = req.body.R3plan;
    deliveryplan.SPFplan = req.body.SPFplan;

    deliveryplan.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect('/schedule');
        }
    });
});

// Edit deliveryplan route
app.get('/schedule/edit/:id', ensureAuthenticated, function(req, res){
    Deliveryplan.findById(req.params.id, function(err, deliveryplan){
        res.render('schedule_edit',{
            title:'Edit Deliveryplan',
            deliveryplan:deliveryplan
        });
    });
});

// update deliveryplan POST Route
app.post('/schedule/edit/:id', ensureAuthenticated, function(req, res){
    let deliveryplan  = {};
    deliveryplan.date = req.body.date;
    deliveryplan.R1plan = req.body.R1plan;
    deliveryplan.R3plan = req.body.R3plan;
    deliveryplan.SPFplan = req.body.SPFplan;

    let query ={_id:req.params.id};

    Deliveryplan.update(query, deliveryplan, function(err){
        if(err){
            console.log(err);
        } else{ 
            res.redirect('/schedule');
        }
    });
});

// delete deliveryplan route
app.delete('/schedule/edit/:id', ensureAuthenticated, function(req, res){
    let query = {_id:req.params.id};

    Deliveryplan.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

//====================================
//Add About Route
app.get('/about',function(req, res){
    res.render('about', {
        title: 'About',
    });
});


function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/user/login');
    }
}

//====================================
// Route files
let downtimeevents = require('./routes/downtimeevent');
let users = require('./routes/user');
app.use('/downtimeevent', downtimeevents);
app.use('/user', users);

//====================================
//start server
const port = process.env.PORT || 8504;
app.listen(port, function(){
    console.log('Server running on http://localhost:' + port);
});
