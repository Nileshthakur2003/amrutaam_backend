const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  patientId:{type:String , required:true },
  name: { type: String, required: true },
  wallet: { type: Number, required: true, default: 0 },
  age: {type:Number, required:true },
  adress:{type:String},
  gender:{type:String, required:true}
});


module.exports = mongoose.model('Patient', patientSchema);
