"use strict"

const hapi = require("hapi")
const routes = require('./routes/routes')

const server = hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
})

const init = async () => {
    try {
        server.route(routes)
        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    console.log("The server is on")
}

init()