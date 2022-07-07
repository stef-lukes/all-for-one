const asyncHandler = require("express-async-handler");
const UserHub = require("../models/hubModel");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

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

const inviteUser = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body;
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

  const message = {
    from: process.env.EMAIL, // sender address
    to: `${emailAddress}`, // list of receivers
    subject: "Please verify your email address", // Subject line
    text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.send("email sent successfully");
});

module.exports = {
  getHubNames,
  setHub,
  updateUser,
  deleteUser,
  getMe,
  inviteUser,
};
