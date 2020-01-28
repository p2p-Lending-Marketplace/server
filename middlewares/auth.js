const { User, Fintech, Application, Admin } = require('../models')
const createError = require('http-errors')
const { verify } = require('jsonwebtoken')

module.exports = {
  async authenticate(req, res, next) {
    try {
      const { token } = req.headers
      const payload = verify(token, process.env.JWT_SECRET)
      // console.log('payload => ', payload)
      if (payload.role === 'user') {
        const user = await User.findById(payload._id)
        req.user = user
      }
      if (payload.role === 'admin') {
        const admin = await Admin.findById(payload._id)
        req.admin = admin
      }
      if (payload.role == 'fintech') {
        const fintech = await Fintech.findById(payload._id)
        req.fintech = fintech
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
      if (req.admin) {
        if (req.params.id) {
          const fintech = await Fintech.findById(req.params.id)
          if (fintech) {
            req.fintech = fintech
            next()
          } else throw createError(404, 'Fintech not found')
        } else next()
      } else throw createError(403, 'Access not granted')
    } catch (error) {
      next(error)
    }
  },
  async authorizeApplicationUser(req, res, next) {
    try {
      const application = await Application.findById(req.params.id)
      if (!application) throw createError(404, 'application not found')
      if (
        req.admin ||
        (req.user && application.user_id == req.user.id) ||
        (req.fintech && application.fintech_id == req.fintech.id)
      ) {
        req.application = application
        next()
      } else createError(403, 'Access not granted')
    } catch (error) {
      next(error)
    }
  },
  async authorizeApplicationAdmin(req, res, next) {
    try {
      if (req.admin || req.fintech) {
        if (req.params.id) {
          const application = await Application.findById(req.params.id)
          if (!application) throw createError(404, 'application not found')
          else {
            req.application = application
          }
        }
        next()
      } else throw createError(403, 'Access not granted')
    } catch (error) {
      next(error)
    }
  },
}
