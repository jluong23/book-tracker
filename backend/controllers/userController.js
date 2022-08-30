const Task = require('../models/taskModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const loginUser = async (req, res) => {
  res.json({"msg": "User logged in"})
}

const signupUser = async (req, res) => {
  const {email, password} = req.body;
  try{
    const user = await User.signup(email, password);
    res.status(200).json({user});
  }
  catch(error){
    res.status(400).json({error: error.message});
  }
}

module.exports = {signupUser, loginUser}