const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get all tasks for req.user
const getTasks = async (req, res) => {
  const user_id = req.user._id;
  const tasks = await Task.find({user_id}).sort({createdAt: -1})

  res.status(200).json(tasks)
}

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// create a new task
const createTask = async (req, res) => {
  const {title, description, color} = req.body
  let emptyFields = [];

  for(let [field,value] of Object.entries(req.body)){
    // check if task contains missing fields, submitted by user
    if(!value || value === ''){
      emptyFields.push(field);
    }
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: `Please fill in the missing fields.`, emptyFields})
  }


  // add to the database
  try {
    const user_id = req.user._id;
    const task = await Task.create({ title, description, color, user_id })
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such task'})
  }

  const task = await Task.findOneAndDelete({_id: id})

  if(!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such task'})
  }

  const task = await Task.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  // return the updated task (task still has old properties)
  const updatedTask = Object.assign(task, req.body);
  res.status(200).json(updatedTask)
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
}