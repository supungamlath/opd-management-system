const { validationResult } = require('express-validator');

const { verifyToken } = require('../services/jwt')
const { Appointment } = require('../models/appointment');

const createAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const token = req.headers.authorization.replace('Bearer ', '')
            const patient = verifyToken(token);

            if (patient) {
                const appointment = Appointment.createFromRequest(req)
                await appointment.save()
                res.status(200).json({
                    message: 'Appointed created succesfully',
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
            const token = req.headers.authorization.replace('Bearer ', '')
            const patient = verifyToken(token);

            if (patient) {
                const appointments = Appointment.getAppointmentByPatient(patient)
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    data: appointments
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in retrieving appointments');
        }

    }
}
