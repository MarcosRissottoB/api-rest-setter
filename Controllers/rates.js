'use strict'

const Exchange = require('../models/Exchange');
const FixerService = require('../services/FixerServices')

const exchange = async (req, h) => {
    try {
        const { base, symbols } = req.query
        const exchange = await FixerService.rates(base, symbols)
        return h.response({ 'exchange': exchange }).code(200)
    } catch (error) {
        return h.response(error).code(500);
    }
}

const rateDetails = async (req, h) => {
    try {
        console.log('listExchanges 2')
        const listExchanges = await Exchange.find({}).exec()
        console.log('listExchanges 3', listExchanges)
        // return h.response({ 'listExchanges:': listExchanges }).code(200);
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
        const serchUpdatedExchange = await FixerService.rates(base, symbol)
        console.log('serchAndUpdateExchange', serchUpdatedExchange)
        const originalRate = serchUpdatedExchange.rates[symbol]
        const feeAmount = originalRate * feeConvertToNumber
        const finalRate = originalRate + feeAmount
        console.log('feeAmount', feeAmount, `${base}/${symbol}`)
        const updatedData = {
            fee: feeConvertToNumber,
            feeAmount,
            finalRate,
        }
        console.log('updatedData', updatedData)
        // const exchangeDB = new ExchangeDB()
        const updatedExchange = await Exchange.updateOne({ pair: `${base}/${symbol}` }, updatedData)
        // const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
        // db.Employee.update(
        //     {"Employeeid" : 1},
        //     {$set: { "EmployeeName" : "NewMartin"}});
        return h.response({ 'Created rate...': updatedExchange }).code(200)
    } catch (error) {
        console.log(error)
        return h.response({ 'Error': error }).code(500)
    }
}

module.exports = {
    exchange,
    rateDetails,
    createRate,
};