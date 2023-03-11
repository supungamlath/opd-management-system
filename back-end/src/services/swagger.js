const swaggerJSDocs = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kernel Panic Backend API',
            version: '1.0.0',
            description: 'The NodeJS Express API for OPD Management System',
        },
        servers: [
            {
                url: "http://localhost:8080/",
                description: "Local server"
            }
        ]
    },
    apis: ["./src/docs/*.yaml"]  //Routes locations for JSDoc matcher. Should start from root folder
}

const swaggerSpecs = swaggerJSDocs(options)

module.exports = {
    swaggerSpecs
}
