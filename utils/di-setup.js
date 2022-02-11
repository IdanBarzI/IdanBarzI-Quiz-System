const awilix = require("awilix");
const QuestionService = require("../services/repositories/question");
const FieldService = require("../services/repositories/field");
const TestService = require("../services/repositories/test");
const StudentTestService = require("../services/repositories/studentTestService");
const AnswerService = require("../services/repositories/answerService");
const TagService = require("../services/repositories/tagService");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
  container.register({
    questionService: awilix.asClass(QuestionService).transient(),
    fieldService: awilix.asClass(FieldService).transient(),
    testService: awilix.asClass(TestService).transient(),
    studentTestService: awilix.asClass(StudentTestService).transient(),
    answerService: awilix.asClass(AnswerService).transient(),
    tagService:awilix.asClass(TagService).transient()
  });
}

module.exports = {
  container,
  setup,
};
