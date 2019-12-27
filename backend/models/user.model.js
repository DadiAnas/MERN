const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const Genders = Object.freeze({
  Male: 'male',
  Female: 'female',
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  gender:{
    type: String,
    enum: Object.values(Genders),
  },
  dob:{
    type: Date,
    required: true,

  },
  news:{
    type: Boolean,
    required: true,
  },
  email:{
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  photo:{
    type:String,
    
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;