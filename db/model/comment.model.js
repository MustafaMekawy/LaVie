const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
  comunityId: {
    type:mongoose.Schema.ObjectId,
    ref:"Comunity",
    required:true
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  date: Date ,
  likes:[{
    like:Boolean,
    username:String,
  }],
  replays:[{
    replay:String,
    username:String,
    date:Date
  }],
  votes:Number
});

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;
