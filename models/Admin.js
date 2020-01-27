const { Schema, model } = require('mongoose')
const { hash } = require('bcryptjs')

const adminSchema = new Schema({
  username: String,
  password: String,
  fintech_id: {
    type: Schema.Types.ObjectId,
    ref: 'Fintech',
  },
})

adminSchema.pre('save', async function(next) {
  this.password = await hash(this.password, 10)
  next()
})

module.exports = model('Admin', adminSchema)
