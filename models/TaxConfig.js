'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var TaxConfigSchema = new mongoose.Schema({
    startingAmount: Number,
    endingAmount : Number,
    totalTax: Number,
    taxPerDollar: Number,
    status: String,
    type: String
});


module.exports = db.model('TaxConfig', TaxConfigSchema);