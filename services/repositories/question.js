const Question = require("../../models/question");
const Test =require('../../models/test')


class QuestionService {

  constructor(tagService,answerService){
    this._tagService = tagService
    this._answerService = answerService
  }

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

  async getNumOfTests(id){
      const tests = await Test.find(test=>{
        test.question.includes(id)
      })
      return tests.length
  }

  async addQuestion(newQuestion, user) {
    let newTags = [];
    let newQuestions = []

    var tags = newQuestion.tags;
    for(let tag in tags){
      const tagFromRepo = await this._tagService.getByTitle(tags[tag].title)
      if(!tagFromRepo){
        const newTag = await this._tagService.addTag(tags[tag])
        newTags.push(newTag._id);
      }
      else{
        newTags.push(tagFromRepo._id);
      }
    }

    var answers = newQuestion.answers
    for(let answer in newQuestion.answers){
      const answerFromRepo = await this._answerService.getByTitle(answers[answer].title)
      if(!answerFromRepo){
        const newAnswer = await this._answerService.addAnswer(answers[answer])
        newQuestions.push(newAnswer._id.toString());
      }
      else{
        newQuestions.push(answerFromRepo._id.toString());
      }
    }

    newQuestion.tags = newTags;
    newQuestion.answers=newQuestions;


    const question = new Question(newQuestion); 

    question.organization = user.organization;
    await question.save();
    return  question ;
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
