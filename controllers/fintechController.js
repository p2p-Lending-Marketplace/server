const { Fintech } = require('../models')

class FintechController {
  static async addNewFintech(req, res, next) {
    try {
      const {
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
        total_application,
        avg_credit_score,
        percent_acceptance,
      } = req.body

      const fintech = await Fintech.create({
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
        total_application,
        avg_credit_score,
        percent_acceptance,
      })
      res.status(201).json(fintech)
    } catch (error) {
      next(error)
    }
  }

  static async updateFintechData(req, res, next) {
    try {
      const {
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
        total_application,
        avg_credit_score,
        percent_acceptance,
      } = req.body
      let fintech = req.fintech

      fintech.username = username || fintech.username
      fintech.password = password || fintech.password
      fintech.company_name = company_name || fintech.company_name
      fintech.description = description || fintech.description
      fintech.min_interest = min_interest || fintech.min_interest
      fintech.max_interest = max_interest || fintech.max_interest
      fintech.logoURL = logoURL || fintech.logoURL
      fintech.total_application = total_application || fintech.total_application
      fintech.avg_credit_score = avg_credit_score || fintech.avg_credit_score
      fintech.percent_acceptance =
        percent_acceptance || fintech.percent_acceptance

      fintech = await fintech.save()
      res.status(200).json(fintech)
    } catch (error) {
      next(error)
    }
  }

  static async getAllFinteches(req, res, next) {
    try {
      const finteches = await Fintech.find()
      res.status(200).json(finteches)
    } catch (error) {
      next(error)
    }
  }

  static async getFintechById(req, res, next) {
    try {
      const fintech = await Fintech.findById(req.params.id)
      res.status(200).json(fintech)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = FintechController
