const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const answerService = container.resolve("answerService");

router.post('/answer',async(req,res)=>{
    const answer = await answerService.addAnswer(req.body)
    res.send(answer)
})

module.exports = router 