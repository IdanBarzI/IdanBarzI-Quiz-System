const awilix = require("awilix");
const QuestionService = require("../services/question");
const FieldService = require("../services/field");
const TestService = require("../services/test");

const Lifetime = awilix.Lifetime;

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
  container.register({
    questionService: awilix.asClass(QuestionService, {
      lifetime: Lifetime.TRANSIENT,
    }),
    fieldService: awilix.asClass(FieldService, {
      lifetime: Lifetime.TRANSIENT,
    }),
    testService: awilix.asClass(TestService, {
      lifetime: Lifetime.TRANSIENT,
    }),
  });
}

module.exports = {
  container,
  setup,
};
