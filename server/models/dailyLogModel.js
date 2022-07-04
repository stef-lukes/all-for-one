const mongoose = require("mongoose");

const dailyLogSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Post title"],
    },
    body: {
      type: String,
      required: [true, "Add bodyText"],
    },
    categories: {
      type: [String],
      required: [false, ["", "", ""]],
    },
    colour: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: false,
    },
    isRecurring: {
      type: Boolean,
      required: [false, "Is this activity recurring?"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dailyLogModel", dailyLogSchema);
