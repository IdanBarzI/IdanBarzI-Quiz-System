const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const { container } = require("../utils/di-setup");
const studentTestService = container.resolve("studentTestService");
const testReportService = container.resolve('testReportService')

router.post("/report/test",auth,async (req, res) => {
     try {
        const {testId,fromDate,toDate} = req.body
        const tests = await testReportService.getReportByTest(testId,new Date(fromDate),new Date(toDate),req.user);
        res.send( tests);
     } catch (err) {
        res.status(400).send(err)
     }
  });

router.post("/reports/student", auth, async (req, res) => {
const field = req.body.field;
const tests = await testService.getTestsByfield(field, req.user);
res.send( tests);
});

module.exports = router