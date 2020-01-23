const { User } = require('../models')
const { compare } = require('bcryptjs')
const createError = require('http-errors')

class UserController {
  static async createUser(req, res, next) {
    try {
      const { phone_number, pin } = req.body
      const user = await User.create({ phone_number, pin })
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserDetail(req, res, next) {
    try {
      const {
        name,
        email,
        address,
        photo_url,
        id_url,
        salary_slip_url,
        current_job,
        salary,
      } = req.body

      // await User.findByIdAndUpdate(
      //   req.params.id,
      //   {
      //     name,
      //     email,
      //     address,
      //     photo_url,
      //     id_url,
      //     salary_slip_url,
      //     current_job,
      //     salary,
      //   },
      //   {
      //     omitUndefined: true,
      //     new: true,
      //     runValidators: true,
      //     context: 'query',
      //   }
      // )
      let user = req.user

      user.name = name || user.name
      user.email = email || user.email
      user.address = address || user.address
      user.photo_url = photo_url || user.photo_url
      user.id_url = id_url || user.id_url
      user.salary_slip_url = salary_slip_url || user.salary_slip_url
      user.salary = salary || user.salary
      user.current_job = current_job || user.current_job

      user = await user.save()

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserPhoneNumber(req, res, next) {
    try {
      const { phone_number } = req.body
      let user = req.user

      user.phone_number = phone_number

      user = await user.save()
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserPin(req, res, next) {}

  static async signInUser(req, res, next) {
    try {
      const { phone_number, pin } = req.body
      const user = await User.findOne({ phone_number })
      if (user && (await compare(pin, user.pin))) {
        res.status(200).json(user)
      } else throw createError(422, 'Wrong phone_number/pin')
    } catch (error) {
      next(error)
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static async getUserById(req, res, next) {}
}

module.exports = UserController
