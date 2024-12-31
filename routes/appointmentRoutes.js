const express = require('express');
const router = express.Router();
const { createAppointment, getAppointment, getAllAppointments, removeAppointment } = require('../controllers/appointmentController');

router.post('/createAppointment', createAppointment);
router.post('/getAppointmentById', getAppointment);
router.post('/getAllAppointments', getAllAppointments);
router.post('/removeAppointment', removeAppointment);

module.exports = router;
