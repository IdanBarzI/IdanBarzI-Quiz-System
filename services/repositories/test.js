const Test = require("../../models/test");

class TestService {
  constructor() {}

  async getAll(user) {
    try {
      const foundTests = await Test.find({ organization: user.organization })
        .populate({ path: "questions", populate: { path: "answers" } })
        .populate("field");
      console.log(foundTests);
      return foundTests;
    } catch (err) {
      console.log(err);
    }
  }

  async getTestsByfield(field, user) {
    const foundTests = await Test.find({
      field,
      organization: user.organization,
    });
    return foundTests;
  }

  async getTestById(id) {
    const test = await Test.findById(id);
    return test.populate({
      path: "questions",
      populate: {
        path: "answers",
      },
    });
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
    const clientUrl = process.env.LOCAL_CLIENT_URL;
    testToAdd.testUrl = `${clientUrl}/student/test/${this._id}`;
    await testToAdd.save();
    return testToAdd;
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
