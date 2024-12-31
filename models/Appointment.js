const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, required:true, unique: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, default: Date.now },
  discountApplied: { type: Boolean, default: false },
  amount: { type: Number, required: true },
  appointmentStatus:{type:Boolean , required:true}
});

module.exports = mongoose.model('Appointment', appointmentSchema);
