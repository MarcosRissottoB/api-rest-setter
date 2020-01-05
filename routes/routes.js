'use strict'

const RatesController = require('../Controllers/rates')

module.exports =
    [
        {
            method: "GET",
            path: "/exchange",
            handler: RatesController.exchange
        },
        {
            method: "GET",
            path: "/rate_details",
            handler: RatesController.rateDetails
        },
        {
            method: "POST",
            path: "/create_rate",
            handler: RatesController.createRate
        }
    ]