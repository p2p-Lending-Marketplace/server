const user = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

user.get('/', UserController.getAllUser)
user.post('/', UserController.createUser)
user.post('/signin', UserController.signInUser)

user.patch('/:id', authenticate, UserController.updateUserDetail)
user.patch('/:id/phone', authenticate, UserController.updateUserPhoneNumber)

module.exports = user
