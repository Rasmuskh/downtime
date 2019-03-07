const mongoose = require('mongoose');
const dbURL =  process.env.DBURL || "mongodb://localhost/maxivkb";
mongoose.connect(dbURL);
module.exports = {
    database: dbURL,
    secret: 'mySecret'
};
