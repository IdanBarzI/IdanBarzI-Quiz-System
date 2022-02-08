const Question = require("../models/question");

class QuestionService {
  async getAll(user) {
    const questions = await Question.find({ organization: user.organization })
      .populate("answers")
      .populate("field")
      .populate("tags")
      .populate("organization");
    return questions;
  }

  async getQuestionsByField(field, user) {
    const questions = await Question.find({
      field,
      organization: user.organization,
    });
    return questions;
  }

  async getQuestionsByTags(tags, user) {
    const questions = await Question.find({
      tags,
      organization: user.organization,
    });
    return questions;
  }

  async addQuestion(newQuestion, user) {
    const question = new Question(newQuestion);
    question.organization = user.organization;
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
    return await Question.findByIdAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
  }
}

module.exports = QuestionService;
