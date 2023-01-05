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
    questions:[{type:String}],
    mark:{
        type:Number,
        default:3
    },
    answers:[{type:String}],
    level:{
        type:String,
        required:true,
        enum:['beginner', 'advanced', 'professional']
    }

});
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
