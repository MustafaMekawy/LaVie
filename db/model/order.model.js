const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require("bcryptjs")
const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  items: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Item',
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Invalid Email!'],
  },
  phoneNum: [
    {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, 'ar-EG'))
          throw new Error('invalid number');
      },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash', 'creditCard'],
  },
  amount: {
    type: Number,
  },
  confirmCode: String,
});

orderSchema.methods.encryptConfirmCode = async function (code) {
  this.confirmCode = await bcrypt.hash(code, 10);
  console.log(this.confirmCode);
};
orderSchema.methods.checkConfirmCode = async function (code) {
  console.log(this.confirmCode,code);
  const check= await bcrypt.compare(code,this.confirmCode);
  console.log(check);
  return(check)
};
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
