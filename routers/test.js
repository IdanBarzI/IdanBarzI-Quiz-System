const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const testService = container.resolve("testService");

router.get('/tests/:id',async(req,res)=>{
   const id = req.params.id;
   const test = await testService.getTestById(id)
   res.status(200).send(test)
})

router.get("/tests", auth, async (req, res) => {
  const tests = await testService.getAll(req.user);
  res.send(tests);
});

router.get("/tests/field", auth, async (req, res) => {
  const field = req.body.field;
  const tests = await testService.getTestsByfield(field, req.user);
  res.send( tests);
});


router.get("/tests/tags", auth, async (req, res) => {
  const tags = req.body.tags;
  const tests = await testService.getTestsByTags(tags, req.user);
  res.send(tests );
});

router.post("/tests", auth, async (req, res) => {
  try {
    const newTest = await testService.addTest(req.body, req.user);
    res.status(201).send(newTest);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/tests", auth, async (req, res) => {
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

router.delete("/tests:id", auth, async (req, res) => {
  try {
    const test = await testService.deleteTestById(req.params.id);
    res.send({ test });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
