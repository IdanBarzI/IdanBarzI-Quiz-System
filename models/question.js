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
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
