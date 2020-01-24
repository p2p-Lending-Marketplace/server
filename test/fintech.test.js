const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const User = require('../models/Fintech');

console.log('fintech-test started');

chai.use(chaiHttp);

after(function(done) {
    if (process.env.NODE_ENV === 'test') {
        Fintech.deleteMany({})
          .then(function() {
            done();
          })
          .catch(function(err) {
            console.log('err => ',err);
            done(err)
          })
    }
});

let token;

describe("Fintech Route Testing", function () {
    describe("POST /fintech", function () {
        it("should successfully create new Fintech", function (done) {
            let newFintech = {
                company_name: 'Fintech A',
                description: 'Fintech A description',
                min_interest: 3,
                max_interest: 5
            }

            chai
            .request(app)
            .post("/fintech")
            .send(pin)
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(204);
                done()
            });
        });
        it("should return error if company_name is empty", function (done) {
          
        });
        it("should return error if description is empty", function (done) {
            
        });
        it("should return error if min_interest is empty", function (done) {
            
        });
        it("should return error if max_interest is empty", function (done) {
           
        });
    })
    describe("POST /fintech", function () {
    	it("should successfully verify with correct token", function (done) {

    	})
    	it("should return error with false token", function (done) {
    		
    	})
    	it("should return error with empty token", function (done) {
    		
    	})
    })
    describe("PATCH /fintech/:id", function () {
    	it("should successfully update", function (done) {

    	})
    	it("should return error if nothing changed", function (done) {
    		
    	})
    	it("should return error with empty token", function (done) {
    		
    	})
    })
});