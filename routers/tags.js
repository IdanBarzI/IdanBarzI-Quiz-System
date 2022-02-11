const express = require("express");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const tagService = container.resolve("tagService");

router.post("/tags", async (req, res) => {
  try {
    const newTag = await tagService.addTag(req.body);
    res.status(201).send(newTag);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;