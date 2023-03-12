const { validationResult } = require('express-validator');

const { signToken, verifyHeader } = require('../services/jwt')
const { Patient } = require('../models/patient');
const { Appointment } = require('../models/appointment');

const registerPatient = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const patient = Patient.createFromRequest(req);
            await patient.save();
            const token = signToken(patient);
            res.status(200).json({
                message: 'User registered and signed in successfully',
                token: token,
                role: "Patient"
            });
        }
        catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(500).send('User already exists!');
            }
            else {
                res.status(500).send('Error adding user!');
            }
        }
    }
};

const signInPatient = async (req, res) => {
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
                res.status(500).send('Invalid username or password!');
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Error signing in user!');
        }
    }
}

const createAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const patient = verifyHeader(req);
            if (patient) {
                const appointment = Appointment.createFromRequest(req)
                await appointment.save()
                res.status(200).json({
                    message: 'Appointment created succesfully',
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).send('Cannot create appointment');
        }
    }
}

const getAppointments = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const patient = verifyHeader(req);
            if (patient) {
                const appointments = await Appointment.findAllByPatientID(patient.patient_ID);
                appointments.forEach(function (element) {
                    element.id = element.appointment_ID;
                });
                console.log(appointments);
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    data: { 'rows': appointments }
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in retrieving appointments');
        }

    }
}


module.exports = {
    registerPatient,
    signInPatient,
    getAppointments,
    createAppointment,
}