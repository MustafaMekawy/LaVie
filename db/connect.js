const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.set('strictQuery', true);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DataBase Connected Successfully...');
  })
  .catch(err => {
    console.log(err.message);
  });
