const jwt = require('jsonwebtoken');
const User = require('../../db/model/user.model');
const MyHelper = require('../helper');
const auth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization.startsWith('Bearer'))
      token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.tokenpass);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('This token is unvalid!');
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    MyHelper.reshandeler(res, 500, false, error, 'Unauthorized!!');
  }
};

const restrictoTo = role => {
  return (req, res, next) => {
    try {
      if (req.user.role !== role)
        throw new Error(
          'You donot have access to perform this action'
        );
      next();
    } catch (e) {
      MyHelper.reshandeler(res, 500, false, e, 'Not allowed!!');
    }
  };
};

module.exports = { auth, restrictoTo };
