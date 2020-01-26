const routes = require('express').Router()

routes.use('/user', require('./user'))
routes.use('/fintech', require('./fintech'))
routes.use('/application', require('./application'))

module.exports = routes
