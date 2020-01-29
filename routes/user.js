const user = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate, authorizeUser } = require('../middlewares/auth')
const { Application } = require('../models')
const axios = require('axios')

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

user.get('/:id', authenticate, UserController.getUserById)
user.get('/detail', authenticate, UserController.getUserById)
user.patch('/', authenticate, UserController.updateUserDetail)

user.get('/scoring', authenticate, async function(req, res, next) {
  try {
    let user = req.user
    const applications = await Application.find({ user_id: user.id })
    axios({
      url: 'http://35.187.226.194',
      method: 'POST',
      data: {
        amount: applications[0].amount,
        loan_term: applications[0].loan_term,
        salary: user.salary,
        current_job: user.current_job,
        date_of_birth: user.date_of_birth,
      },
    }).then(({ data }) => {
      res.status(200).send(data)
    })
  } catch (error) {
    next(error)
  }
})

module.exports = user
