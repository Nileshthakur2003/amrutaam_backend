const express = require('express');
const router = express.Router();
const { createPatient , getPatient, getAllPatient , removePatient } = require('../controllers/patientController');

router.post('/createPatient', createPatient);
router.post('/getPatientById', getPatient);
router.post('/getAllPatient', getAllPatient);
router.post('/removePatient', removePatient);

module.exports = router;
