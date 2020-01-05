'use strict'

const RatesController = require('../Controllers/rates')

module.exports =
    [
        {
            method: "GET",
            path: "/exchange",
            handler: RatesController.getExchange
        },
        {
            method: "GET",
            path: "/rate_details",
            handler: RatesController.getRateDetails
        },
        {
            method: "POST",
            path: "/create_rate",
            handler: RatesController.createRate
        }
    ]