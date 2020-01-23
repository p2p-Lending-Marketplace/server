const { User } = require('../models')

module.exports = {
  async authenticate(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      req.user = user
      next()
    } catch (error) {
      next(error)
    }
  },
}
