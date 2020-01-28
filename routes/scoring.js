const scoring = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const { User, Application } = require('../models')
const axios = require('axios')

scoring.get('/', authenticate, async function(req, res, next) {
	try {
        let user = req.user
        const applications= await Application.find({user_id:user.id})
	      	axios({
				url: 'http://35.187.226.194',
				method: 'POST',
				data: {
					amount: applications[0].amount,
					loan_term: applications[0]/loan_term,
					salary: user.salary,
					current_job: user.current_job,
					date_of_birth: user.date_of_birth
				}
			})
				.then((response) => {
					console.log('response => ',response);
					res.status(200).send(response.data)
				})
    } catch (error) {
      next(error)
    }
})

module.exports = scoring
