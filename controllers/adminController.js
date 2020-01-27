const { Admin } = require('../models')
const createError = require('http-errors')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class AdminController {
  static async loginAdmin(req, res, next) {
    try {
      const { username, password } = req.body
      const admin = await Admin.findOne({ username })
      if (admin && (await compare(password, admin.password))) {
        const token = sign(
          {
            _id: admin._id,
            role: admin.fintech_id ? 'fintech' : 'admin',
            fintech_id: admin.fintech_id || undefined,
          },
          process.env.JWT_SECRET
        )
        res.status(200).json({ ...admin._doc, token })
      } else throw createError(422, 'Wrong username/password')
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
