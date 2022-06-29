const mongoose = require("mongoose");

const dailyLogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    activityName: {
      type: String,
      required: [true, "Add activity name"],
    },
    bodyText: {
      type: String,
      required: [true, "Add bodyText"],
    },
    categories: {
      type: [String],
      required: [true, ["", "", ""]],
    },
    colour: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: true,
    },
    isRecurring: {
      type: Boolean,
      required: [true, "Is this activity recurring?"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dailyLogModel", dailyLogSchema);
