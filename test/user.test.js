// const chai = require("chai");
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const app = require('../app');
// const User = require('../models/User');
// const { authenticator } = require('otplib')

// console.log('user test started');

// chai.use(chaiHttp);

// let userID, loggedInUser;

// let newUser = {
//     phone_number: "+6282213104881",
//     pin: "123456"
// }

// // async function createNewUser() {
// //     try {
// //       const { phone_number, pin } = newUser
// //       const user = await User.create({ phone_number, pin })
// //       userID = user._id
// //     } catch (error) {
// //       console.log('error => ',error);
// //     }
// // }

// // before( async function () {
// //     await createNewUser();
// // })

// // after(async function() {
// //     if (process.env.NODE_ENV === 'test') {
// //         await User.deleteMany({})
// //     }
// // });

// let token;

// describe("User Route Testing", function () {
   // describe("POST /user", function () {
   //      it("should successfully create new user", function (done) {
   //          let phoneNumber = "+62";
   //          const secret = process.env.OTP_SECRET
   //    		const token = authenticator.generate(secret)

   //          chai
   //          .request(app)
   //          .post("/user/otp")
   //          .send(pin)
   //          .end(function (err, res) {
   //              console.log("res.body => ", JSON.stringify(res.body, null, 3))
   //              expect(err).to.be.null;
   //              expect(res).to.have.status(204);
   //              done()
   //          });
   //      });
   //      it("should return error if phone number total digit less than 7 digits", function (done) {
   //          let phoneNumber = 123456;
   //          const secret = process.env.OTP_SECRET
   //    		const token = authenticator.generate(secret)

   //          chai
   //          .request(app)
   //          .post("/user/otp")
   //          .send(pin)
   //          .end(function (err, res) {
   //              console.log("res.body => ", JSON.stringify(res.body, null, 3))
   //              expect(err).to.be.null;
   //              expect(res).to.have.status(204);
   //              done()
   //          });
   //      });
   //      it("should return error if phone numbers contains non digit character", function (done) {
   //          let phoneNumber = 123456;
   //          const secret = process.env.OTP_SECRET
   //    		const token = authenticator.generate(secret)

   //          chai
   //          .request(app)
   //          .post("/user/otp")
   //          .send(pin)
   //          .end(function (err, res) {
   //              console.log("res.body => ", JSON.stringify(res.body, null, 3))
   //              expect(err).to.be.null;
   //              expect(res).to.have.status(204);
   //              done()
   //          });
   //      });
   //      it("should return error if phone number format isn't correct (start with other than 0 character", function (done) {
   //          let phoneNumber = 123456;
   //          const secret = process.env.OTP_SECRET
   //    		const token = authenticator.generate(secret)

   //          chai
   //          .request(app)
   //          .post("/user/otp")
   //          .send(pin)
   //          .end(function (err, res) {
   //              console.log("res.body => ", JSON.stringify(res.body, null, 3))
   //              expect(err).to.be.null;
   //              expect(res).to.have.status(204);
   //              done()
   //          });
   //      });
   //      it("should return error if phone number format isn't correct (start with other than 0 character", function (done) {
   //          let phoneNumber = 123456;
   //          const secret = process.env.OTP_SECRET
   //    		const token = authenticator.generate(secret)

   //          chai
   //          .request(app)
   //          .post("/user/otp")
   //          .send(pin)
   //          .end(function (err, res) {
   //              console.log("res.body => ", JSON.stringify(res.body, null, 3))
   //              expect(err).to.be.null;
   //              expect(res).to.have.status(204);
   //              done()
   //          });
   //      });
   //  })
   //  describe("POST /user/verify", function () {
   //  	it("should successfully verify with correct token", function (done) {

   //  	})
   //  	it("should return error with false token", function (done) {
    		
   //  	})
   //  	it("should return error with empty token", function (done) {
    		
   //  	})
   //  })
    // describe("POST /user/signin", function () {
    //     it("should succesfully login user", function (done) {

    //         chai
    //             .request(app)
    //             .post('/user/signin')
    //             .send(newUser)
    //             .end(function (err, res) {
    //                 console.log("res.body => ", JSON.stringify(res.body, null, 3))
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(200);
    //                 done()
    //             });
    //     })
    // })
    // describe("GET /user/:id", function () {
    // 	it("should get user data", function (done) {
    //         console.log('userID => ',userID);

    //         chai
    //             .request(app)
    //             .get(`/user/${userID}`)
    //             .end(function (err, res) {
    //                 console.log("res.body => ", JSON.stringify(res.body, null, 3))
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(200);
    //                 done()
    //             });
    // 	})
    // })
    // describe("PATCH /user/:id", function () {
    //     it("should successfully update user data", function (done) {

    //         let newUserData = {
    //             name: "Bill Gates",
    //             email: "bill.gates@outlook.com",
    //             phone_number: "+6282213104881",
    //             pin: "123456",
    //             address: "USA",
    //             photo_url: "http://www.abc.com/def.jpg",
    //             id_url: "http://www.abc.com/def.jpg",
    //             salary_slip_url: "http://www.abc.com/def.jpg",
    //             current_job: "horang kayahh",
    //             salary: 99999999
    //         }

    //         chai
    //             .request(app)
    //             .patch(`/user/${userID}`)
    //             .send(newUserData)
    //             .end(function (err, res) {
    //                 console.log("res.body => ", JSON.stringify(res.body, null, 3))
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(200);
    //                 done()
    //             });
    //     })
    // })
//});