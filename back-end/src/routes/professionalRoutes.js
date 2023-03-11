const express = require('express');
const patientController = require('../controllers/patientControllers');
const { body } = require('express-validator');
const router = new express.Router();

router.get('/api/professional/appointments',
    patientController.registerPatient
);

router.post('/api/patient/login',
    body('username').not().isEmpty().escape(),
    body('password').not().isEmpty().escape(),
    patientController.signInPatient
);

module.exports = router;