let mongoose = require('mongoose');

// timeline entry structure schema
let timelineSchema= mongoose.Schema({
    date:{
        type: String,
        required: false
    },
    SPF_schedule:{
        type: String,
        required: false
    },
    R1_schedule:{
        type:String,
        required: false
    },
    R3_schedule:{
        type:String,
        required: false
    },
});

let timeline = module.exports = mongoose.model('timeline',timelineSchema);
