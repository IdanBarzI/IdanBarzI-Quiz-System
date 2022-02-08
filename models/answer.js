const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const answerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: true,
  },
});

answerSchema.methods.toJSON = function () {
  answer = this;
  const answerObject = answer.toObject();

  delete answerObject.isCorrect;

  return answerObject;
};

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
