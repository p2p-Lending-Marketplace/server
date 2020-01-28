const { Application, Fintech } = require('../models')

class ApplicationController {
  static async createNewApplication(req, res, next) {
    console.log(req.body)
    try {
      const {
        fintech_id,
        amount,
        loan_term,
        objective,
        additional_data,
      } = req.body

      const user = req.user

      const application = await Application.create({
        user_id: user.id,
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

      application = await application
        .populate('fintech_id', 'logoURL company_name')
        .populate('user_id', '-pin')
        .execPopulate()

      console.log(application)

      let obj = {
        decision: application.decision,
        status: application.status,
        _id: application._id,
        user_id: application.user_id,
        fintech_id: application.fintech_id._id,
        logoURL: application.fintech_id.logoURL,
        company_name: application.fintech_id.company_name,
        amount: application.amount,
        loan_term: application.loan_term,
        objective: application.objective,
        createdAt: application.createdAt,
      }
      res.status(200).json(obj)
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
      console.log('masuk sini', req.params)

      const applications = await Application.find({
        fintech_id,
      })
        // .populate('user_id', 'name')
        .populate('fintech_id', 'logoURL company_name')
      let populatedData = []
      for (let i = 0; i < applications.length; i++) {
        let obj = {
          decision: applications[i].decision,
          status: applications[i].status,
          _id: applications[i]._id,
          user_id: applications[i].user_id,
          fintech_id: applications[i].fintech_id._id,
          logoURL: applications[i].fintech_id.logoURL,
          company_name: applications[i].fintech_id.company_name,
          amount: applications[i].amount,
          loan_term: applications[i].loan_term,
          objective: applications[i].objective,
          createdAt: applications[i].createdAt,
        }
        populatedData.push(obj)
      }
      res.status(200).json(populatedData)
    } catch (error) {
      next(error)
    }
  }

  static async getAllUserApplications(req, res, next) {
    try {
      // const { user_id } = req.params
      const user = req.user
      const applications = await Application.find({
        user_id: user.id,
      }).populate('fintech_id', 'logoURL company_name')
      let populatedData = []
      for (let i = 0; i < applications.length; i++) {
        let obj = {
          decision: applications[i].decision,
          status: applications[i].status,
          _id: applications[i]._id,
          user_id: applications[i].user_id,
          fintech_id: applications[i].fintech_id._id,
          logoURL: applications[i].fintech_id.logoURL,
          company_name: applications[i].fintech_id.company_name,
          amount: applications[i].amount,
          loan_term: applications[i].loan_term,
          objective: applications[i].objective,
          createdAt: applications[i].createdAt,
        }
        populatedData.push(obj)
      }
      console.log('populatedData')
      console.log(populatedData[0])

      res.status(200).json(populatedData)
    } catch (error) {
      next(error)
    }
  }

  static async getApplicationById(req, res, next) {
    try {
      const application = await Application.findById(req.params.id)
        .populate('fintech_id', 'logoURL company_name')
        .populate('user_id', '-pin')

      // console.log(application)

      let obj = {
        decision: application.decision,
        status: application.status,
        _id: application._id,
        user_id: application.user_id,
        fintech_id: application.fintech_id._id,
        logoURL: application.fintech_id.logoURL,
        company_name: application.fintech_id.company_name,
        amount: application.amount,
        loan_term: application.loan_term,
        objective: application.objective,
        createdAt: application.createdAt,
      }

      res.status(200).json(obj)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ApplicationController
