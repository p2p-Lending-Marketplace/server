const { Schema, model } = require('mongoose')

const fintechSchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_logo_url: {
    type: String,
    required: [ true, 'Company logo is required' ]
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
})

module.exports = model('Fintech', fintechSchema)
