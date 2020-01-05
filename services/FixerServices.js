'use strict'

const axios = require('axios')
const {
    BASE_URL_FIXER,
    FIXER_API_KEY
} = require('./../config')
const ExchangeDB = require('../models/Exchange');

// Atencion
// Por default solo esta tomando como base la monda EURO, las demas monedas, aparecen restringidas.
// 105	The current subscription plan does not support this API endpoint.
const rates = async (base, symbols) => {
    const url = `${BASE_URL_FIXER}latest?access_key=${FIXER_API_KEY}&base=${base}&symbols=${symbols}`
    const response = await axios.get(url)
    const rates = response.data.rates
    Object.entries(rates).forEach(([key, value]) => {
        const exchange = ExchangeDB.findOneAndUpdate({ pair: `${base}/${key}` })
        if (!exchange) {
            const data = {
                pair: `${base}/${key}`,
                baseCurrency: base,
                targetCurrency: key,
                originalRate: value,
                fee: 0,
                feeAmount: 0,
                finalRate: 0,
            }
            ExchangeDB.save(data)
        }
    })
    return response.data
}

module.exports = {
    rates,
};