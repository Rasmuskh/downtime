const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');


const dbURL =  process.env.DBURL || "mongodb://localhost/maxivkb";
mongoose.connect(dbURL);
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
let Deliveryplan = require('./model/deliveryplans');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

// Home Route
app.get('/',function(req, res){
    Downtimeevent.find({}, function(err,downtimeevents){
        if(err){
            console.log(err);
        } else{
            res.render('index',{
                downtimeevents:downtimeevents
            });
        }
    });
});

delivery plan Route
app.get('/schedule',function(req, res){
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

// Single event Route
app.get('/downtimeevent/:id', function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('downtimeevent',{
            downtimeevent:downtimeevent  
        });
    });
});

//Add submit Route
app.get('/submit',function(req, res){
    res.render('submit', {
        title: 'Submit entry',
    });
});

// Add Submit POST Route
app.post('/submit',function(req, res){
    let downtimeevent = new Downtimeevent();
    downtimeevent.code = req.body.code;
    downtimeevent.operator = req.body.operator;
    downtimeevent.description = req.body.description;
    downtimeevent.machine = req.body.machine;
    downtimeevent.date = req.body.date;
    downtimeevent.time = req.body.time;
    downtimeevent.duration = req.body.duration;

    downtimeevent.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
});

// Edit events route
app.get('/downtimeevent/edit/:id', function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('edit_downtimeevent',{
            title:'Edit Downtimeevent',
            downtimeevent:downtimeevent  
        });
    });
});

// update Submissions POST Route
app.post('/downtimeevent/edit/:id',function(req, res){
    let downtimeevent  = {}
    downtimeevent.code = req.body.code;
    downtimeevent.machine = req.body.machine;
    downtimeevent.operator = req.body.operator;
    downtimeevent.description = req.body.description;
    downtimeevent.date = req.body.date;
    downtimeevent.time = req.body.time;
    downtimeevent.duration = req.body.duration;

    let query ={_id:req.params.id};

    Downtimeevent.update(query, downtimeevent, function(err){
        if(err){
            console.log(err);
        } else{ 
            res.redirect('/');
        }
    });
});

app.delete('/downtimeevent/:id', function(req, res){
    let query = {_id:req.params.id};

    Downtimeevent.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});


//Add About Route
app.get('/about',function(req, res){
    res.render('about', {
        title: 'About',
    });
});


//start server
const port = process.env.PORT || 8504;
app.listen(port, function(){
    console.log('Server started on port ' + port + '...');
});
