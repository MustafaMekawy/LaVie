const mongoose = require('mongoose');
const QuizSchema = mongoose.Schema({
    about:{
        type:String,
        required:true,
        enum:["plant","seed"]
    },
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        default:""
        }
});
const Quiz = mongoose.model('Qize', QuizSchema);
module.exports = Quiz;
