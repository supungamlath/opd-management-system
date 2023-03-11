const express = require('express');
const commonController = require('../controllers/commonControllers');
const { body } = require('express-validator');
const router = new express.Router();

router.post('/api/common/login',
    body('username').not().isEmpty().escape(),
    body('password').not().isEmpty().escape(),
    commonController.signInUser
);

module.exports = router;