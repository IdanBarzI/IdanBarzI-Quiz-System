const StudentTest =require("../../models/studentTest")
const StudentAnswer = require('../../models/studentAnswer')
const Test = require('../../models/test')

class TestCheckService {


    async checkTest(testData){
        const studentAnswers = testData.studentAnswers
        const test = testData.test;
        const fullTest =await Test.findById(test._id)
        const studentCredentials = testData.student
        let newStudentAnswers = []

        fullTest.questions.map(async(question)=>{
            //currently supporty only single choise question , need to refactor
            const studentAnswer = studentAnswers.filter((answer)=>answer.questionId===question._id)
            const correctAnswer = question.answers.filter((ans)=>ans.isCorrect===true)
            if(studentAnswer.selected._id===correctAnswer._id){
                const newStudentAnswer = new StudentAnswer({
                    answer:studentAnswer.selected._id,
                    isSelected:true
                })
                newStudentAnswers.push(newStudentAnswer)
                await newStudentAnswer.save()
            }
            else{
                const newStudentAnswer = new StudentAnswer({
                    answer:studentAnswer.selected._id,
                    isSelected:false
                })
                newStudentAnswers.push(newStudentAnswer)
                await newStudentAnswer.save()
            }

        })
        const finalGrade = getFinalGrade(newStudentAnswers,test)
        let studentAnswerIDArray = []
        newStudentAnswers.forEach((answer=>studentAnswerIDArray.push(answer._id)))
        //creating new StudentTest Object 
        const newStudentTest = new StudentTest({
            studentFirstName : studentCredentials.firstName,
            studentLastName : studentCredentials.lastName,
            studentEmail:studentCredentials.email,
            studentPhone:studentCredentials.phone,
            finalGrade : finalGrade,
            test: test._id,
            studentAnswers:studentAnswerIDArray
        })
        await newStudentTest.save();
        return newStudentTest;

    }

    getFinalGrade(studentAnswers,test){
        const numOfQuestions = test.questions.length
        const questionPoint = 100/numOfQuestions
        let startGrade = 0;
        for (let i = 0; i < studentAnswers.length; i++) {
            if(studentAnswers[i].isSelected){
                startGrade+=questionPoint
            }
        }
        return startGrade
    }
}

module.exports =TestCheckService