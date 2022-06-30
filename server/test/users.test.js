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
  before((done) => {
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
    const testUser2 = {
      email: "stefanlukes@gmail.com",
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
    it("POST /api/users: should hash paswword but return same email", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .type("form")
        .send(testUser2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.password.should.not.eql(testUser2.password);
          res.body.email.should.eql(testUser2.email);
          done();
        });
    });
    it("POST /api/users: should respond with 400 if user already exists", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send(testUser1)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("POST /api/users: responds with status 400 if request is missing required fields", (done) => {
      testUser1.email = undefined;
      chai
        .request(app)
        .post("/api/users")
        .send(testUser1)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal("Please complete all fields");
          done();
        });
    });
    it("POST /api/users: responds with status 404 if user accesses an incorrect path", (done) => {
      chai
        .request(app)
        .post("/api/userss")
        .send(testUser2)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("GET /api/users: should return an array of user objects", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.length(2);
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
});