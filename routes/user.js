const user = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate, authorizeUser } = require('../middlewares/auth')

user.get('/', UserController.getAllUser)
user.post('/', UserController.createUser)

user.post('/otp', UserController.requestOTP)
user.post('/verify', UserController.verifyOTP)

user.post('/signin', UserController.signInUser)

user.get('/:id', authorizeUser, UserController.getUserById)
user.patch('/:id', authorizeUser, UserController.updateUserDetail)
user.patch('/:id/phone', authorizeUser, UserController.updateUserPhoneNumber)
user.patch('/:id/pin', authorizeUser, UserController.updateUserPin)

module.exports = user
