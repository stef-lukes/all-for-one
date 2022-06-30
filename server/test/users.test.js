process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const Users = require("../models/userModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = require("chai");
const should = chai.should();
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);

describe("Users HTTP Requests", () => {
  beforeEach((done) => {
    Users.deleteMany({}, (err) => {
      done();
    });
  });

  describe("/api/users", () => {
    const testUser1 = {
      email: "gracefaz@gmail.com",
      name: "grace",
      username: "grace27",
      password: "hellograce",
      passwordConfirm: "hellograce",
      isAdmin: true,
      isPrincipal: false,
    };
    it("POST : creates a new user and returns new user object with required properties", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .type("form")
        .send(testUser1)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("name");
          res.body.should.have.property("username");
          res.body.should.have.property("email");
          res.body.should.have.property("password");
          res.body.should.have.property("isAdmin");
          res.body.should.have.property("isPrincipal");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          done();
        });
    });
    it("should hash paswword", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .type("form")
        .send(testUser1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.password.should.not.eql(testUser1.password);
          done();
        });
    });
    it("response object values should match request object values", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .type("form")
        .send(testUser1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.email.should.eql(testUser1.email);
          done();
        });
    });

    it("should respond with 400 if user already exists", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send(testUser1)
        .end()
        .then(
          chai
            .request(app)
            .post("/api/users")
            .send(testUser1)
            .end((err, res) => {
              console.log(res.body);
              res.should.have.status(400);
            })
        );
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
