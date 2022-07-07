const mongoose = require("mongoose");

const userHubsSchema = mongoose.Schema({
  hubName: { type: String, unique: true },
  hubUsers: [String],
  hubPrincipal: { type: String },
  principalPhoto: { type: String },
});

module.exports = mongoose.model("UserHubs", userHubsSchema);
