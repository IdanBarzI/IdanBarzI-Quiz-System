const StudentTest = require('../../models/studentTest')


class StudentTestService{
    constructor(testCheckService){
        this._testCheckService=testCheckService
    }


    async getAll(user){
        const allTests = await StudentTest.find({organization:user.organization})
        return allTests
    }

    async getAllWithTestId(testId,fromDate,toDate,user){
        const allTests = await StudentTest.find({test:testId,organization:user.organization})
        if(fromDate>toDate){
            return null;
        }
        if(!fromDate || !toDate){
            return allTests
        }
        else{
            const filteredByDate = allTests.filter((test)=>(test.createdAt > fromDate&& test.createdAt<toDate ))
            return filteredByDate
        }
    }

    async getByStudent(studentFirstName,user){
        var regex = new RegExp("^"+studentFirstName)
        const tests = await StudentTest.find({studentFirstName:regex,organization:user.organization})
        return tests
    }

    async addNewStudentExam(studentExam){
        const newStudentTest = await this._testCheckService.checkTest(studentExam)
        const studentTest = new StudentTest(newStudentTest)
        await studentTest.save();
        return studentTest
    }

    async removeById(id,user){
        const testToRemove = StudentTest.findByIdAndRemove({_id:id,organization:user.organization})
        return testToRemove
    }
}

module.exports=StudentTestService