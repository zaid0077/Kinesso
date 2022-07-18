'use strict';
var mongoose = require('mongoose');

module.exports = mongoose.createConnection(process.env.DATABASE_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});