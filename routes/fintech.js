const fintech = require('express').Router()
const { FintechController } = require('../controllers')
const { authorizeFintech } = require('../middlewares/auth')
const upload = require('../middlewares/gcsUpload')

fintech.get('/', FintechController.getAllFinteches)
fintech.post('/', FintechController.addNewFintech)

fintech.get('/:id', FintechController.getFintechById)

fintech.patch('/:id', authorizeFintech, FintechController.updateFintechData)
// fintech.patch(
//   '/:id/rates',
//   authorizeFintech,
//   FintechController.updateFintechRates
// )

module.exports = fintech
