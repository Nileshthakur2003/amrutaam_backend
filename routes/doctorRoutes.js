const express = require('express');
const router = express.Router();
const { createDoctor, getAllDoctors, getDoctor , removeDoctor } = require('../controllers/doctorController');

router.post('/createDoctor', createDoctor);
router.post('/getDoctorById', getDoctor);
router.post('/getAllDoctors', getAllDoctors);
router.post('/removeDoctor', removeDoctor);

module.exports = router;
