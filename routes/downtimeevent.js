const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

// Bring in downtimeevent model
let Downtimeevent = require('../models/downtimeevents');

// Single event Route
router.get('/id/:id', function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('downtimeevent',{
            downtimeevent:downtimeevent  
        });
    });
});

//Add submit downtime event Route
router.get('/submit', ensureAuthenticated, function(req, res){
    res.render('submit', {
        title: 'Submit entry',
    });
});


// Edit downtimeevents route
router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('edit_downtimeevent',{
            title:'Edit Downtimeevent',
            downtimeevent:downtimeevent  
        });
    });
});

// Archive downtimeevents route
router.get('/archive/:id', ensureAuthenticated, function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('archive_downtimeevent',{
            title:'Archive Downtime event',
            downtimeevent:downtimeevent  
        });
    });
});

// Resurect downtimeevents route
router.get('/resurrect/:id', ensureAuthenticated, function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('resurrect_downtimeevent',{
            title:'Resurrect Downtime event',
            downtimeevent:downtimeevent  
        });
    });
});

// Add Submit POST Route
router.post('/submit', ensureAuthenticated, function(req, res){
    req.checkBody('code', 'Event code is required').notEmpty();
    req.checkBody('machine', 'Machine is required').notEmpty();
    req.checkBody('operator', 'Reported by is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('date', 'Date is required (format YYYY-MM-DD)').notEmpty();
    //req.checkBody('time', 'Time is required').notEmpty();
    req.checkBody('time', 'Time is required (format HH:MM)').matches('([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}');
    req.checkBody('duration', 'Duration is required').notEmpty();
    //Get errors
    let errors = req.validationErrors();
    if(errors){
        res.render('submit', {
            title:'Submit entry',
            errors:errors
        })
    } else { 
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
                req.flash('success', 'Downtimeevent added to database');
                res.redirect('/');
            }
        });
    }
});

// update Submissions POST Route
router.post('/edit/:id', ensureAuthenticated, function(req, res){
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
            req.flash('warning', 'Downtime event updated');
            res.redirect('/');
        }
    });
});

// archive Submissions POST Route
router.post('/archive/:id', ensureAuthenticated, function(req, res){
    let downtimeevent  = {}
    downtimeevent.archived = req.body.archived;

    let query ={_id:req.params.id};

    Downtimeevent.update(query, downtimeevent, function(err){
        if(err){
            console.log(err);
        } else{
            req.flash('danger', 'Downtime event archived');
            res.redirect('/');
        }
    });
});

// archive Submissions POST Route
router.post('/resurrect/:id', ensureAuthenticated, function(req, res){
    let downtimeevent  = {}
    downtimeevent.archived = req.body.archived;

    let query ={_id:req.params.id};

    Downtimeevent.update(query, downtimeevent, function(err){
        if(err){
            console.log(err);
        } else{
            req.flash('danger', 'Downtime event resurrected');
            res.redirect('/');
        }
    });
});

function ensureAuthenticated(req, res, next){
    try{
        const verified = jwt.verify(req.cookies["jwtToken"], process.env.jwtSecret);
        const groups = verified.groups;
        const filtered = groups.filter(group => group === "Operators");
        if (filtered.length > 0){
            return next();
        }
    }catch(err){
        req.flash('danger', 'Please login');
        res.redirect('/user/login');
    }
}



module.exports = router;
