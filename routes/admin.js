const admin = require('express').Router()
const { AdminController } = require('../controllers')

admin.post('/register', AdminController.registerAdmin)
admin.post('/login', AdminController.loginAdmin)

module.exports = admin
