const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

// Hashing the passwords
const signToken = (payload) => jwt.sign(payload, secret)
const verifyToken = (token) => jwt.verify(token, secret, (err, res) => {
    if(err) throw err
    return res
})

module.exports = {
    signToken,
    verifyToken
}