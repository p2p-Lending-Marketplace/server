const decision = require('express').Router();
const { ApplicationController } = require('../controllers');
const { authorizeFintech } = require('../middlewares/auth');

decision.post('/', ApplicationController.createNewApplication)
decision.get('/', ApplicationController.getAllApplications)
decision.get('/fintech/:id', ApplicationController.getAllFintechApplications)
decision.get('/user/:id', ApplicationController.getAllUserApplication)

module.exports = decision