'use strict'

const mongoose = require("mongoose")
const schema = mongoose.Schema

const ExchangeSchema = new schema({
    pair: String,
    baseCurrency: String,
    targetCurrency: String,
    originalRate: Number,
    fee: Number,
    feeAmount: Number,
    finalRate: Number,
});

module.exports = mongoose.model('Exchange', ExchangeSchema)