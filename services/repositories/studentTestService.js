const StudentTest = require('../../models/studentTest')


class StudentTestService{
    constructor(testCheckService){
        this._testCheckService=testCheckService
    }


    async getAll(user){
        const allTests = await StudentTest.find({organization:user.organization})
        return allTests
    }

    

    async getByStudent(student,user){
        const {studentFirstName,studentLastName,studentEmail,studentPhone} = student; 
        const tests = await StudentTest.find({studentFirstName,studentLastName,studentEmail,studentPhone,organization:user.organization})
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