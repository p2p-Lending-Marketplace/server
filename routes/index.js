const routes = require('express').Router()
const { authenticate } = require('../middlewares/auth')

routes.use('/user', require('./user'))
routes.use('/fintech', require('./fintech'))
routes.use('/application', authenticate, require('./application'))
routes.use('/admin', require('./admin'))
routes.use('/scoring', require('./scoring'))

module.exports = routes
