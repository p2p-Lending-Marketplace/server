const { Admin, Fintech, Application } = require('../models')
const createError = require('http-errors')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class AdminController {
  static async loginAdmin(req, res, next) {
    try {
      const { username, password } = req.body
      const admin = await Admin.findOne({ username })
      const fintech = await Fintech.findOne({ username })
      if (admin && (await compare(password, admin.password))) {
        const token = sign(
          {
            _id: admin._id,
            role: 'admin',
          },
          process.env.JWT_SECRET
        )
        res.status(200).json({
          ...admin._doc,
          role: 'admin',
          token,
        })
      } else if (fintech && (await compare(password, fintech.password))) {
        const token = sign(
          {
            _id: fintech._id,
            role: 'fintech',
            fintech_id: admin.fintech_id || undefined,
          },
          process.env.JWT_SECRET
        )
        res.status(200).json({
          ...admin._doc,
          role: 'fintech',
          token,
        })
      } else throw createError(422, 'Wrong username/password')
    } catch (error) {
      next(error)
    }
  }

  static async getFintechDetail(req, res, next) {
    try {
      const fintech = req.fintech
      const applications = await Application.find({ fintech_id: fintech._id })
      res.status(200).json({ ...fintech._doc, applications })
    } catch (error) {
      next(error)
    }
  }

  static async registerAdmin(req, res, next) {
    try {
      const { username, password } = req.body
      const admin = await Admin.create({ username, password })
      res.status(201).json(admin)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController
