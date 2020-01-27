const { Application } = require('../models')

class ApplicationController {
  static async createNewApplication(req, res, next) {
    console.log(req.body)
    try {
      const {
        user_id,
        fintech_id,
        amount,
        loan_term,
        objective,
        additional_data,
      } = req.body

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

  static async updateApplicationDecision(req, res, next) {
    try {
      const { amount, loan_term, decision } = req.body
      let application = req.application

      application.amount = amount || application.amount
      application.loan_term = loan_term || application.loan_term
      application.decision = decision || application.decision

      application = await application.save()
      res.status(200).json(application)
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
      const applications = await Application.find()

      res.status(200).json(applications)
    } catch (error) {
      next(error)
    }
  }

  static async getAllFintechApplications(req, res, next) {
    try {
      const { fintech_id } = req.params

      const applications = await Application.find({
        fintech_id,
      })
      res.status(200).json(applications)
    } catch (error) {
      next(error)
    }
  }

  static async getAllUserApplications(req, res, next) {
    try {
      const { user_id } = req.params

      const applications = await Application.find({
        user_id,
      })
      res.status(200).json(applications)
    } catch (error) {
      next(error)
    }
  }

  static async getApplicationById(req, res, next) {
    try {
      const application = await Application.findById(req.params.id)
      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ApplicationController
