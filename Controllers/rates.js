'use strict'

const Exchange = require('../models/Exchange');
const FixerService = require('../services/FixerServices')

const getExchange = async (req, h) => {
    try {
        const { base, symbols } = req.query
        const exchange = await FixerService.rates(base, symbols)
        return h.response({ 'exchange': exchange }).code(200)
    } catch (error) {
        return h.response(error).code(500);
    }
}

const getRateDetails = async (req, h) => {
    try {
        const listExchanges = await Exchange.find({}).exec()
        return h.response({ 'listExchanges:': listExchanges }).code(200);
    } catch (error) {
        console.log('Error: ', error)
        return h.response(error).code(500);
    }
}

const createRate = async (req, h) => {
    try {
        const {
            base,
            symbol,
            fee
        } = req.payload;
        const feeConvertToNumber = Number(fee)
        const serchAndUpdatedExchange = await FixerService.rates(base, symbol)
        const originalRate = serchAndUpdatedExchange.rates[symbol]
        const feeAmount = originalRate * feeConvertToNumber
        const finalRate = originalRate + feeAmount
        const updatedData = {
            fee: feeConvertToNumber,
            feeAmount,
            finalRate,
        }
        const updatedExchange = await Exchange.findOneAndUpdate({ pair: `${base}/${symbol}` }, updatedData)
        return h.response({ 'Created rate...': updatedExchange }).code(200)
    } catch (error) {
        console.log(error)
        return h.response({ 'Error': error }).code(500)
    }
}

module.exports = {
    getExchange,
    getRateDetails,
    createRate,
};