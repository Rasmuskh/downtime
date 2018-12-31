let mongoose = require('mongoose');

// deliveryplan entry structure schema
let deliveryplanSchema= mongoose.Schema({
    date:{
        type:String,
        required: false
    },
    R1plan:{
        type: Number,
        required: false
    },
    R3plan:{
        type: Number,
        required: false
    },
    SPFplan:{
        type: Number,
        required: false
    }
});

let deliveryplan = module.exports = mongoose.model('deliveryplan',deliveryplanSchema);
