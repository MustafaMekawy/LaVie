const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserSchma = mongoose.Schema({
  fName: {
    type: String,
    required: true,
    validate: {
      validator: function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0 ? false : true;
      },
      message: 'First name must be one word!',
    },
  },
  lName: {
    type: String,
    required: true,
    validate: {
      validator: function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0 ? false : true;
      },
      message: 'Last name must be one word!',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Invalid Email!'],
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirmation: {
    type: String,
    required: true,
    validate: {
      validator: function (p) {
        return this.password == p;
      },
      message: 'invalid password confirmation',
    },
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['admin', 'user'],
      message: 'Invalid Role!',
    },
    default: 'user',
  },
  category:{
    type:String
  },
  accountType:{
    type:String,
    enum:["regular","professional"],
    required:true
  },
  points:{
    type:Number
  },
  age:{
    type:Number,
    min:21,
    max:60,
    default:21
  }, 
  image:{
    type:String, 
    trim:true
  }, 
  gender:{
    type:String, 
    trim:true,
    lowercase:true,
    enum: ["male", "female"]
  },
  phoneNum:{
    type: String,
    validate(value){
        if(!validator.isMobilePhone(value, "ar-EG"))
            throw new Error ("invalid number")
    }},
    resetPasswordToken: String,
    resetExpiresTime: Date,
},{timestamps:true}
);
UserSchma.pre('save', async function () {
  if (this.isModified) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmation = undefined;
  }
});

UserSchma.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetExpiresTime = Date.now() + 10 * 60 * 1000;
  return resetToken;
}
UserSchma.statics.Passcheck = async function (user,password) {
  const passVaild = await bcrypt.compare(password, user.password);
  console.log(passVaild);
  // if (!passVaild) throw new Error('invalid password');  
  return(passVaild)
}
UserSchma.statics.logincheck = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('invalid email');
  if(!await (this.Passcheck(user,password))) {
    throw new Error('invalid password');}
   return user;
};
UserSchma.methods.generatToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.tokenpass);
  return token;
};
const User = mongoose.model('user', UserSchma);
module.exports = User;
