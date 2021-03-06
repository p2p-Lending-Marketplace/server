const { User, Admin } = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const createError = require('http-errors')
const { Types } = require('mongoose')

const { authenticator } = require('otplib')
const Bull = require('bull')
const otpQueue = new Bull('otp-queue')

const Expo = require('expo-server-sdk').default
const expo = new Expo()

class UserController {
  static async registerPushNotification(req, res, next) {
    try {
      const { token, phone_number } = req.body
      const user = await User.findOneAndUpdate(
        { phone_number },
        { push_token: token },
        { new: true }
      )
      if (user) res.status(200).json({ token })
      else throw createError(404, 'User not found')
    } catch (error) {
      next(error)
    }
  }

  static async sendPushNotification(req, res, next) {
    try {
      const { phone_number, _id, title, sound, body } = req.body
      const user = await User.findOne({
        $or: [{ phone_number }, { _id }],
      })
      if (!user) throw createError(404, 'User not found')
      if (!Expo.isExpoPushToken(user.push_token))
        throw createError(400, 'Invalid expo push token')
      console.log(user)
      const ticket = await expo.sendPushNotificationsAsync([
        {
          data: { _id },
          to: user.push_token,
          data: { _id },
          title,
          body,
          sound: sound || 'default',
        },
      ])
      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  static async checkPhoneNumber(req, res, next) {
    try {
      const { phone_number } = req.body
      const user = await User.findOne({ phone_number })
      if (user) res.status(204).json()
      else throw createError(404, 'Phone number not found')
    } catch (error) {
      next(error)
    }
  }

  static async requestOTP(req, res, next) {
    try {
      authenticator.options = {
        step: 30,
        window: 5,
      }
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
      const { token, phoneNumber } = req.body
      const secret = process.env.OTP_SECRET

      if (authenticator.verify({ token, secret })) {
        User.findOne({ phone_number: phoneNumber }).then(user => {
          if (user) {
            res.status(200).json(user)
          } else {
            res.status(204).json()
          }
        })
      } else throw createError(422, 'Invalid token')
    } catch (error) {
      next(error)
    }
  }

  static async createUser(req, res, next) {
    try {
      const { phone_number, pin } = req.body
      const user = await User.create({ phone_number, pin })
      const token = sign(
        { _id: user._id, role: 'user' },
        process.env.JWT_SECRET
      )
      res.status(201).json({ token })
    } catch (error) {
      next(error)
    }
  }

  // static async createFintechAdmin(req, res, next) {
  //   try {
  //     const { username, password } = req.body
  //     const user = await Admin.create({ username, password })
  //     const token = sign(
  //       { _id: user._id, role: 'admin' },
  //       process.env.JWT_SECRET
  //     )
  //     res.status(201).json({ token })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static async signInAdmin(req, res, next) {
  //   try {
  //     const { username, password } = req.body
  //     const admin = await Admin.findOne({ username })
  //     if (admin && (await compare(password, admin.password))) {
  //       const token = sign(
  //         { _id: user._id, role: 'user' },
  //         process.env.JWT_SECRET
  //       )
  //       res.status(200).json({ ...admin, token })
  //     } else throw createError(422, 'Wrong username/password')
  //   } catch (error) {
  //     next(error)
  //   }
  // }

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
        date_of_birth,
        place_of_birth,
        num_id,
        existing_loan_installment,
      } = req.body

      let user = req.user
      if (!user) throw createError(404, 'User not found')

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
      user.date_of_birth = date_of_birth || user.date_of_birth
      user.place_of_birth = place_of_birth || user.place_of_birth
      user.num_id = num_id || user.num_id
      user.existing_loan_installment =
        existing_loan_installment || user.existing_loan_installment

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
        const token = sign(
          { _id: user._id, role: 'user' },
          process.env.JWT_SECRET
        )
        res.status(200).json({ token })
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
      let user = req.user
      // if (!user || req.params.id) {
      //   user = await User.findById(req.params.id)
      // }
      if (user) res.status(200).json(user)
      else throw createError(404, 'User not found')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
