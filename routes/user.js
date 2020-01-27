const user = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate, authorizeUser } = require('../middlewares/auth')

user.get('/', authenticate, authorizeUser, UserController.getAllUser)
user.post('/', UserController.createUser)

user.post('/registerpush', UserController.registerPushNotification)
user.post('/sendpush', UserController.sendPushNotification)

user.post('/checkphone', UserController.checkPhoneNumber)
user.post('/otp', UserController.requestOTP)
user.post('/verify', UserController.verifyOTP)

// user.post('/fintechadmin', UserController.createFintechAdmin)
user.post('/signin', UserController.signInUser)
// user.post('/signadmin', UserController.signInAdmin)

user.get('/detail', authenticate, UserController.getUserById)
user.patch('/:id', authenticate, UserController.updateUserDetail)

module.exports = user
