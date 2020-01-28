const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const { User, Fintech, Application, Admin } = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

chai.use(chaiHttp);

let userID, fintechID, applicationID, jwtTokenUser, jwtTokenAdmin;
let newUser = {
    phone_number: "+6282213104881",
    pin: "123456"
}

async function createNewUser() {
    try {
      const { phone_number, pin } = newUser
      const user = await User.create({ phone_number, pin })
      const token = sign(
        { _id: user._id, role: 'user' },
        process.env.JWT_SECRET
      )
      userID = user._id;
      jwtTokenUser = token;
    } catch (error) {
      console.log('error => ',error);
    }
}

let newAdmin = {
	username: 'admin',
	password: 'admin'
}

async function createAdmin() {
	try {
      const { username, password } = newAdmin
      const admin = await Admin.create({ username, password })
    } catch (error) {
      console.log('error => ',error);
    }
}

async function loginAdmin() {
	try {
		const { username, password } = newAdmin
		const admin = await Admin.findOne({ username })

        if (await compare(password, admin.password)) {
        	const token = sign(
           		{
              		_id: admin._id,
              		role: 'admin',
            	},
            	process.env.JWT_SECRET
          	)
          	jwtTokenAdmin = token;
          	console.log('jwtTokenAdmin => ',jwtTokenAdmin);
        }
	} catch (error) {
		console.log('error => ',error);
	}
}

async function createNewFintech() {
    let newFintech = {
    	username: 'adminFintechA',
    	password: 'adminFintechA',
        company_name: 'Fintech A',
        description: 'Fintech A description',
        min_interest: 3,
        max_interest: 5,
        logoURL: "http://abc.com/def.jpg"
    }

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
        logoURL,
      })
      fintechID = fintech._id;
    } catch (error) {
      console.log('error => ',error);
    }

    // chai
    //     .request(app)
    //     .post("/fintech")
    //     .set( 'token', jwtTokenAdmin )
    //     .send(newFintech)
    //     .end(function (err, res) {
    //         // console.log("res.body => ", JSON.stringify(res.body, null, 3))
    //         fintechID = res.body._id;
    //         expect(err).to.be.null;
    //         expect(res).to.have.status(201);
    //     });
}

before( async function() {
    if(process.env.NODE_ENV === 'test') {
        await createNewUser();
        await createAdmin()
        await loginAdmin()
        await createNewFintech();
    }
})

after(async function() {
    if (process.env.NODE_ENV === 'test') {
        await User.deleteMany({})
        await Fintech.deleteMany({})
        await Application.deleteMany({})
    }
});

describe("Application Route Testing: Success Cases", function () {
    describe("POST /application", function () {
        it("should successfully create new application", function (done) {
            let newApplication = {
                user_id: userID,
                fintech_id: fintechID,
                amount: 10000000,
                loan_term: 36,
                objective: 'Renovasi Rumah',
                additional_data: 'data tambahan'
            }

            chai
                .request(app)
                .post("/application")
                .set( 'token', jwtTokenUser )
                .send(newApplication)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    console.log('res.body => ',res.body);
                    applicationID = res.body._id;
                    console.log('applicationID => ',applicationID);
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    done()
                });
        });
        it("should failed to create new application if user_id not provided", function (done) {
            let newApplication = {
                fintech_id: fintechID,
                amount: 10000000,
                loan_term: 36,
                objective: 'Renovasi Rumah',
                additional_data: 'data tambahan'
            }

            chai
                .request(app)
                .post("/application")
                .set( 'token', jwtTokenUser )
                .send(newApplication)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(res).to.have.status(422);
                    done()
                });
        });
        it("should failed to create new application if fintech_id not provided", function (done) {
            let newApplication = {
            	user_id: userID,
                amount: 10000000,
                loan_term: 36,
                objective: 'Renovasi Rumah',
                additional_data: 'data tambahan'
            }

            chai
                .request(app)
                .post("/application")
                .set( 'token', jwtTokenUser )
                .send(newApplication)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(res).to.have.status(422);
                    done()
                });
        });
        it("should failed to create new application if amount not provided", function (done) {
            let newApplication = {
            	user_id: userID,
                fintech_id: fintechID,
                loan_term: 36,
                objective: 'Renovasi Rumah',
                additional_data: 'data tambahan'
            }

            console.log('newApplication => ',newApplication);

            chai
                .request(app)
                .post("/application")
                .set( 'token', jwtTokenUser )
                .send(newApplication)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(res).to.have.status(422);
                    done()
                });
        });
        it("should failed to create new application if loan_term not provided", function (done) {
            let newApplication = {
            	user_id: userID,
                fintech_id: fintechID,
                amount: 10000000,
                objective: 'Renovasi Rumah',
                additional_data: 'data tambahan'
            }

            chai
                .request(app)
                .post("/application")
                .set( 'token', jwtTokenUser )
                .send(newApplication)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(res).to.have.status(422);
                    done()
                });
        });
        it("should failed to create new application if objective not provided", function (done) {
            let newApplication = {
            	user_id: userID,
                fintech_id: fintechID,
                amount: 10000000,
                loan_term: 36,
                additional_data: 'data tambahan'
            }

            chai
                .request(app)
                .post("/application")
                .set( 'token', jwtTokenUser )
                .send(newApplication)
                .end(function (err, res) {
                    // console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(res).to.have.status(422);
                    done()
                });
        });
    })
    describe("PATCH /application/:id/decision", function() {
    	it("should successfully update application decision", function (done) {
    		let newApplicationData = {
    			amount: 10000000,
    			loan_term: 36,
    			decision: "accepted"
    		}
    		chai
                .request(app)
                .patch(`/application/${applicationID}/decision`)
                .set( 'token', jwtTokenAdmin )
                .send(newApplicationData)
                .end(function (err, res) {
                    console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                });
    	})
    })
});
