const application = require('express').Router()
const { ApplicationController, UserController } = require('../controllers')
const {
  authorizeApplicationUser,
  authorizeApplicationAdmin,
} = require('../middlewares/auth')

application.post('/', ApplicationController.createNewApplication)

application.get(
  '/',
  authorizeApplicationAdmin,
  ApplicationController.getAllApplications
)
application.get(
  '/fintech/:fintech_id',
  authorizeApplicationAdmin,
  ApplicationController.getAllFintechApplications
)
// application.get('/user/:user_id', ApplicationController.getAllUserApplications)
application.get('/user', ApplicationController.getAllUserApplications)

application.patch(
  '/:id/decision',
  authorizeApplicationAdmin,
  ApplicationController.updateApplicationDecision
)
application.patch(
  '/:id/status',
  authorizeApplicationUser,
  ApplicationController.updateApplicationStatus
)

application.get(
  '/:id',
  authorizeApplicationUser,
  ApplicationController.getApplicationById
)

application.post('/sendpush', UserController.sendPushNotification)

module.exports = application
