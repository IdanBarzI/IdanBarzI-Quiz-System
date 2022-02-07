const express = require("express");
const router = new express.Router();
const Organiization = require('../models/organization')

router.post('/organization',async(req,res)=>{
    const organiz = new Organiization(req.body)
    organiz.save();
    res.status(201).send({organiz})
});

module.exports = router
