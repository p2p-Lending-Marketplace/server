const { Application, Fintech } = require('../models')

class ApplicationController {
  static async createNewApplication(req, res, next) {
    try {
      const {
        fintech_id,
        amount,
        loan_term,
        objective,
        additional_data,
      } = req.body

      const user = req.user

      let application = await Application.create({
        user_id: user.id,
        fintech_id,
        amount,
        loan_term,
        objective,
        additional_data,
      })

      application = await application
        .populate('fintech_id', 'logoURL company_name')
        .populate('user_id', '-pin')
        .execPopulate()

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

      application = await application
        .populate('fintech_id', 'logoURL company_name')
        .populate('user_id', '-pin')
        .execPopulate()

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }

  static async updateApplicationStatus(req, res, next) {
    try {
      const { status } = req.body
      let application = req.application
      const user = req.user

      application.status = status || application.status

      application = await application.save()

      let allApplications = await Application.find({
        user_id: user.id,
        status: 'active',
      })

      for (const app of allApplications) {
        app.status = 'closed'
      }
      console.log(allApplications[0])

      allApplications = await Promise.all(
        allApplications.map(application => application.save())
      )

      const updatedApplications = await Application.find({
        user_id: user.id,
      })
        .populate('user_id', '-pin')
        .populate('fintech_id', '-username -password')

      res.status(200).json(updatedApplications)
    } catch (error) {
      next(error)
    }
  }

  static async getAllApplications(req, res, next) {
    try {
      const applications = await Application.find()
        .populate('fintech_id', '-username -password')
        .populate('user_id', '-pin')

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
        .populate('fintech_id', '-username -password')
        .populate('user_id', '-pin')

      console.log(applications)

      res.status(200).json(applications)
    } catch (error) {
      next(error)
    }
  }

  static async getAllUserApplications(req, res, next) {
    try {
      const user = req.user
      const applications = await Application.find({
        user_id: user.id,
      })
        .populate('fintech_id', '-password -username')
        .populate('user_id', '-pin')

      res.status(200).json(applications)
    } catch (error) {
      next(error)
    }
  }

  static async getApplicationById(req, res, next) {
    try {
      const application = await Application.findById(req.params.id)
        .populate('fintech_id', '-password -username')
        .populate('user_id', '-pin')

      res.status(200).json(application)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ApplicationController
