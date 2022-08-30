const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);

module.exports = router