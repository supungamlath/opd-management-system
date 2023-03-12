const { validationResult } = require('express-validator');

const { verifyHeader } = require('../services/jwt')
const { Appointment } = require('../models/appointment');
const { Record } = require('../models/patient_record');
const { Patient } = require('../models/patient')


const getAppointments = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const professional = verifyHeader(req);
            if (professional && professional.role === 'Doctor') {
                const appointments = await Appointment.findAllByProfessional_ID(professional.professional_ID);
                appointments.forEach(function (element) {
                    element.id = element.appointment_ID;
                });
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    data: { 'rows': appointments }
                });
            }
            else {
                res.status(500).send('Unauthorized access!');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in retrieving appointments');
        }

    }
}

const editAppointmentStatus = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const appointment = Appointment.findByAppointmentID(req.appointment_ID)
            if (appointment) {
                appointment.status = req.status
            } else {
                res.status(500).send('Invalid Appointment');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in changing appointment status');
        }
    }
}

const getPatientDetails = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const professional = verifyHeader(req);
            if (professional) {
                const patient = Patient.findByPatientID(req.patient_ID)
                if (patient) {
                    res.status(200).json({
                        message: 'Patient retrieved succesfully',
                        data: patient
                    });
                } else {
                    res.status(500).send('Invalid Patient');
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in retrieving Patient details');
        }
    }
}

const getPatientAppointments = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const professional = verifyHeader(req);
            if (professional) {
                const appointments = await Appointment.findAllByPatientID(req.body.patient_id);
                appointments.forEach(function (element) {
                    element.id = element.appointment_ID;
                });
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    data: { 'rows': appointments }
                });
            }
            else {
                res.status(500).send('Unauthorized access!');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in retrieving Patient appointments');
        }
    }
}

const getPatientRecords = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const professional = verifyHeader(req);
            if (professional) {
                const records = await Record.findAllByProfessional_ID(req.body.professional_ID);
                res.status(200).json({
                    message: 'Records retrieved succesfully',
                    data: { 'rows': records }
                });
            }
            else {
                res.status(500).send('Unauthorized access!');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in retrieving Patient records');
        }
    }
}

module.exports = {
    getAppointments,
    editAppointmentStatus,
    getPatientDetails,
    getPatientAppointments,
    getPatientRecords,
}