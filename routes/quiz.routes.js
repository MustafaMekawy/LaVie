const router = require('express').Router();
const quizController = require('../app/controller/quiz.controller');
const { auth, restrictoTo } = require('../app/middlewares/auth.middlewares');

router.post('/createquiz', auth, restrictoTo('admin'), quizController.createQuiz);
router.post('/takequiz', auth, quizController.takeQuiz);
router.post('/solvequiz/:quizid', auth, quizController.solveQuiz);
router.get('/markquiz/:quizid', auth, quizController.markQuiz);
module.exports = router;
