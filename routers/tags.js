const express = require("express");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const tagService = container.resolve("tagService");

router.get("/tags", async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.send(tags);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/tags", async (req, res) => {
  try {
    const newTag = await tagService.addTag(req.body);
    console.log(newTag);
    res.status(201).send(newTag);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
