const user = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

user.get('/', UserController.getAllUser)
user.post('/', UserController.createUser)

user.patch('/:id', authenticate, UserController.updateUserDetail)

module.exports = user
