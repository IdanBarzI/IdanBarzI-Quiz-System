const StudentTest = require('../models/studentTest')


class StudentTestService{
    async getAll(user){
        const allTests = await StudentTest.find({organization:user.organization})
        return {allTests}
    }

    async getByStudent(student,user){
        const {studentFirstName,studentLastName,studentEmail,studentPhone} = student; 
        const tests = await StudentTest.find({studentFirstName,studentLastName,studentEmail,studentPhone,organization:user.organization})
        return {tests}
    }

    async addNewStudentExam(studentExam,user){
        const newStudentTest = new StudentTest(studentExam)
        newStudentTest.organization=user.organization
        await newStudentTest.save();
        return newStudentTest
    }

    async removeById(id,user){
        const testToRemove = StudentTest.findByIdAndRemove({_id:id,organization:user.organization})
        return testToRemove
    }
}

module.exports=StudentTestService