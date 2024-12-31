const Roles = require('../models/MedconRoles');
const { v4: uuidv4 } = require('uuid');
const {hashPassword,verifyPassword} = require('../utils/passwordutils')
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Temp = require('../models/Temp')

exports.createUser = async (req, res) => {
  try {
    const {username, password, role, tempcreds } = req.body;
    
    // Check if personId is unique
    const existingUser = await Roles.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this personId already exists' });
    }

    let uniqueDoctorId;
    let DoctorisUnique = false;
    let uniquePatientId;
    let PatientisUnique = false;
    let finalId;
    

    // 0 - Patients
    // 1 - Doctors


    if(role==1){
       
        while (!DoctorisUnique) {
          uniqueDoctorId = uuidv4();
          const existingDoctor = await Doctor.findOne({ doctorId: uniqueDoctorId });
          if (!existingDoctor) {
            DoctorisUnique = true;
            finalId = uniqueDoctorId;
          }
        }
        
    }else{
          // Generate a unique patientId and ensure it's not already taken
          while (!PatientisUnique) {
            uniquePatientId = uuidv4();
            const existingPatient = await Patient.findOne({ patientId: uniquePatientId });
            if (!existingPatient) {
              PatientisUnique = true;
              finalId = uniquePatientId;
            }
          }
     }

     let uniquePersonId;
     let personIsUnique = false;
      while (!personIsUnique) {
          uniquePersonId = uuidv4();
          const existingPerson = await Roles.findOne({ doctorId: uniquePersonId });
          if (!existingPerson) {
            personIsUnique = true;
          }
      }

    // Create new user
    const newUser = new Roles({
      personId:uniquePersonId,
      username:username,
      password:password,
      role:role,
      roleId:finalId,
      tempcreds:tempcreds,
      status:true
    });

    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error); // Log the error for debugging 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { personId } = req.params;
    const user = await Roles.findOne({ personId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { Username, token } = req.body;

    // Find user by username
    const user = await Roles.findOne({ username: Username });
    if (!user) {
      return res.status(200).json({ status: false, remarks: "Could not authenticate" });
    }

    // Check if the token exists in the user's tempcreds array
    const tokenFound = user.tempcreds.includes(token);
    if (tokenFound) {
      return res.status(200).json({ status: true, remarks: "Authentication Successful" });
    } else {
      return res.status(200).json({ status: false, remarks: "Could not authenticate" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { personId } = req.params;
    const updatedData = req.body;
    
    // Find user and update
    const updatedUser = await Roles.findOneAndUpdate({ personId }, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { personId } = req.params;
    const deletedUser = await Roles.findOneAndDelete({ personId });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await Roles.findOne({ username:username });
    const userId = user._id;
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const uniqueLoginToken = uuidv4();

    user.tempcreds.push(uniqueLoginToken);

    const updatedUser = await Roles.findOneAndUpdate({ _id:userId }, user, { new: true });

    // create a record in the Temp 

    const uniqueTempCredId = uuidv4();

    const createdTempRecord = new Temp({
      tempId:uniqueTempCredId,
      tempToken:uniqueLoginToken,
      tempUser:userId,
      loginStatus:1
    })


    const responseRecorded = await createdTempRecord.save();

    res.status(200).json({ loginStatus:"sucess",token: uniqueLoginToken,username:user.username, others:responseRecorded });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.verifyAndLoginUser = async (req, res) => {
  try {
    const { personId, password } = req.body;
    const user = await Roles.findOne({ personId });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Additional logic for login (e.g., generating a token) can be added here
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
