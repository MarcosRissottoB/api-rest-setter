"use strict"

const hapi = require("hapi")
const routes = require('./routes/routes')
const connectDB = require('./config/database/index');

const server = hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
})

const init = async () => {
    try {
        server.route(routes)
        connectDB();
        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    console.log("The server is on")
}

init()