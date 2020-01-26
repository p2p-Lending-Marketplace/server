const { User } = require('../models')
const { compare } = require('bcryptjs')
const createError = require('http-errors')
const { authenticator } = require('otplib')
const Bull = require('bull')
const otpQueue = new Bull('otp-queue')

class UserController {
  static async requestOTP(req, res, next) {
    try {
      const secret = process.env.OTP_SECRET
      const token = authenticator.generate(secret)

      const phoneNumber = req.body.phoneNumber

      otpQueue.add({ phoneNumber, token })

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  static async verifyOTP(req, res, next) {
    try {
      const { token } = req.body
      const secret = process.env.OTP_SECRET

      if (authenticator.verify({ token, secret })) res.status(204).json()
      else throw createError(422, 'Invalid token')
    } catch (error) {
      next(error)
    }
  }

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
        phone_number,
        pin,
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
      user.phone_number = phone_number || user.phone_number
      user.pin = pin || user.pin
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

  static async getUserById(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
