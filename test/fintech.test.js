// const chai = require("chai");
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const app = require('../app');
// const { Admin, Fintech } = require('../models')
// const { compare } = require('bcryptjs')
// const { sign } = require('jsonwebtoken')

// chai.use(chaiHttp);

// let newFintechID, jwtToken
// let newAdmin = {
// 	username: 'admin',
// 	password: 'admin'
// }

// async function createAdmin() {
// 	try {
//       const { username, password } = newAdmin
//       const admin = await Admin.create({ username, password })
//     } catch (error) {
//       console.log('error => ',error);
//     }
// }

// async function loginAdmin() {
// 	try {
// 		const { username, password } = newAdmin
// 		const admin = await Admin.findOne({ username })

//         if (await compare(password, admin.password)) {
//         	const token = sign(
//            		{
//               		_id: admin._id,
//               		role: 'admin',
//             	},
//             	process.env.JWT_SECRET
//           	)
//           	jwtToken = token;
//         }
// 	} catch (error) {
// 		console.log('error => ',error);
// 	}
// }

// before(async function() {
//     if (process.env.NODE_ENV === 'test') {
//         await createAdmin()
//         await loginAdmin()
//     }
// });

// after(async function() {
//     if (process.env.NODE_ENV === 'test') {
//         await Admin.deleteMany({})
//         await Fintech.deleteMany({})
//     }
// });

// describe("Fintech Route Testing", function () {
//     describe("POST /fintech", function () {
//         it("should successfully create new Fintech", function (done) {
//             let newFintech = {
//             	username: newAdmin.username,
//             	password: newAdmin.password,
//              company_name: 'Fintech A',
//              description: 'Fintech A description',
//              min_interest: 3,
//              max_interest: 5,
//              logoURL: "http://abc.com/def.jpg"
//             }
//             console.log('jwtToken => ',jwtToken);

//             chai
//                 .request(app)
//                 .post("/fintech")
//                 .set( 'token', jwtToken )
//                 .send(newFintech)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     newFintechID = res.body._id
//                     done()
//                 });
//         });
//         it("should failed to create new Fintech if company name not provided", function (done) {
//             let newFintech = {
//             	username: newAdmin.username,
//             	password: newAdmin.password,
//                 description: 'Fintech A description',
//                 min_interest: 3,
//                 max_interest: 5,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .post("/fintech")
//                 .set( 'token', jwtToken )
//                 .send(newFintech)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(res).to.have.status(422);
//                     done()
//                 });
//         });
//         it("should failed to create new Fintech if description not provided", function (done) {
//             let newFintech = {
//             	username: newAdmin.username,
//             	password: newAdmin.password,
//             	company_name: 'Fintech A',
//                 min_interest: 3,
//                 max_interest: 5,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .post("/fintech")
//                 .set( 'token', jwtToken )
//                 .send(newFintech)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(res).to.have.status(422);
//                     done()
//                 });
//         });
//         it("should failed to create new Fintech if min_interest not provided", function (done) {
//             let newFintech = {
//             	username: newAdmin.username,
//             	password: newAdmin.password,
//             	company_name: 'Fintech A',
//                 description: 'Fintech A description',
//                 max_interest: 5,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .post("/fintech")
//                 .set( 'token', jwtToken )
//                 .send(newFintech)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(res).to.have.status(422);
//                     done()
//                 });
//         });
//         it("should failed to create new Fintech if max_interest not provided", function (done) {
//             let newFintech = {
//             	username: newAdmin.username,
//             	password: newAdmin.password,
//             	company_name: 'Fintech A',
//                 description: 'Fintech A description',
//                 min_interest: 3,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .post("/fintech")
//                 .set( 'token', jwtToken )
//                 .send(newFintech)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(res).to.have.status(422);
//                     done()
//                 });
//         });
//         it("should failed to create new Fintech if logo url not provided", function (done) {
//             let newFintech = {
//             	username: newAdmin.username,
//             	password: newAdmin.password,
//             	company_name: 'Fintech A',
//                 description: 'Fintech A description',
//                 min_interest: 3,
//                 max_interest: 5
//             }

//             chai
//                 .request(app)
//                 .post("/fintech")
//                 .set( 'token', jwtToken )
//                 .send(newFintech)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(res).to.have.status(422);
//                     done()
//                 });
//         });
//     })
//     describe("GET /fintech", function () {
//         it("should successfully return all fintech members", function (done) {
//             chai
//                 .request(app)
//                 .get("/fintech")
//                 .end(function (err, res) {
//                     // console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     done()
//                 });
//         })
//     })
//     describe("GET /fintech/:id", function () {
//         it("should successfully return all fintech members", function (done) {

//             chai
//                 .request(app)
//                 .get(`/fintech/${newFintechID}`)
//                 .end(function (err, res) {
//                     // console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     done()
//                 });
//         })
//     })
//     describe("PATCH /fintech/:id", function () {
//         it("should successfully update fintech data", function (done) {

//             let newFintechData = {
//             	username: 'admin',
//             	password: 'admin',
//                 company_name: 'Fintech A',
//                 description: 'Fintech A description',
//                 min_interest: 4,
//                 max_interest: 5,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .patch(`/fintech/${newFintechID}`)
//                 .set( 'token', jwtToken )
//                 .send(newFintechData)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(err).to.be.null;
//                     //harus berupa object
//                     expect(res).to.have.status(200);
//                     done()
//                 });
//         })
//         it("should failed to update fintech data if token not provided", function (done) {

//             let newFintechData = {
//             	username: 'admin',
//             	password: 'admin',
//                 company_name: 'Fintech A',
//                 description: 'Fintech A description',
//                 min_interest: 4,
//                 max_interest: 5,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .patch(`/fintech/${newFintechID}`)
//                 .send(newFintechData)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(res).to.have.status(500);
//                     done()
//                 });
//         })
//         it("should failed to update fintech data if token is wrong", function (done) {

//             let newFintechData = {
//             	username: 'admin',
//             	password: 'admin',
//                 company_name: 'Fintech A',
//                 description: 'Fintech A description',
//                 min_interest: 4,
//                 max_interest: 5,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .patch(`/fintech/${newFintechID}`)
//                 .set( 'token', 'tokenSengajaSalah' )
//                 .send(newFintechData)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(res).to.have.status(500)
//                     done()
//                 });
//         })
//     })
// });