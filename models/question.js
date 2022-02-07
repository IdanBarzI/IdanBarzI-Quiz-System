const mongoose = require("mongoose");
const Answer = require('./answer')
const Schema = mongoose.Schema;

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
  organization : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Organiization"
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});


questionSchema.pre("save", async function (next) {
  
  next();
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
