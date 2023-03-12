const { validationResult } = require('express-validator');

const { verifyHeader } = require('../services/jwt')
const { Appointment } = require('../models/appointment');

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
                const appointments = Appointment.findByPatientID(patient.ID)
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

const editAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const patient = verifyHeader(req);
            if (patient) {
                const appointments = Appointment.findByAppointmentID(req.appointment_ID)
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    data: { 'rows': appointments }
                });
            }
        } catch (error) {

        }
    }
}

module.exports = {
    createAppointment,
    getAppointments,
    editAppointment
}