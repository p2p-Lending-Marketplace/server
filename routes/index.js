const routes = require('express').Router()
const { authenticate } = require('../middlewares/auth')

routes.use('/user', require('./user'))
routes.use('/fintech', require('./fintech'))
routes.use('/application', authenticate, require('./application'))

module.exports = routes
