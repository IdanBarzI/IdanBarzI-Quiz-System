
class TestReportService{
    constructor(studentTestService){
        this._studentTestService = studentTestService
    }

    async getReportByTest(testId,fromDate,toDate,user){
        const tests = await this._studentTestService.getAllWithTestId(testId,fromDate,toDate,user)
        return tests
    }

    async getReportByStudentName(studentFirstName,user){
        const tests = await getByStudent(studentFirstName,user)
        return tests
    }



}

module.exports=TestReportService