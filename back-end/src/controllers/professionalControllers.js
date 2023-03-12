const { validationResult } = require('express-validator');

const { verifyHeader } = require('../services/jwt')
const { Appointment } = require('../models/appointment');


const getAppointments = async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.send(errors.array()[0].msg);
    } else {
        try {
            const professional = verifyHeader(req);
            console.log(professional);
            if (professional) {
                // TODO - Implement this
                // const appointments = Appointment.findByProfessional_ID(professional.professional_ID)
                res.status(200).json({
                    message: 'Appointments retrieved succesfully',
                    // data: { 'rows': appointments }
                    data: { 'rows': {} }
                });
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


module.exports = {
    getAppointments,
    editAppointmentStatus,
    getPatientDetails
}