const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

// GET all tasks
router.get('/', taskController.getTasks)

// GET a single task
router.get('/:id', taskController.getTask)

// POST a new task
router.post('/', taskController.createTask)

// DELETE a task
router.delete('/:id', taskController.deleteTask)

// UPDATE a task
router.patch('/:id', taskController.updateTask)

module.exports = router