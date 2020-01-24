const { User, Fintech } = require('../models')
const createError = require('http-errors')

module.exports = {
  async authenticate(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      req.user = user
      next()
    } catch (error) {
      next(error)
    }
  },
  async authorizeUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      if (user) {
        req.user = user
        next()
      } else throw createError(403, 'User banned')
    } catch (error) {
      next(error)
    }
  },
  async authorizeFintech(req, res, next) {
    try {
      const fintech = await Fintech.findById(req.params.id)
      if (!fintech) throw createError(404, 'fintech not found')
      if (fintech) {
        req.fintech = fintech
        next()
      } else throw createError(403, 'Unauthorized access to item')
    } catch (error) {
      next(error)
    }
  },
}
