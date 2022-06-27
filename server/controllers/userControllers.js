const asyncHandler = require("express-async-handler");
//@desc Get users
//@route GET api/users
//@access Private

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get users" });
});

//@desc Set User
//@route POST api/users
//@access Private

const setUser = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please set a text field");
  }
  res.status(201).json({ message: "Set users" });
});

//@desc Update user
//@route PUT api/users/:user_id
//@access Private

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update user ${req.params.user_id}` });
});

//@desc Delete user
//@route DELETE api/users/:user_id
//@access Private

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete user ${req.params.user_id}` });
});

module.exports = { getUsers, setUser, updateUser, deleteUser };
