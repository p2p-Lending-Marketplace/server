const admin = require('express').Router()
const { AdminController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

admin.post('/register', AdminController.registerAdmin)
admin.post('/login', AdminController.loginAdmin)

admin.get('/', authenticate, AdminController.getCurrentAuth)

admin.get('/fintechdetail', authenticate, AdminController.getFintechDetail)

module.exports = admin
