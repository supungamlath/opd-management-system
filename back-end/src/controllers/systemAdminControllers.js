const { validationResult } = require('express-validator');

const { verifyHeader } = require('../services/jwt')
const { Professional } = require('../models/professional');
const { Patient } = require('../models/patient')


const registerProfessional = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const user = verifyHeader(req);
            console.log(user);
            if (user.systemAdmin_ID) {
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

const getSummary = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const user = verifyHeader(req);
            console.log(user);
            if (user.systemAdmin_ID) {
                const professionals = Professional.getAllHP()
                const patients = Patient.getAllPatients()

                res.status(200).json({
                    professionals: professionals.length,
                    patients: patients.length,
                    message: "Summary loaded successfully"
                });
            } else {
                res.status(500).send('Error getting summary details');
            }
        } catch (error) {
            res.status(500).send('Error getting summary details');
        }
    }
}

module.exports = {
    registerProfessional,
    getSummary
}