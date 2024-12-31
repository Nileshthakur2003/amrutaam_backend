const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  doctorId:{type:String , required:true },
  name: { type: String, required: true },
  consultations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  specialization:{type: String, required:true},
  fees: {type: Number, required:true},
  discountOnFirstVisit: {type:Number, required:true},
  walletBalance:{type:Number, required:true}
});
module.exports = mongoose.model('Doctor', doctorSchema);
