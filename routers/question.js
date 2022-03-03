const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router({ mergeParams: true });
const { container } = require("../utils/di-setup");
const questionService = container.resolve("questionService");

router.get("/qusetions", auth, async (req, res) => {
  const questions = await questionService.getAll(req.user);
  res.send(questions);
});

router.get("/qusetions/field", auth, async (req, res) => {
  const field = req.body.field;
  const questions = await questionService.getQuestionsByField(field, req.user);
  res.send({ questions });
});

router.get("/qusetions/tags", auth, async (req, res) => {
  const tags = req.body.tags;
  const questions = await questionService.getQuestionsByTags(tags, req.user);
  res.send({ questions });
});

router.get("/question/number-of-tests/:id", auth, async (req, res) => {
  const num = await questionService.getNumOfTests(req.params.id);
  res.send(num);
});

router.post("/qusetions", auth, async (req, res) => {
  try {
    const newQusetion = await questionService.addQuestion(req.body, req.user);
    res.status(201).send(newQusetion);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/qusetions", auth, async (req, res) => {
  try {
    const newQusetion = await questionService.updateQuestion(
      req.body._id,
      req.body
    );
    res.send(newQusetion);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.delete("/questions/:id", auth, async (req, res) => {
  try {
    const question = await questionService.deleteQuestion(req.params.id);
    res.send(question);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
