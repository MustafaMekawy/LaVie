const express = require('express');
const userRouter = require('../routes/user.routes');
const shopRouter = require('../routes/shop.routes');
const plantRouter = require('../routes/plant.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/shop', shopRouter);
app.use('/api/v1/plant', plantRouter);
module.exports = app;
