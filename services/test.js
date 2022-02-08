const Test = require("../models/test");

class TestService {
  async getAll(user) {
    const foundTests = await Test.find({ organization: user.organization })
      .populate({ path: "questions", populate: { path: "answers" } })
      .populate("fields");
    return foundTests;
  }

  async getTestsByfield(field, user) {
    const foundTests = await Test.find({
      field,
      organization: user.organization,
    });
    return foundTests;
  }

  async getTestsByTags(tags, user) {
    const foundTests = await Test.find({
      tags,
      organization: user.organization,
    });
    return foundTests;
  }

  async addTest(newTest, user) {
    const testToAdd = new Test(newTest);
    testToAdd.organization = user.organization;
    testToAdd.ownerEmail = user.email;
    await testToAdd.save();
    return { testToAdd };
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
    const test = await Test.findByIdAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    return test;
  }
}

module.exports = TestService;
