const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Users HTTP Requests", () => {
  beforeEach((done) => {
    userModel.deleteMany({}, (err) => {
      done();
    });
  });

  describe("/GET users", () => {
    it("should return an array of user objects", (done) => {
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
