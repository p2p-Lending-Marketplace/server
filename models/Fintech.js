const { Schema, model, models } = require('mongoose')
// const { hash } = require('bcryptjs')

const fintechSchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  logoURL: {
    type: String,
    required: [true, 'Company logo is required'],
  },
  description: {
    type: String,
    required: true,
  },
  min_interest: {
    type: Number,
    min: 0,
    max: 100,
    validate: [
      {
        validator(val) {
          if (this.max_interest && this.max_interest < val) return false
          return true
        },
        msg: 'min_interest must be lower than max_interest',
      },
    ],
  },
  max_interest: {
    type: Number,
    min: 0,
    max: 100,
    validate: [
      {
        validator(val) {
          if (this.min_interest && this.min_interest > val) return false
          return true
        },
        msg: 'max_interest must be higher than min_interest',
      },
    ],
  },
  total_application: Number,
  avg_credit_score: String,
  percent_acceptance: Number,
  username: {
    type: String,
    validate: [
      {
        async validator(val) {
          const fintech = await models.Fintech.findOne({ username: val })
          if (fintech && fintech.id != this.id) return false
          return true
        },
        msg: 'Username already registered',
      },
    ],
  },
  password: String,
})

// fintechSchema.pre('save', async function(next) {
//   this.password = await hash(this.password, 10)
//   next()
// })

module.exports = model('Fintech', fintechSchema)
