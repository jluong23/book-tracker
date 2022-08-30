const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static methods
userSchema.statics.signup = async function (email, password) {
  // validate inputs
  if(!email || !password){
    throw Error("All fields must be filled.");
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid.');
  }
  if(!validator.isStrongPassword(password)){ 
    throw Error('Password is not strong enough.');
  }
  // check if email already used
  const exists = await this.findOne({email});
  if(exists){
    throw Error(`User ${exists.email} already exists.`);
  }
  let salt = await bcrypt.genSalt();
  let hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email, 
    password: hash
  });
  return user;
}


module.exports = mongoose.model('User', userSchema)