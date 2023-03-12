const { validationResult } = require('express-validator');

const { verifyHeader } = require('../services/jwt')
const { Appointment } = require('../models/appointment');
const { Record } = require('../models/patient_record');


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
            const professional = verifyHeader(req);
            if (professional) {
                // TODO - Implement this
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    data: { 'rows': appointments }
                });
            }
        } catch (error) {

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
                // TODO - Implement this
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    data: { 'rows': appointments }
                });
            }
        } catch (error) {

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

        }
    }
}


module.exports = {
    getAppointments,
    editAppointmentStatus,
    getPatientDetails,
    getPatientAppointments,
    getPatientRecords
}