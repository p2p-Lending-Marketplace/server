const { Application } = require('../models')

class ApplicationController {
  static async createNewApplication(req, res, next) {
    try {
      const { amount, objective, additional_data } = req.body
      const user_id = req.user.id
      const fintech_id = req.params.id

      const application = await Application.create({
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

  static async updateApplicationStatus(req, res, next) {
    try {
      const { status } = req.body
      let application = req.application

      application.status = status || application.status

      application = await application.save()
      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }

  static async getAllApplications(req, res, next) {}

  static async getAllFintechApplications(req, res, next) {}

  static async getAllUserApplications(req, res, next) {}
}

module.exports = ApplicationController
