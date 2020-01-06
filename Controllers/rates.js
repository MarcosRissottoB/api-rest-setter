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
        const pairData = {
            fee: feeConvertToNumber,
            feeAmount,
            finalRate,
            originalRate,
            pair: `${base}/${symbol}`
        }

        let existingPair = await Exchange.findOne({ pair: `${base}/${symbol}` })
        if (existingPair) {
            existingPair = await Exchange.findOneAndUpdate({ pair: `${base}/${symbol}` }, pairData)
            return h.response({ 'Created rate...': existingPair }).code(200)
        }

        const newPair = await Exchange.create(pairData)
        return h.response({ 'Created rate...': newPair }).code(200)
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