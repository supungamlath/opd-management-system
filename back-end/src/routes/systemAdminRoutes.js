const express = require('express');
const systemAdminController = require('../controllers/systemAdminControllers');
const { body } = require('express-validator');
const router = new express.Router();

router.post('/api/admin/register-professional', // Add correct validation rules
    body('username').not().isEmpty().escape(),
    body('password').not().isEmpty().escape(),
    body('first_name').not().isEmpty().escape(),
    body('last_name').not().isEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone_number').not().isEmpty().escape(),
    body('role').not().isEmpty().escape(),
    systemAdminController.registerProfessional
);

module.exports = router;