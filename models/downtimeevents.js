let mongoose = require('mongoose');

// downtime entry structure schema
let downtimeeventSchema= mongoose.Schema({
    code:{
        type: String,
        required: false
    },
    machine:{
        type: String,
        required: false
    },
    operator:{
        type: String,
        required: false
    },
    description:{
        type:String,
        required: false
    },
    date:{
        type:String,
        required: false
    },
    time:{
        type:String,
        required: false
    },
    duration:{
        type:Number,
        required: false
    }
});

let downtimeevent = module.exports = mongoose.model('downtimeevent',downtimeeventSchema);
