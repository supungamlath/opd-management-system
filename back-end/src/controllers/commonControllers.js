const { validationResult } = require('express-validator');

const { signToken } = require('../services/jwt')
const { Patient } = require('../models/patient');

const signInUser = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            // Find the user in the user table
            const patient = await Patient.findByUsernameAndPassword(req.body.username, req.body.password);

            if (patient) {
                const token = signToken(patient);
                res.status(200).json({
                    message: 'User signed in successfully',
                    token: token,
                    role: "Patient"
                });
            }
            else {

                const professional = await Professional.findByUsernameAndPassword(req.body.username, req.body.password);
                if (professional) {
                    const token = signToken(professional);
                    res.status(200).json({
                        message: 'User signed in successfully',
                        token: token,
                        role: "Professional"
                    });
                }
                else {
                    const system_admin = await System_Admin.findByUsernameAndPassword(req.body.username, req.body.password);
                    if (system_admin) {
                        const token = signToken(system_admin);
                        res.status(200).json({
                            message: 'User signed in successfully',
                            token: token,
                            role: "System_Admin"
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Error signing in user!');
        }
    }
}

module.exports = {
    signInUser
}