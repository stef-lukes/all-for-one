//@desc Get users
//@route GET api/users
//@access Private

const getUsers = (req, res) => {
  res.status(200).json({ message: "Get users" });
};

//@desc Set User
//@route POST api/users
//@access Private

const setUser = (req, res) => {
  res.status(201).json({ message: "Set users" });
};

//@desc Update user
//@route PUT api/users
//@access Private

const updateUser = (req, res) => {
  res.status(200).json({ message: `Update user ${req.params.user_id}` });
};

//@desc Delete user
//@route DELETE api/users
//@access Private

const deleteUser = (req, res) => {
  res.status(200).json({ message: `Delete user ${req.params.user_id}` });
};
module.exports = { getUsers, setUser, updateUser, deleteUser };
