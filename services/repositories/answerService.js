const Answer = require("../../models/answer");

class AnswerService {
  async addAnswer(answer) {
    const newAnswer = new Answer(answer);
    await newAnswer.save();
    return newAnswer;
  }

  async getByTitle(title) {
    const ans = await Answer.findOne({ title: title });
    return ans;
  }

  async removeById(id) {
    const ans = await Answer.findByIdAndRemove(id);
    return ans;
  }
}

module.exports = AnswerService;
