const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
});
UserSchma.pre('save', async function () {
  if (this.isModified) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmation = undefined;
  }
});
UserSchma.statics.logincheck = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('invalid email');
  const passVaild = bcrypt.compare(password, user.password);
  if (!passVaild) throw new Error('invalid password');
  return user;
};
UserSchma.methods.generatToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.tokenpass);
  return token;
};
const User = mongoose.model('user', UserSchma);
module.exports = User;
