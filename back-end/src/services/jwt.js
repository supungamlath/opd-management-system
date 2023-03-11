const jwt = require('jsonwebtoken')
require('dotenv').config();

// Hashing the passwords
const secret = process.env.JWT_SECRET
const signToken = (payload) => jwt.sign(payload, secret)
const verifyToken = (token) => jwt.verify(token, secret, (err, res) => {
    if (err) throw err
    return res
})

module.exports = {
    signToken,
    verifyToken
}