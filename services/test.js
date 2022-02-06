const Test = require("../models/test");

class TestService {
  async getTestsByfield(field) {
    const foundTests = await Test.find({ field });
    return foundTests;
  }

  async updateTest(id, test) {
    const dbTest = await Test.findByIdAndUpdate(
      id,
      {
        $set: test,
      },
      { new: true, useFindAndModify: false }
    );
    return dbTest;
  }

  async deleteTest(id) {
    const test = await Test.findByIdAndRemove(id, { useFindAndModify: false });
    return test;
  }
}

module.exports = TestService;
