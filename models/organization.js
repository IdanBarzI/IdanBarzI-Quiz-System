const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
  ],
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports.Organization = Organization;
