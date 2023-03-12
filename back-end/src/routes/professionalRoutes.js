const express = require('express');
const professionalController = require('../controllers/professionalControllers');
const { body } = require('express-validator');
const router = new express.Router();


router.get('/api/professional/get-appointments',
    professionalController.getAppointments
);

router.post('/api/professional/get-patient-details',
    body('patient_ID').not().isEmpty().escape(),
    professionalController.getPatientDetails
);

router.post('/api/professional/get-patient-appointments',
    body('patient_ID').not().isEmpty().escape(),
    professionalController.getPatientAppointments
);

router.post('/api/professional/get-patient-records',
    body('patient_ID').not().isEmpty().escape(),
    professionalController.getPatientRecords
);

router.post('/api/professional/set-appointment-status',
    body('appointment_ID').not().isEmpty().escape(),
    body('status').not().isEmpty().isIn(['Pending', 'Accepted', 'Arrived', 'Missed', 'Declined', 'Cancelled', 'Completed']).escape(),
    professionalController.setAppointmentStatus
);

module.exports = router;
