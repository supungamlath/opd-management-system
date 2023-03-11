const server_config = {
    port: process.env.PORT || 5000
}

const admin_config = {
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"bank"
}

const patient_config = {
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"bank"
}

const prof_config = {
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"bank"
}

const root_config = {
    host:"localhost",
    user:"root",
    password:"root",
    database:"bank"
}

const secret = 'secret'

module.exports = {
    server_config,
    secret,
    root_config,
    patient_config,
    admin_config,
    prof_config
}