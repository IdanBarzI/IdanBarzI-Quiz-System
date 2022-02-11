const express = require("express");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const fieldService = container.resolve("fieldService");

router.post("/field", async (req, res) => {
  try {
    const newField = await fieldService.addField(req.body);
    res.status(201).send(newField);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
