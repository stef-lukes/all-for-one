const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Add username"],
  },
  email: {
    type: String,
    required: [true, "Add email"],
  },
  password: {
    type: String,
    required: [true, "Add password"],
  },
  isAdmin: {
    type: Boolean,
    required: [true, "Is this user an admin?"],
  },
  isPrincipal: {
    type: Boolean,
    required: [true, "Is this user the Principal user?"],
  },
  relationship: {
    type: String,
    required: [true, "What's this user's relationship to the Principal user?"],
  },
  avatarUrl: {
    type: String,
  },
});

module.exports = mongoose.model("usersModel", userSchema);
