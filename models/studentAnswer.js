const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentAnswerSchema = new Schema({
  isSelected: {
    type: Boolean,
    required: true,
  },
  answer:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Answer",
      required:true
  },
  question:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Question",
    required:true
  }

});

studentAnswerSchema.methods.toJSON = function () {
  answer = this;
  const answerObject = answer.toObject();

  //delete answerObject.isCorrect;

  return answerObject;
};

const StudentAnswer = mongoose.model("StudentAnswer", studentAnswerSchema);
module.exports = StudentAnswer;