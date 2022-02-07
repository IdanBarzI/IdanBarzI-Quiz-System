const Answer = require("../models/answer")

class AnswerService{
    async addAnswer(answer){
        const newAnswer = new Answer(answer);
        await newAnswer.save()
        return newAnswer;
    }
}

module.exports = AnswerService