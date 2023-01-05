const User = require('../../db/model/user.model');
const crypto = require('crypto');
const myhelper = require('../helper');

class UserClass {
  static inputFilter = (body, ...options) => {
    options.forEach(o => {
      body[o] = undefined;
    });
    return body;
  };
  static signUp = async (req, res) => {
    try {
      const bodyObj = this.inputFilter(req.body, 'role');
      const user = new User(bodyObj);
      await user.save();
      const token = await user.generatToken();
      myhelper.reshandeler(
        res,
        200,
        true,
        { user, token },
        'SignedUp succesfully, go to this link to choose your level : http://127.0.0.1:3000/api/v1/user/chooseCategory'
      );
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
      myhelper.reshandeler(
        res,
        200,
        true,
        { user, token },
        'logged in succesfully'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static showAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      if (!users) throw new Error('No Users Found!');
      myhelper.reshandeler(res, 200, true, users, 'Show all users.');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static assignAdmin = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw new Error('No Users Found!');
      if (user.role === 'admin')
        throw new Error('This user is already an admin!');
      user.role = 'admin';
      await user.save({ validateBeforeSave: false });
      myhelper.reshandeler(
        res,
        200,
        true,
        user,
        'Admin Assigned Successfully.'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static profile = (req, res) => {
    myhelper.reshandeler(
      res,
      200,
      true,
      { user: req.user },
      'user profile fetched'
    );
  };
  static editprofile = async (req, res) => {
    try {
      const data = this.inputFilter(req.body, 'password', 'role');
      const user = await User.findByIdAndUpdate(req.user._id, data, {new: true,});
      myhelper.reshandeler(
        res,
        200,
        true,
        user,
        'user ediet successfully'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static deleteaccount = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user._id);
      myhelper.reshandeler(res, 200, true, null, 'deleted');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static changePassword = async (req, res) => {
    try {
      const password = req.body.password;
      if (!(await User.Passcheck(req.user, password)))
        throw new Error('invalid password');
      const newPassword = req.body.newPassword;
      req.user.password = newPassword;
      await req.user.save({ validateBeforeSave: false });
      myhelper.reshandeler(
        res,
        200,
        true,
        req.user,
        'password change Successfully'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static forgetPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const token = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });
      myhelper.reshandeler(
        res,
        200,
        true,
        null,
        ` Forget your password? If you willing to reset it please click on this link \n http://127.0.0.1:3000/api/v1/user/resetpassword/${token} \n If you aren't willing to change it please kindly ignore this message. \nthanks`
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static resetpassword = async (req, res) => {
    try {
      const deecryptedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
      const user = await User.findOne({
        resetPasswordToken: deecryptedToken,
        resetExpiresTime: { $gt: Date.now() },
      });
      user.password = req.body.password;
      user.passwordConfirmation = req.body.passwordConfirmation;
      user.resetExpiresTime = user.resetPasswordToken = undefined;
      await user.save();
      myhelper.reshandeler(res, 200, true, user, 'password reset ');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static chooseCategory = async (req, res) => {
    try {
      const category = ['beginner', 'advanced', 'professional'];
      const inputCategory = category.find(c => {
        console.log(c);
        return req.body.category == c;
      });
      console.log(inputCategory);
      if (!inputCategory)
        throw new Error(
          'categroy must be one of [beginner,advanced,professional]'
        );
      req.user.category = inputCategory;
      await req.user.save({ validateBeforeSave: false });
      myhelper.reshandeler(
        res,
        200,
        true,
        req.user,
        'category added Successfully'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static Logout = async (req, res) => {
    try {
      req.token = '';
      myhelper.reshandeler(res, 200, true, req.token, 'logeed out');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static LearnMore = async (req, res) => {
    myhelper.reshandeler(res, 200, true, null, 'polcey and terms');
  };
  static ContactUS = async (req, res) => {
    myhelper.reshandeler(
      res,
      200,
      true,
      null,
      'contact us in thses numbers'
    );
  };
  static homePage = async (req, res) => {
    myhelper.reshandeler(res, 200, true, null, 'home page');
  };
}

module.exports = UserClass;
