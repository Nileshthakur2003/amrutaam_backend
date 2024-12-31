const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
  tempId: { type: String, required: true },
  tempUser: { type: String, required: true },
  tempToken: { type: String, required: true },
  loginStatus: { type: Boolean, required: true }
});

module.exports = mongoose.model('Temp', tempSchema);
