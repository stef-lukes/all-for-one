process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = require("chai");
const should = chai.should();

chai.use(chaiHttp);

describe("Users HTTP Requests", () => {
  beforeEach((done) => {
    userModel.deleteMany({}, (err) => {
      done();
    });
  });

  describe("users", () => {
    it("POST: creates a new user", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .type("form")
        .send({
          email: "gracefaz@gmail.com",
          name: "grace",
          username: "grace27",
          password: "hellograce",
          passwordConfirm: "hellograce",
          isAdmin: true,
          isPrincipal: false,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          //console.log(res.body);
          done();
        });
    });

    it("GET: should return an array of user objects", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
