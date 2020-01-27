const { User, Fintech, Application, Admin } = require('../models')
const createError = require('http-errors')
const { verify } = require('jsonwebtoken')

module.exports = {
  async authenticate(req, res, next) {
    try {
      const { token } = req.headers
      const payload = verify(token, process.env.JWT_SECRET)
      if (payload.role === 'user') {
        const user = await User.findById(payload._id)
        req.user = user
      }
      if (payload.role === 'admin') {
        const admin = await Admin.findById(payload._id)
        req.admin = admin
      }
      next()
    } catch (error) {
      next(error)
    }
  },
  async authorizeUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) throw createError(404, 'User not found')
      if (req.admin) {
        req.user = user
        next()
      } else throw createError(403, 'Access not granted')
    } catch (error) {
      next(error)
    }
  },
  async authorizeFintech(req, res, next) {
    try {
      const fintech = await Fintech.findById(req.params.id)
      if (!fintech) throw createError(404, 'Fintech not found')
      if (req.admin) {
        req.fintech = fintech
        next()
      } else throw createError(403, 'Access not granted')
    } catch (error) {
      next(error)
    }
  },
  async authorizeApplication(req, res, next) {
    try {
      const application = await Application.findById(req.params.id)
      if (!application) throw createError(404, 'application not found')
      const { decision, status } = req.body
      if (decision && req.admin) {
        req.application = application
        next()
      } else if (status && req.user) {
        req.application = application
        next()
      } else throw createError(403, 'Unauthorized access to item')
    } catch (error) {
      next(error)
    }
  },
}
