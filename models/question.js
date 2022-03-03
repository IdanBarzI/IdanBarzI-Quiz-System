const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details:{
    type:String,
    required:false
  },
  isMultipleAnswers:{
    type:Boolean,
    required:true,
    default:false
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Field",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
},{
  timestamps:true
});


const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
