const { Schema, model, models } = require('mongoose')
const validate = require('mongoose-validator')
const { hash } = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator(val) {
        return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(val)
      },
      msg: 'Invalid name format',
    },
  },
  email: {
    type: String,
    validate: [
      validate({ validator: 'isEmail', message: 'Invalid email format' }),
      {
        async validator(val) {
          const user = await models.User.findOne({ email: val })
          if (user && user.id != this.id) return false
          return true
        },
        msg: 'Email already registered',
      },
    ],
  },
  pin: {
    type: String,
    required: true,
    validate: [
      // validate({
      //   validator: 'isNumeric',
      //   arguments: { no_symbols: true },
      //   message: 'pin can only contain number',
      // }),
      // validate({
      //   validator: 'isLength',
      //   arguments: [6, 6],
      //   message: 'pin must have 6 length',
      // }),
      {
        validator(val) {
          if (this.pin && this.pin == val) return true
          return /^[0-9]{6}$/.test(val)
        },
      },
    ],
  },
  phone_number: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isMobilePhone',
        arguments: 'id-ID',
        message: 'Invalid phone number format',
      }),
      {
        async validator(val) {
          const user = await models.User.findOne({ phone_number: val })
          if (user && user.id != this.id) return false
          return true
        },
        msg: 'phone number already registered',
      },
    ],
  },
  address: String,
  photo_url: {
    type: String,
    validate: [validate({ validator: 'isURL' })],
  },
  id_url: {
    type: String,
    validate: [validate({ validator: 'isURL' })],
  },
  salary_slip_url: {
    type: String,
    validate: [validate({ validator: 'isURL' })],
  },
  current_job: String,
  salary: Number,
})

userSchema.pre('save', async function(next) {
  if (/^[0-9]{6}$/.test(this.pin)) this.pin = await hash(this.pin, 10)
  next()
})

module.exports = model('User', userSchema)
