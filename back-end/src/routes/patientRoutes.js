const express = require('express');
const patientController = require('../controllers/patientControllers');
const { body } = require('express-validator');
const router = new express.Router();

router.post('/api/patient/signup',
    body('username').not().isEmpty().escape(),
    body('password').not().isEmpty().escape(),
    body('first_name').not().isEmpty().escape(),
    body('last_name').not().isEmpty().escape(),
    body('nic').not().isEmpty().escape(),
    body('address').not().isEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('gender').not().isEmpty().isIn(['Male', 'Female', 'Other']).escape(),
    body('dob').not().isEmpty().isISO8601('yyyy-mm-dd').escape(),
    patientController.registerPatient
);

router.post('/api/patient/create-appointment',
    body('appointment_date').not().isEmpty().isISO8601('yyyy-mm-dd').escape(),
    body('appointment_time').not().isEmpty().escape(),
    body('patient_ID').not().isEmpty().escape(),
    body('professional_ID').not().isEmpty().escape(),
    body('status').not().isEmpty().isIn(['Pending', 'Accepted', 'Arrived', 'Missed', 'Declined', 'Cancelled', 'Completed']).escape(),
    patientController.createAppointment
);

router.get('/api/patient/get-appointments',
    patientController.getAppointments
);

module.exports = router;