const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentTestSchema = new Schema(
  {
    studenFirstName: {
      type: String,
      required: true,
    },
    studenLastName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
      lowercase:true
    },
    studentPhone: {
      type: String,
      required: true,
    },
    finalGrade: {
      type: Number,
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    studentAnswers:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"StudentAnswer",
      required:true
    }],
    certificateUrl: {
      type: String
    },
    // fieldOfStudy:{
    //     type: String,
    //     required: true,
    // },
    // organization : {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref:"Organiization"
    // }
  },
  {
    timestamps: true,
  }
);

const StudentTest = mongoose.model("StudentTest", StudentTestSchema);
module.exports = StudentTest;
