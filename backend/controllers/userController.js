const Task = require('../models/taskModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// creates a jwt token given a users id
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: '1d' //token lasts 1 day
    })
}

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try{
    const user = await User.login(email, password);
    // create and return email and jwt token
    const token = createToken(user._id);
    res.status(200).json({email, token});
  }
  catch(error){
    res.status(400).json({error: error.message});
  }
}

const signupUser = async (req, res) => {
  const {email, password} = req.body;
  try{
    const user = await User.signup(email, password);
    // create and return email and jwt token
    const token = createToken(user._id);
    res.status(200).json({email, token});
  }
  catch(error){
    res.status(400).json({error: error.message});
  }
}

module.exports = {signupUser, loginUser}