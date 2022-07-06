const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//@desc Get users
//@route GET api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

//@desc Set User
//@route POST api/users
//@access Public
const setUser = asyncHandler(async (req, res) => {
  const { username, email, password, name } = req.body;
  if (!username || !email || !password || !name) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(process.env.SALT | 0);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await Users.create({
    name: name,
    username: username,
    email: email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
    isPrincipal: req.body.isPrincipal,
    relationship: req.body.relationship,
    avatarUrl: req.body.avatarUrl,
    hubCodes: req.body.hubCodes,
    location: req.body.location,
    token: null,
  });

  if (user) {
    //changed status code from 201 to 200
    token = generateToken(user._id);
    user.token = token;
    res.status(200).json({ user });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

//@desc Authenticate a user
//@route POST api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email });
  let passwordCheck = await bcrypt.compare(password, user.password);

  if (user && passwordCheck) {
    const token = generateToken(user._id);
    res.json({
      user: {
        token,
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        isPrincipal: user.isPrincipal,
        relationship: user.relationship,
        avatarUrl: user.avatarUrl,
        hubCodes: user.hubCodes,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = {
  getUsers,
  setUser,
  loginUser,
};
