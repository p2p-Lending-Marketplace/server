const fintech = require('express').Router()
const { FintechController } = require('../controllers')
const { authenticate, authorizeFintech } = require('../middlewares/auth')

fintech.get('/', FintechController.getAllFinteches)
fintech.post(
  '/',
  authenticate,
  authorizeFintech,
  FintechController.addNewFintech
)

fintech.get('/:id', FintechController.getFintechById)

fintech.patch(
  '/:id',
  authenticate,
  authorizeFintech,
  FintechController.updateFintechData
)

module.exports = fintech
