const mongoose = require("mongoose");

const userHubsSchema = mongoose.Schema({
  hubUsers: [String],
});

module.exports = mongoose.model("UserHubs", userHubsSchema);
