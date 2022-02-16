const Question = require("../../models/question");
const Test =require('../../models/test')
const TagService = require('./tagService')
const AnswerService = require('./answerService')

class QuestionService {

  constructor(tagService,answerService){
    this._tagService = new TagService()
    this._answerService = new AnswerService();
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

    // await newQuestion.tags.map(async(tag)=>{
    //   const tagFromRepo = await this._tagService.getByTitle(tag.title)
    //   if(!tagFromRepo){
    //     const newTag = await this._tagService.addTag(tag)
    //     newTags.push(newTag._id);
    //   }
    //   else{
    //     newTags.push(tagFromRepo._id);
    //   }
    // })
    // await newQuestion.answers.map(async(answer)=>{
    //   const answerFromRepo = await this._answerService.getByTitle(answer.title)
    //   if(!answerFromRepo){
    //     const newAnswer = await this._answerService.addAnswer(answer)
    //     newQuestions.push(newAnswer._id);
    //   }
    //   else{
    //     newQuestions.push(answerFromRepo._id);
    //   }
    // })

    // newQuestion.tags = newTags;
    // newQuestion.questions=newQuestions;


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
