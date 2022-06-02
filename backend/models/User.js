const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  numcin: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  password: { type: String, required: true, minlength: 6 }
  
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
