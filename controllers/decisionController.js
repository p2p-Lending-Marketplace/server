const { Decision } = require('../models')

class DecisionController {
  static async createNewDecision(req, res, next) {
    try {
      const { amount, objective, additional_data } = req.body
      const user_id = req.user.id
      const fintech_id = req.params.id

      const application = await Decision.create({
        user_id,
        fintech_id,
        amount,
        objective,
        additional_data,
      })
      res.status(201).json(application)
    } catch (error) {
      next(error)
    }
  }

  static async getAllDecisions(req, res, next) {
    try {
      const application = await Decision.find()

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }

  static async getAllFintechDecisions(req, res, next) {
    const fintechId = req.params.id

    try {
      const application = await Decision.find({
        fintech_id: fintechId
      })

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }

  static async getAllUserDecisions(req, res, next) {
    const userId = req.params.id

    try {
      const application = await Decision.find({
        user_id: userId
      })

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DecisionController
