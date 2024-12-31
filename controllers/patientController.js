const Patient = require('../models/Patient');
const { v4: uuidv4 } = require('uuid');

exports.createPatient = async (req, res) => {
  try {
    let uniquePatientId;
    let isUnique = false;

    // Generate a unique patientId and ensure it's not already taken
    while (!isUnique) {
      uniquePatientId = uuidv4();
      const existingPatient = await Patient.findOne({ patientId: uniquePatientId });
      if (!existingPatient) {
        isUnique = true;
      }
    }

    const patient = new Patient({ ...req.body, patientId: uniquePatientId });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getPatient = async (req, res) => {
  try {
    let exists = true;
      const uniquePatientId = req.body.patientId;
      const existingPatient = await Patient.findOne({ patientId: uniquePatientId });
      if (!existingPatient) {
        exists = false;
      }
    

    if(exists){
      res.status(200).json(existingPatient);
    }else{
      res.status(200).json({
        "patientId":uniquePatientId,
        "exists":"0"
      });
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPatient = async (req, res) => {
  try {
   
      const patientList = await Patient.find();
      res.status(200).json(patientList);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.removePatient = async (req, res) => {
  try {
      const uniquePatientId = req.body.patientId;
      const patient = await Patient.findOne({ patientId: uniquePatientId });
      const response = await Patient.findByIdAndDelete(patient._id);
      res.status(200).json(response);
      
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};