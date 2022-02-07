const awilix = require("awilix");
const QuestionService = require("../services/question");
const FieldService = require("../services/field");
const TestService = require("../services/test");
const StudentTestService = require("../services/studentTestService");
const AnswerService = require("../services/answerService");

const Lifetime = awilix.Lifetime;

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
  container.register({
    questionService: awilix.asClass(QuestionService).transient(),
    fieldService: awilix.asClass(FieldService).transient(),
    testService: awilix.asClass(TestService).transient(),
    studentTestService: awilix.asClass(StudentTestService).transient(),
    answerService:awilix.asClass(AnswerService).transient()
  });
}

module.exports = {
  container,
  setup,
};
