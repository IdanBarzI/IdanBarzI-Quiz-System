const Field = require("../models/field");

class FieldService {
  async addField(field) {
    const newField = new Field(field);
    await newField.save();
    console.log(field);
    return { newField };
  }
}

module.exports = FieldService;
