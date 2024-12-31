const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { v4: uuidv4 } = require('uuid');


exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, amount } = req.body;

    let doctorExists =true, patientExists = true;
    //  finding Patient

    const existingPatient = await Patient.findOne({ patientId: patientId });
          if (!existingPatient) {
            patientExists = false;
          }

    //  finding Patient

    const existingDoctor = await Doctor.findOne({ doctorId: doctorId });
          if (!existingDoctor) {
            doctorExists = false;
          }

    
  if (!doctorExists || !patientExists) {
        return res.status(404).json({ error: 'Doctor or Patient not found' });
    }      



    const patient = await Patient.findById(existingPatient._id);
    const doctor = await Doctor.findById(existingDoctor._id);

    const discount = doctor.discountOnFirstVisit;
    const fees = doctor.fees;
   

    const existingAppointment = await Appointment.findOne({ doctor: doctor._id, patient: patient._id });
    const discountApplied = !existingAppointment;

    const finalAmount = discountApplied ? (fees-discount) : fees;

    if (patient.wallet < finalAmount) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }


    let uniqueAppointmentId;
    let isUnique = false;
    let existingAppointment_l;
    
    while (!isUnique) {
      uniqueAppointmentId = uuidv4();
      existingAppointment_l = await Appointment.findOne({ appointmentId:uniqueAppointmentId});
      if (!existingAppointment_l) {
        isUnique = true;
      }
    }

    const appointment = new Appointment({
      appointmentId:uniqueAppointmentId,
      doctor: doctor._id,
      patient: patient._id,
      amount: finalAmount,
      discountApplied,
      appointmentStatus:false
    });

    patient.wallet -= finalAmount;
    await patient.save();
    await appointment.save();

    doctor.consultations.push(appointment);
    await doctor.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getAppointment = async (req, res) => {
  try {
    let exists = true;
      const uniqueAppointmentId = req.body.appointmentId;
      const existingAppointment = await Appointment.findOne({ appointmentId: uniqueAppointmentId });
      if (!existingAppointment) {
        exists = false;
      }
    

    if(exists){
      res.status(200).json(existingAppointment);
    }else{
      res.status(200).json({
        "patientId":uniqueAppointmentId,
        "exists":"0"
      });
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
   
      const appointmentList = await Appointment.find();
      res.status(200).json(appointmentList);

  } catch (error) { 
    res.status(400).json({ error: error.message });
  }
};


exports.removeAppointment = async (req, res) => {
  try {
      const uniqueAppointmentId = req.body.appointmentId;
      const appointment = await Patient.findOne({ patientId: uniqueAppointmentId });
      const response = await Patient.findByIdAndDelete(appointment._id);
      res.status(200).json(response);
      
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};