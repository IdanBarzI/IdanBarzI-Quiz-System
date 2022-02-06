const Question = require("../models/question");

class QuestionService {
  async getAll() {
    const questions = await Question.find({});
    return questions;
  }

  async getQuestionsByField(field) {
    const questions = await Question.find({ field });
    return questions;
  }

  async addQuestion(newQuestion) {
    const question = new Question(newQuestion);
    await question.save();
    return { question };
  }

  async updateQuestion(id, question) {
    const dbQuestion = await Question.findByIdAndUpdate(
      id,
      {
        $set: question,
      },
      { new: true, useFindAndModify: false }
    );
    return dbQuestion;
  }

  async deleteQuestion(id) {
    return await Question.findByIdAndRemove(id, { useFindAndModify: false });
  }
}

module.exports = QuestionService;
