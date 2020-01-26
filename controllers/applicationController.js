const { Application } = require('../models')

class ApplicationController {
  static async createNewApplication(req, res, next) {
    try {
      const { user_id, fintech_id, amount, loan_term, objective, additional_data } = req.body
      // console.log('req.body => ',req.body);
      // const user_id = req.user.id
      // const fintech_id = req.params.id

      const application = await Application.create({
        user_id,
        fintech_id,
        amount,
        loan_term,
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

  static async getAllApplications(req, res, next) {
    try {
      const application = await Application.find()

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }

  static async getAllFintechApplications(req, res, next) {
    const fintechId = req.params.id

    try {
      const application = await Application.find({
        fintech_id: fintechId
      })

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }

  static async getAllUserApplications(req, res, next) {
    const userId = req.params.id

    try {
      const application = await Application.find({
        user_id: userId
      })

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ApplicationController
