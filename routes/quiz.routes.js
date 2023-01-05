const router = require('express').Router();
const quizController = require('../app/controller/quiz.controller');
const { auth } = require('../app/middlewares/auth.middlewares');

router.post('/createquiz', auth, quizController.createQuiz);
router.post('/takequiz', auth, quizController.takeQuiz);
router.post('/solvequiz/:quizid', auth, quizController.solveQuiz);
module.exports=router