const { validationResult } = require('express-validator');

const { verifyHeader } = require('../services/jwt')
const { Professional } = require('../models/professional');


const registerProfessional = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const systemAdmin = verifyHeader(req);
            if (systemAdmin) {
                const professional = Professional.createFromRequest(req)
                await professional.save()
                res.status(200).json({
                    message: 'Professional registered successfully',
                });
            } else {
                res.status(500).send('Unauthorized access!');
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(500).send('User already exists!');
            }
            else {
                res.status(500).send('Error adding user!');
            }
        }
    }
}

module.exports = {
    registerProfessional
}