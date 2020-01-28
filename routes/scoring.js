const scoring = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const axios = require('axios')

scoring.get('/', authenticate, async function(req, res, next) {
	axios({
		url: 'http://35.187.226.194',
		method: 'GET',
		data: {
			amount: req.body.amount,
			loan_term: req.body.loan_term,
			salary: req.body.salary,
			current_job: req.body.current_job,
			date_of_birth: req.body.date_of_birth
		}
	})
		.then((response) => {
			console.log('response => ',response);
			res.status(200).send(response.data)
		})
		.catch((err) => {
			next(err)
		})
})

module.exports = scoring
