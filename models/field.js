const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
});

const Field = mongoose.model("Field", fieldSchema);

module.exports.Field = Field;
