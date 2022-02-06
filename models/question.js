const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const Question = mongoose.model("User", questionSchema);
module.exports = Question;
