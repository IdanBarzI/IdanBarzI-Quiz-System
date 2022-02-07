const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const StudentTestSchema = new Schema(
  {
    studenFirstName: {
      type: String,
      required: true,
    },
    studenLastName: {
      type: Boolean,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
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
    certificateUrl: {
      type: String,
      required: true,
    },
    fieldsOfStudy: [
      {
        type: String,
        required: true,
      },
    ],
    organization : {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Organiization"
    }
  },
  {
    timestamps: true,
  }
);

const StudentTest = mongoose.model("StudentTest", StudentTestSchema);
module.exports = StudentTest;
