const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { User, Admin } = require('../models')
const { authenticator } = require('otplib')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

chai.use(chaiHttp)

let userID, jwtToken

let newUser = {
  phone_number: '+6282213104881',
  pin: '123456',
}

after(async function() {
  await User.deleteMany({})
})

describe('User Route Testing', function() {
  describe('POST /user', function() {
    it('should succesfully create user', function(done) {
      chai
        .request(app)
        .post('/user')
        .send(newUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          jwtToken = res.body.token
          expect(err).to.be.null
          expect(res).to.have.status(201)
          done()
        })
    })
    it('should failed to create user if phone number in wrong format', function(done) {
      let newFalseUser = {
        phone_number: '+62822',
        pin: '123456',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to create user if phone number not provided', function(done) {
      let newFalseUser = {
        pin: '123456',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to create user if pin not provided', function(done) {
      let newFalseUser = {
        phone_number: '+62822',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it("should failed to create user if pin's length < 6 digits", function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '12345',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it("should failed to create user if pin's length > 6 digits", function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '1234567',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to create user if pin contains other than integer', function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '123456A',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to create user if pin contains space character', function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '12 456',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
  })
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
  // describe("POST /user/verify", function () {
  // 	it("should successfully verify with correct token", function (done) {

  // 	})
  // 	it("should return error with false token", function (done) {

  // 	})
  // 	it("should return error with empty token", function (done) {

  // 	})
  //})
  describe('POST /user/signin', function() {
    it('should succesfully login user', function(done) {
      chai
        .request(app)
        .post('/user/signin')
        .send(newUser)
        .end(function(err, res) {
          console.log('res.body => ', JSON.stringify(res.body, null, 3))
          jwtToken = res.body.token
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })
    it('should failed to login user if phone number in wrong format', function(done) {
      let newFalseUser = {
        phone_number: '+62822',
        pin: '123456',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to login user if phone number not provided', function(done) {
      let newFalseUser = {
        pin: '123456',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to login user if pin not provided', function(done) {
      let newFalseUser = {
        phone_number: '+62822',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it("should failed to login user if pin's length < 6 digits", function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '12345',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it("should failed to login user if pin's length > 6 digits", function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '1234567',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to login user if pin contains other than integer', function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '123456A',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
    it('should failed to login user if pin contains space character', function(done) {
      let newFalseUser = {
        phone_number: '+6282213104881',
        pin: '12 456',
      }

      chai
        .request(app)
        .post('/user')
        .send(newFalseUser)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(res).to.have.status(422)
          done()
        })
    })
  })
  describe('GET /user/detail', function() {
    it('should successfully get user detail', function(done) {
      chai
        .request(app)
        .get(`/user/detail`)
        .set('token', jwtToken)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })
    it('should failed to get user detail if token not provided', function(done) {
      chai
        .request(app)
        .get(`/user/detail`)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(err).to.be.null
          expect(res).to.have.status(500)
          done()
        })
    })
    it('should failed to get user detail if token is wrong', function(done) {
      chai
        .request(app)
        .get(`/user/detail`)
        .set('token', 'tokenSengajaSalah')
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(err).to.be.null
          expect(res).to.have.status(500)
          done()
        })
    })
  })
  describe('PATCH /user', function() {
    it('should successfully update user detail', function(done) {
      let newUserData = {
        name: 'Bill Gates',
        email: 'bill.gates@outlook.com',
        phone_number: '+6282213104881',
        pin: '123456',
        address: 'USA',
        photo_url: 'http://www.abc.com/def.jpg',
        id_url: 'http://www.abc.com/def.jpg',
        salary_slip_url: 'http://www.abc.com/def.jpg',
        current_job: 'horang kayahh',
        salary: 99999999,
      }

      chai
        .request(app)
        .patch(`/user`)
        .set('token', jwtToken)
        .send(newUserData)
        .end(function(err, res) {
          // console.log("res.body => ", JSON.stringify(res.body, null, 3))
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })
  })
})
