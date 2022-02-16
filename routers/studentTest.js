const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const studentTestService = container.resolve("studentTestService");
const testCheckService = container.resolve('testCheckService')

router.get('/student-test',auth,async(req,res)=>{
    try {
        const tests = await studentTestService.getAll(req.user)
        res.send(tests)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/student-test/student',auth,async(req,res)=>{
    try {
        const tests =await studentTestService.getByStudent(req.body,req.user)
        res.send(tests)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/student-test:id',async(req,res)=>{
    try {
        const studentTest = await studentTestService.addNewStudentExam(req.params.id,req.user)
        res.status(201).send(studentTest)
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/student-test/finished',async(req,res)=>{
    try {
        const newStudentTest = await testCheckService.checkTest(req.body)
        res.status(200).send(newStudentTest)
    } catch (err) {
        res.send(err)
    }
})

router.delete('/student-test:id',async(req,res)=>{
    try {
        const removedTest = await studentTestService.removeById(req,params.id,req.user)
        res.send(removedTest)
    } catch (err) {
        
    }
})

module.exports = router