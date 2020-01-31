const scoring = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const { User, Application } = require('../models')
const axios = require('axios')

scoring.get('/', authenticate, async function(req, res, next) {
  try {
    let user = req.user
    const applications = await Application.find({ user_id: user.id })
    axios({
      url: 'http://35.187.226.194:3000',
      method: 'POST',
      data: {
        amount: applications[0].amount,
        loan_term: applications[0] / loan_term,
        salary: user.salary,
        current_job: user.current_job,
        date_of_birth: user.date_of_birth,
        existing_loan_installment: user.existing_loan_installment
      },
    }).then(({ data }) => {
      res.status(200).send(data)
    })
  } catch (error) {
    next(error)
  }
})

module.exports = scoring
