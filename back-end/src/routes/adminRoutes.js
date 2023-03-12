const express = require('express');
const patientController = require('../controllers/patientControllers');
const { body } = require('express-validator');
const router = new express.Router();

router.post('/api/admin/register-professional', // Add correct validation rules
    // body('username').not().isEmpty().escape(),
    // body('password').not().isEmpty().escape(),
    // body('first_name').not().isEmpty().escape(),
    // body('last_name').not().isEmpty().escape(),
    // body('nic').not().isEmpty().escape(),
    // body('address').not().isEmpty().escape(),
    // body('email').isEmail().normalizeEmail(),
    // body('gender').not().isEmpty().isIn(['Male', 'Female', 'Other']).escape(),
    // body('dob').not().isEmpty().isISO8601('yyyy-mm-dd').escape(),
    patientController.registerPatient
);

module.exports = router;