const express = require('express');
const appointmentController = require('../controllers/appointmentControllers');
const { body } = require('express-validator');
const router = new express.Router();


router.get('/api/professional/get-appointments',
    appointmentController.getAppointments
);

router.post('/api/professional/get-patient-id',
    body('appointment_ID').not().isEmpty().escape(),
);

module.exports = router;
