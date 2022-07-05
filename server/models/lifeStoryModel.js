const mongoose = require("mongoose");

const questionAnswerSchema = mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});

const lifeStorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Select a category."],
    },
    questionAnswer: {
      type: [questionAnswerSchema],
    },
  },

  {
    //have not added the date property since we have the timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model("lifeStorySchema", lifeStorySchema);
