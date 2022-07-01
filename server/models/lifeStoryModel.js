const mongoose = require("mongoose");

const lifeStorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    heading: {
      type: String,
      required: [true, "Add a title"],
    },
    bodyText: {
      type: String,
      required: [true, "Add bodyText"],
    },
    categories: {
      type: [String],
      required: [false, ["", "", ""]],
    },
  },
  {
    //have not added the date property since we have the timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model("lifeStorySchema", lifeStorySchema);
