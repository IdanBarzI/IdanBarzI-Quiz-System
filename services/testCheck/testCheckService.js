const StudentTest =require("../../models/studentTest")
const StudentAnswer = require('../../models/studentAnswer')
const Test = require('../../models/test')

class TestCheckService {
   
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

    async checkTest(testData){
        const studentAnswers = testData.studentAnswers
        const test = testData.test;
        const fullTest =await Test.findById(test._id)
            .populate({ path: "questions", populate: { path: "answers" } })
            .populate("field");
        const studentCredentials = testData.studentCredentials
        let newStudentAnswers = []

        // fullTest.questions.map(async(question)=>{
        //     //currently supporty only single choise question , need to refactor
        //     const studentAnswer = studentAnswers.filter((answe)=>answe.questionId===question._id.toString())
        //     const correctAnswer = question.answers.filter((ans)=>ans.isCorrect===true)
        //     const newStudentAnswer = new StudentAnswer({
        //         answer:studentAnswer.selected._id,
        //         isSelected:studentAnswer.selected._id===correctAnswer._id ? true:false
        //     })
        //     newStudentAnswers.push(newStudentAnswer)
        //     await newStudentAnswer.save()

        // })

        for(let i = 0 ; i<fullTest.questions.length;i++){
            const studentAnswer = await studentAnswers.filter((answe)=>answe.questionId===fullTest.questions[i]._id.toString())
            const correctAnswer = await fullTest.questions[i].answers.filter((ans)=>ans.isCorrect===true)
            const newStudentAnswer = new StudentAnswer({
                answer:studentAnswer[0].selected._id,
                isSelected:studentAnswer[0].selected._id===correctAnswer[0]._id.toString() ? true:false
            })
            newStudentAnswers.push(newStudentAnswer)
            await newStudentAnswer.save()
        }
        const finalGrade =this.getFinalGrade(newStudentAnswers,test)
        let studentAnswerIDArray = []

        for (let i = 0 ; i< newStudentAnswers.length;i++) {
            studentAnswerIDArray.push(newStudentAnswers[i]._id)     
        }
        //creating new StudentTest Object 
        const newStudentTest = new StudentTest({
            studenFirstName : studentCredentials.firstName,
            studenLastName : studentCredentials.lastName,
            studentEmail:studentCredentials.email,
            studentPhone:studentCredentials.phone,
            finalGrade : finalGrade,
            test: test._id,
            studentAnswers:studentAnswerIDArray
        })
        await newStudentTest.save();
        const nst = await StudentTest.findById(newStudentTest._id)
        .populate({
            path:"test",
            populate:{
                path: "questions",
                populate: { 
                  path: "answers" 
                } 
            }
        })
        .populate({
            path:"studentAnswers",
            populate:{
                path:"answer"
            }
        });
        return nst

    }
}

module.exports =TestCheckService