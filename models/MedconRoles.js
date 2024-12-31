const mongoose = require('mongoose');
const rolesSchema = new mongoose.Schema({
  personId:{type:String , required:true },
  username: { type: String, required: true },
  password: { type: String, required:true },
  role:{type: String, required:true},
  roleId: {type: String, required:true},
  tempcreds:  [{type:String}],
  status:{type:Boolean , required:true}
});
module.exports = mongoose.model('Roles', rolesSchema);
