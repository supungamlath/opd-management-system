const express = require('express');
const appointmentController = require('../controllers/appointmentControllers');
const { body } = require('express-validator');
const router = new express.Router();

router.post('/api/appointment/create',
    body('appointment_date').not().isEmpty().isISO8601('yyyy-mm-dd').escape(),
    body('appointment_time').not().isEmpty().escape(),
    body('patient_ID').not().isEmpty().escape(),
    body('professional_ID').not().isEmpty().escape(),
    body('status').not().isEmpty().escape(),
    appointmentController.createAppointment
);

router.get('/api/appointment/get_appointments',
    appointmentController.getAppointments
);

router.post('/api/appointment/edit',
    body('appointment_ID').not().isEmpty().escape(),
    body('appointment_date').not().isEmpty().isISO8601('yyyy-mm-dd').escape(),
    body('appointment_time').not().isEmpty().escape(),
    appointmentController.editAppointment
);

module.exports = router