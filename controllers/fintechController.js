const { Fintech } = require('../models')

class FintechController {
  static async addNewFintech(req, res, next) {
    try {
      const {
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
      } = req.body

      const fintech = await Fintech.create({
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
      })
      res.status(201).json(fintech)
    } catch (error) {
      next(error)
    }
  }

  static async updateFintechData(req, res, next) {
    try {
      const {
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
      } = req.body
      let fintech = req.fintech

      fintech.company_name = company_name || fintech.company_name
      fintech.description = description || fintech.description
      fintech.min_interest = min_interest || fintech.min_interest
      fintech.max_interest = max_interest || fintech.max_interest
      fintech.logoURL = logoURL || fintech.logoURL

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
