const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const { Admin, Fintech } = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

chai.use(chaiHttp);

let jwtToken;

let newAdmin = {
	username: 'adminFintechA',
	password: 'adminFintechA'
}

let newFintech = {
	username: newAdmin.username,
	password: newAdmin.password,
	company_name: 'Fintech A',
	description: 'Fintech A description',
	min_interest: 3,
	max_interest: 5,
    logoURL: "http://abc.com/def.jpg"
}

async function createNewFintech() {
	try {
      const {
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
      } = newFintech
      const fintech = await Fintech.create({
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL
      })
    } catch (error) {
      console.log('error => ',error);
    }
}

async function loginFintech() {
	try {
		const { username, password } = newAdmin
		const fintech = await Fintech.findOne({ username })

        if (await compare(password, fintech.password)) {
        	const token = sign(
           		{
              		_id: fintech._id,
              		role: 'fintech',
            		fintech_id: fintech.fintech_id || undefined,
            	},
            	process.env.JWT_SECRET
          	)
          	jwtToken = token;
            console.log('token => ',token);
        }
	} catch (error) {
		console.log('error => ',error);
	}
}

before(async function() {
    if (process.env.NODE_ENV === 'test') {
        await createNewFintech()
        await loginFintech()
    }
});

after(async function() {
    if (process.env.NODE_ENV === 'test') {
        await Admin.deleteMany({})
        await Fintech.deleteMany({})
    }
});

describe("Admin Route Testing", function() {
	describe("POST /register", function() {
		it("should succesfully register new admin", function(done) {

			chai
                .request(app)
                .post('/admin/register')
                .send(newAdmin)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    done()
                });
		})
        it("should failed to register new admin if password not provided", function(done) {

            let newWrongAdmin = {
                username: 'admin'
            }

            chai
                .request(app)
                .post('/admin/register')
                .send(newWrongAdmin)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(res).to.have.status(500);
                    done()
                });
        })
        it("should failed to register new admin if username not provided", function(done) {

            let newWrongAdmin1 = {
                password: 'admin'
            }

            chai
                .request(app)
                .post('/admin/register')
                .send(newWrongAdmin1)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(res).to.have.status(422);
                    done()
                });
        })
	})
	describe("POST /login", function() {
		it("should succesfully login as admin", function(done) {

			chai
                .request(app)
                .post('/admin/login')
                .send(newAdmin)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                });
		})
	})
	describe("GET /fintechdetail", function() {
		it("should succesfully get fintech detail", function(done) {
			console.log('jwtToken => ',jwtToken);
			chai
                .request(app)
                .get('/admin/fintechdetail')
                .set( 'token', jwtToken )
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                });
		})
	})
})