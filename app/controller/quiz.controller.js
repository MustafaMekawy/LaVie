const Quiz = require('../../db/model/quizes.model');
const myhelper = require('../helper');
class QuizClass {
    static createQuiz = async (req, res) => {
        try {
          const quiz = new Quiz(req.body);
          await quiz.save();
          myhelper.reshandeler(res, 200, true, quiz, 'quiz created');
        } catch (e) {
          myhelper.reshandeler(res, 500, false, e, e.message);
        }
      };
      static takeQuiz = async (req, res) => {
        try {
          const quizs = await Quiz.find({level:req.user.category})
           const randomIndex = Math.floor(Math.random() * quizs.length);
          const quiz = quizs[randomIndex];
          myhelper.reshandeler(res, 200, true, {quizName:quiz.name,questions:quiz.questions}, `to solve the quiz click here http://127.0.0.1:3000/api/v1/quiz/solvequiz/${quiz.id}`);
        } catch (e) {
          myhelper.reshandeler(res, 500, false, e, e.message);
        }
      };
      static solveQuiz = async (req, res) => {
        try {
          const quiz=await Quiz.findById(req.params.quizid)
          let answers=req.body.answers
          answers= answers.map((a,i)=>{
            return a==quiz.answers[i]
          })
          let mark=0
          answers.forEach(a => {
           a==true?mark+=1:mark+=0
          });
          req.user.points+=mark
          await req.user.save({validateBeforeSave: false})
          myhelper.reshandeler(res, 200, true, {answers,mark}, 'thouse your grade ');
        } catch (e) {
          myhelper.reshandeler(res, 500, false, e, e.message);
        }
      };

}
module.exports = QuizClass;