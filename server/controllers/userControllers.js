const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const nodemailer = require("nodemailer");

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
  const salt = await bcrypt.genSalt(10);
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
  });

  if (user) {
    //changed status code from 201 to 200
    res.status(200).json({ user, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Invalid data");
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

//@desc Authenticate a user
//@route POST api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (user) {
    res.status(200).send({ user });
  }
  // if (user && (await bcrypt.compare(password, user.password))) {
  //   //Generate JWT
  //   generateToken = (id) => {
  //     return jwt.sign({ id }, process.env.JWT_SECRET, {
  //       expiresIn: "2h",
  //     });
  //   };
  //   // save user token
  //   res.json({ user, token: generateToken(user._id) });
  // }  
  else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
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

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  inviteUser,
};
