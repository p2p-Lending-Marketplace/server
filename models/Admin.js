const { Schema, model } = require('mongoose')
const { hash } = require('bcryptjs')

const adminSchema = new Schema({
  username: String,
  password: String,
})

adminSchema.pre('save', async function(next) {
  this.password = await hash(this.password, 10)
  next()
})

module.exports = model('Admin', adminSchema)
