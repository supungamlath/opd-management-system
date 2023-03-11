const server_config = {
    port: process.env.PORT || 5000
}

const admin_config = {
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"OPDdb"
}

const patient_config = {
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"OPDdb"
}

const prof_config = {
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"OPDdb"
}

const root_config = {
    host:"localhost",
    user:"root",
    password:"root",
    database:"OPDdb"
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