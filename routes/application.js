const application = require('express').Router()
const { ApplicationController } = require('../controllers')
const { authorizeFintech } = require('../middlewares/auth')

application.post('/', ApplicationController.createNewApplication)
application.get('/', ApplicationController.getAllApplications)
application.get('/fintech/:id', ApplicationController.getAllFintechApplications)
application.get('/user/:id', ApplicationController.getAllUserApplications)
application.patch('/:id', ApplicationController.updateApplicationDecision)

module.exports = application