const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router()

// GET all books
router.get('/', bookController.getBooks)

// GET a single book
router.get('/:id', bookController.getBook)

// POST a new book
router.post('/', bookController.createBook)

// DELETE a book
router.delete('/:id', bookController.deleteBook)

// UPDATE a book
router.patch('/:id', bookController.updateBook)

module.exports = router