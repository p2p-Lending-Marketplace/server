// const chai = require("chai");
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const app = require('../app');
// const Fintech = require('../models/Fintech');

// console.log('fintech-test started');

// chai.use(chaiHttp);

// let newFintechID;

// after(function(done) {
//     if (process.env.NODE_ENV === 'test') {
//         Fintech.deleteMany({})
//           .then(function() {
//             done();
//           })
//           .catch(function(err) {
//             console.log('err => ',err);
//             done(err)
//           })
//     }
// });

// let token;

// describe("Fintech Route Testing", function () {
//     describe("POST /fintech", function () {
//         it("should successfully create new Fintech", function (done) {
//             let newFintech = {
//                 company_name: 'Fintech A',
//                 description: 'Fintech A description',
//                 min_interest: 3,
//                 max_interest: 5,
//                 logoURL: "http://abc.com/def.jpg"
//             }

//             chai
//                 .request(app)
//                 .post("/fintech")
//                 .send(newFintech)
//                 .end(function (err, res) {
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     newFintechID = res.body._id
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
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
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
//                     console.log("res.body => ", JSON.stringify(res.body, null, 3))
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     done()
//                 });
//         })
//     })
//     describe("PATCH /fintech/:id", function () {
//         it("should successfully update fintech data", function (done) {

//             let newFintechData = {
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
//                     expect(err).to.be.null;
//                     //harus berupa object
//                     expect(res).to.have.status(200);
//                     done()
//                 });
//         })
//     })
// });