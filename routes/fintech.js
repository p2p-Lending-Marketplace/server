const fintech = require('express').Router()
const { FintechController } = require('../controllers')
const { authorizeFintech } = require('../middlewares/auth')

fintech.get('/', FintechController.getAllFinteches)
fintech.post('/', FintechController.addNewFintech)

fintech.get('/:id', FintechController.getFintechById)

fintech.patch('/:id', authorizeFintech, FintechController.updateFintechData)

module.exports = fintech
