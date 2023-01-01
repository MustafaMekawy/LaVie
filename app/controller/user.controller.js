const User = require('../../db/model/user.model');
const myhelper = require('../helper');
class UserClass {
  static inputFilter = body => {
    body.role = undefined;
    return body;
  };
  static signUp = async (req, res) => {
    try {
      const bodyObj = this.inputFilter(req.body);
      console.log('kkk');
      console.log('kkk');
      const user = new User(bodyObj);
      await user.save();
      const token = await user.generatToken();
      //   await user.save();
      myhelper.reshandeler(res, 200, true, { user, token }, 'SignedUp succesfully');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.logincheck(email, password);
      const token = await user.generatToken();
      //   await user.save();
      myhelper.reshandeler(res, 200, true, { user, token }, 'logged in succesfully');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };

  static showAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      if (!users) throw new Error('No Users Found!');
      myhelper.reshandeler(res, 200, true, users, 'Show all users.');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };

  static assignAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw new Error('No Users Found!');

      if (user.role === 'admin') throw new Error('This user is already an admin!');

      user.role = 'admin';
      await user.save({ validateBeforeSave: false });
      myhelper.reshandeler(res, 200, true, user, 'Admin Assigned Successfully.');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}

module.exports = UserClass;
