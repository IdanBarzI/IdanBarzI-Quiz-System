const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
