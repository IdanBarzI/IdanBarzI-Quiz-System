const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const questionService = container.resolve("questionService");
const fieldService = container.resolve("fieldService");

router.get("/qusetions", async (req, res) => {
  const questions = await questionService.getAll();
  res.send(questions);
});

router.get("/qusetions/field", async (req, res) => {
  const field = req.body.field;
  const questions = await questionService.getQuestionsByField(field);
  res.send({ questions });
});

router.post("/qusetions", async (req, res) => {
  try {
    const newQusetion = await questionService.addQuestion(req.body);
    res.status(201).send(newQusetion);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/qusetions", async (req, res) => {
  try {
    const newQusetion = await questionService.updateQuestion(
      req.body._id,
      req.body
    );
    res.send(newQusetion);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
