const asyncHandler = require("express-async-handler");
const UserHub = require("../models/hubModel");
const Users = require("../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { setUser } = require("./userControllers");
const { nextTick } = require("process");

//@desc check hub name is already in database
//@route POST api/hub/hubnames
//@access Private
const getHubNames = asyncHandler(async (req, res) => {
  const { hubName } = req.body;
  const searchedHubName = await UserHub.findOne({ hubName });
  try {
    res.status(200).send(searchedHubName);
  } catch (err) {
    res.json(err);
  }
});

//@desc create a new hub
//@route POST api/hub
//@access Private
const setHub = asyncHandler(async (req, res) => {
  const { adminUser, hubName, hubPrincipal } = req.body;
  const createdHub = await UserHub.create({
    hubName,
    hubUsers: [adminUser],
    hubPrincipal,
  });
  try {
    res.status(201).send(createdHub);
  } catch (err) {
    res.json(err);
  }
});

//@desc invite users to hub
//@route POST api/hub/addusers
//@access private
const inviteUser = asyncHandler(async (req, res, next) => {
  const {
    hubAdmin,
    hubInvitedTo,
    hubPrincipal,
    inviteeName,
    emailToInvite,
    additionalMessage,
  } = req.body;
  console.log(req.body);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const password = process.env.ONE_TIME_PASSWORD;

  const message = {
    from: `All for One <${process.env.EMAIL}>`, // sender address
    to: `${inviteeName} <${emailToInvite}>`, // list of receivers
    subject: `Your invite to join ${hubPrincipal}'s care hub: ${hubInvitedTo}`, // Subject line
    text: `
    `, // plain text body
    html: `<p><b>Hi ${inviteeName},</b></p>
    <p>${hubPrincipal} has a new care hub to help them keep up-to-date with loved ones. They are keen for you to join them there.</p>
    <p>To register your account and join the hub, go to the <a href="http://localhost:3000" target="_blank">all for one invite confirmation</a> page and login in with your password</p>
    <p>Your one-time password:<b> ${password} </b></p>
    <p>If you have any further questions, please contact ${hubPrincipal}'s carer at <a href="mailto:${hubAdmin}">${hubAdmin}</a>
    <p>We look forward to you joining us there,</p>
    <p>All for One admin team :) </p>
    
    <h3>Additional message from admin:</h3>
    <p>${additionalMessage}</p>
    `, // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // res.send("email sent successfully");
  next();
});

const setInvitedUser = asyncHandler(async (req, res) => {
  const { inviteeName, emailToInvite, hubInvitedTo } = req.body;

  // const userExists = await Users.findOne({ emailToInvite });
  // if (userExists) {
  //   res.status(400);
  //   throw new Error("Email already registered");
  // }

  const salt = await bcrypt.genSalt(process.env.SALT | 0);
  const hashedPassword = await bcrypt.hash(process.env.ONE_TIME_PASSWORD, salt);

  const user = await Users.create({
    name: inviteeName,
    username: inviteeName,
    email: emailToInvite,
    password: hashedPassword,
    isAdmin: false,
    isPrincipal: false,
    relationship: req.body.relationship,
    avatarUrl: req.body.avatarUrl,
    hubCodes: hubInvitedTo,
    location: req.body.location,
    token: null,
  });
  if (user) {
    //changed status code from 201 to 200
    // token = generateToken(user._id);
    // user.token = token;
    res.status(200).json({ user });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

//@desc Get all users in hub
//@route POST api/hub/users
//@access private
const getUsers = asyncHandler(async (req, res) => {
  const { hubName } = req.body;
  const currentHub = await UserHub.find({ hubName });
  const usersInHub = await Users.find({
    email: { $in: currentHub[0].hubUsers },
  });
  res.status(200).json(usersInHub);
});

//@desc Update user
//@route PUT api/users/:user_id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.user_id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await Users.findByIdAndUpdate(
    req.params.user_id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedUser);
});

//@desc Delete user
//@route DELETE api/users/:user_id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findByIdAndRemove(req.params.user_id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json(`User ${user.username} deleted`);
});

//@desc Get user data
//@route POST api/users/me
//@access Public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  getHubNames,
  setHub,
  updateUser,
  deleteUser,
  getMe,
  inviteUser,
  setInvitedUser,
  getUsers,
};
