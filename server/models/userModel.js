const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  lat: { type: Number },
  long: { type: Number },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add name"],
    },
    username: {
      type: String,
      required: [true, "Add username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Add email"],
      unique: true,
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
      required: [
        false,
        "What's this user's relationship to the Principal user?",
      ],
    },
    avatarUrl: {
      type: String,
    },
    hubCodes: {
      type: [String],
      required: [false, "What hubs does this user have associations with?"],
    },
    location: {
      type: locationSchema,
      required: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("usersModel", userSchema);
