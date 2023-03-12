const { validationResult } = require('express-validator');

const { signToken, verifyHeader } = require('../services/jwt')
const { Patient } = require('../models/patient')
const { Professional } = require('../models/professional');
const { System_Admin } = require('../models/system_admin');

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
                    else {
                        throw Error("Invalid User")
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

const getName = async (req, res) => {
    const user = await verifyHeader(req);
    if (user) {

        res.status(200).json({
            name: user.first_name + " " + user.last_name
        });
    }
    else {
        res.status(500).send('Error retrieving name!');
    }
}

module.exports = {
    signInUser,
    getName
}