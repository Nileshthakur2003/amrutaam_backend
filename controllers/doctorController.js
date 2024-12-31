const Doctor = require('../models/Doctor');
const { v4: uuidv4 } = require('uuid');

exports.createDoctor = async (req, res) => {
  try {
    let uniqueDoctorId;
    let isUnique = false;

    
    while (!isUnique) {
      uniqueDoctorId = uuidv4();
      const existingDoctor = await Doctor.findOne({ doctorId: uniqueDoctorId });
      if (!existingDoctor) {
        isUnique = true;
      }
    }

    const doctor = new Doctor({ ...req.body, doctorId: uniqueDoctorId });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getDoctor = async (req, res) => {
  try {
    let exists = true;
      const uniqueDoctorId = req.body.doctorId;
      const existingDoctor = await Patient.findOne({ doctorId: uniqueDoctorId });
      if (!existingDoctor) {
        exists = false;
      }
    

    if(exists){
      res.status(200).json(existingDoctor);
    }else{
      res.status(200).json({
        "patientId":uniqueDoctorId,
        "exists":"0"
      });
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getAllDoctors = async (req, res) => {
  try {
   
      const doctorList = await Doctor.find();
      res.status(200).json(doctorList);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.removeDoctor = async (req, res) => {
  try {
      const uniqueDoctorId = req.body.doctorId;
      const doctor = await Doctor.findOne({ doctorId: uniqueDoctorId });
      const response = await Doctor.findByIdAndDelete(doctor._id);
      res.status(200).json(response);
      
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};