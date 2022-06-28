const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

//@desc Get users
//@route GET api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

//@desc Set User
//@route POST api/users
//@access Private
const setUser = asyncHandler(async (req, res) => {
  if (!req.body.username) {
    res.status(400);
    throw new Error("Please set a text field");
  }
  const users = await Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isPrincipal: req.body.isPrincipal,
    relationship: req.body.relationship,
    avatarUrl: req.body.avatarUrl,
  });
  res.status(201).json(users);
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

module.exports = { getUsers, setUser, updateUser, deleteUser };
