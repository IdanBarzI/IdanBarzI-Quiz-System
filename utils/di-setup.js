const awilix = require("awilix");
const QuestionService = require("../services/repositories/question");
const FieldService = require("../services/repositories/field");
const TestService = require("../services/repositories/test");
const StudentTestService = require("../services/repositories/studentTestService");
const AnswerService = require("../services/repositories/answerService");
const TagService = require("../services/repositories/tagService");
const TestCheckService = require('../services/testCheck/testCheckService')

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
  container.register({
    questionService: awilix.asClass(QuestionService).singleton(),
    fieldService: awilix.asClass(FieldService).singleton(),
    testService: awilix.asClass(TestService).singleton(),
    studentTestService: awilix.asClass(StudentTestService).singleton(),
    tagService:awilix.asClass(TagService).singleton(),
    answerService: awilix.asClass(AnswerService).singleton(),
    testCheckService : awilix.asClass(TestCheckService).singleton()
  });
}

module.exports = {
  container,
  setup,
};
