const mongoose = require("mongoose");

const userHubsSchema = mongoose.Schema({
  hubName: {String, unique: true},
  hubUsers: [String],
});

module.exports = mongoose.model("UserHubs", userHubsSchema);
