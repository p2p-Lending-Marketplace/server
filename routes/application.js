const application = require('express').Router()
const { ApplicationController } = require('../controllers')
const {
  authenticate,
  authorizeApplicationUser,
  authorizeApplicationAdmin,
} = require('../middlewares/auth')

application.use('/', authenticate)
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
application.get('/user/:user_id', ApplicationController.getAllUserApplications)

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

module.exports = application
