const dotenv = require('dotenv').config();
require('./db/connect');
const app = require('./app/app');

app.listen(process.env.port, () => {
  console.log(`Server is Running on http://localhost:${process.env.port}...`);
});
