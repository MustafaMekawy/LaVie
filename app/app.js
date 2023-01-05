const express = require('express');
const userRouter = require('../routes/user.routes');
const shopRouter = require('../routes/shop.routes');
const plantRouter = require('../routes/plant.routes');
const cartRouter = require('../routes/cart.routes');
const orderRouter = require('../routes/order.routes');
const blogRouter = require('../routes/blog.routes');
const searchRouter = require('../routes/search.routes');
const quizRouter = require('../routes/quiz.routes');
const ComunityRouter = require('../routes/comunity.routes');
const commentRouter = require('../routes/comment.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/shop', shopRouter);
app.use('/api/v1/plant', plantRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/quiz', quizRouter);
app.use('/api/v1/comunity', ComunityRouter);
app.use('/api/v1/comment', commentRouter);
module.exports = app;
