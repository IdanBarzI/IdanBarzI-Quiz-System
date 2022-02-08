const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const testSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lenguge: {
      type: Boolean,
      required: true,
    },
    intro: {
      type: String,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    passGrade: {
      type: Number,
      default: 60,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
    testUrl: {
      type: String,
      required: true,
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
    isReviwable: {
      type: Boolean,
      default: false,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organiization",
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
