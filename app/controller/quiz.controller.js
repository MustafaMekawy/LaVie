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
      let quizs = await Quiz.find({ level: req.user.category });

      quizs = quizs.filter(q => {
        return !req.user.quizes.includes(q.id);
      });
      if (quizs.length == 0) throw new Error('now quizes for now');
      const randomIndex = Math.floor(Math.random() * quizs.length);
      const quiz = quizs[randomIndex];
      myhelper.reshandeler(
        res,
        200,
        true,
        { quizName: quiz.name, questions: quiz.questions },
        `to solve the quiz click here http://127.0.0.1:3000/api/v1/quiz/solvequiz/${quiz.id}`
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static solveQuiz = async (req, res) => {
    try {
      // const quiz = await Quiz.findById(req.params.quizid);
      let answers = req.body.answers;

      req.user.quizes.push(req.params.quizid);

      req.user.quizAnswers = answers;
      await req.user.save({ validateBeforeSave: false });

      myhelper.reshandeler(res, 200, true, answers, 'Answers Submitted');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static markQuiz = async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizid);
      let answers;
      let mark = 0;

      if (req.user.counter >= 2) {
        if (!myhelper.aDayhasPassed(new Date().getTime(), req.user.lastQuizTime.getTime()))
          throw new Error('You have exeeded toyr max quizes per day!');
        else req.user.counter = 0;
      }

      answers = req.user.quizAnswers.map((a, i) => {
        return a == quiz.answers[i];
      });
      answers.forEach(a => {
        a == true ? (mark += 1) : (mark += 0);
      });

      req.user.points += mark;
      req.user.wallet += mark;

      req.user.quizAnswers = undefined;
      req.user.counter += 1;
      req.user.lastQuizTime = Date.now();

      await req.user.save({ validateBeforeSave: false });

      myhelper.reshandeler(res, 200, true, { answers, mark }, 'thouse your grade ');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}
module.exports = QuizClass;
