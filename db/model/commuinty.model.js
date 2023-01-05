const mongoose = require('mongoose');
const ComunitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Comunity = mongoose.model('Comunity', ComunitySchema);
module.exports = Comunity;
