const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const { User } = require('../models');
const { Fintech } = require('../models');
const { Application } = require('../models');

chai.use(chaiHttp);

let userID, fintechID, applicationID;

async function createNewUser() {
	console.log('createNewUser')
    let newUser = {
        phone_number: "+6282213104881",
        pin: "123456"
    }

    try {
      const { phone_number, pin } = newUser
      console.log('phone_number => ',phone_number);
      console.log('pin => ',pin);
      const user = await User.create({ phone_number, pin })
      console.log('user => ',user);
      userID = user._id
      console.log('userID => ',userID);
    } catch (error) {
      console.log('error => ',error);
    }
}

async function createNewFintech() {
    let newFintech = {
        company_name: 'Fintech A',
        description: 'Fintech A description',
        min_interest: 3,
        max_interest: 5,
        logoURL: "http://abc.com/def.jpg"
    }

    try {
      const { company_name, description, min_interest, max_interest, logoURL } = newFintech

      const fintech = await Fintech.create({
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL
      })
      fintechID = fintech._id
    } catch (error) {
      console.log('error => ',error);
    }
}

before( async function() {
    if(process.env.NODE_ENV === 'test') {
        await createNewUser();
        await createNewFintech();
        console.log('=======================')
    }
})

// after(async function() {
//     if (process.env.NODE_ENV === 'test') {
//         await User.deleteMany({})
//         await Fintech.deleteMany({})
//         await Application.deleteMany({})
//     }
// });

// let token;

// describe("Application Route Testing", function () {
//     describe("POST /application", function () {
//         it("should successfully create new application", function (done) {
//             let newApplication = {
//                 user_id: userID,
//                 fintech_id: fintechID,
//                 amount: 10000000,
//                 loan_term: 36,
//                 objective: 'Renovasi Rumah',
//             }

//             chai
//                 .request(app)
//                 .post("/application")
//                 .send(newApplication)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     applicationID = res.body._id;
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     done()
//                 });
//         });
//     })
//     describe("PATCH /application/:id", function() {
//     	describe("should successfully update application decision", function (done) {
//     		let newApplicationData = {
//     			amount: 10000000,
//     			loan_term: 36,
//     			decision: "accepted"
//     		}

//     		chai
//                 .request(app)
//                 .patch(`/application/${applicationID}`)
//                 .send(newApplicationData)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     done()
//                 });
//     	})
//     })
// });