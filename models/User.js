const { Schema, model, models } = require('mongoose')
const validate = require('mongoose-validator')
const { hash } = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: [
      validate({ validator: 'isEmail', message: 'Invalid email format' }),
      {
        async validator(val) {
          const user = await models.User.findOne({ email: val })
          if (user) return true
          return false
        },
        msg: 'Email already registered',
      },
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone_number: {
    type: String,
    validate: [
      validate({
        validator: 'isMobilePhone',
        arguments: 'id-ID',
        message: 'Invalid phone number format',
      }),
    ],
  },
  address: {
    type: String,
    validate: [validate({ validator: 'isURL' })],
  },
  photo_url: {
    type: String,
    validate: [validate({ validator: 'isURL' })],
  },
  ktp_url: {
    type: String,
    validate: [validate({ validator: 'isURL' })],
  },
  slip_gaji_url: {
    type: String,
    validate: [validate({ validator: 'isURL' })],
  },
  current_job: String,
  salary: Number,
})

userSchema.pre('save', async next => {
  this.password = await hash(this.password, 10)
  next()
})

module.exports = model('User', userSchema)
