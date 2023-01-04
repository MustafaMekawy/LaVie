const Item = require('../../db/model/item.model');
const User = require('../../db/model/user.model');
const Order = require('../../db/model/order.model');
const Cart = require('../../db/model/cart.model');
const myhelper = require('../helper');
class OrderClass {
  //step1
  static plcacItems = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });

      const items = cart.items.filter(item => {
        return req.body.items.find(i => {
          return `"${i}"` == JSON.stringify(item.item);
        });
      });

      console.log(items);
      let amount = 0;
      for (let i = 0; i < items.length; i++) {
        const currentItem = await Item.findById(items[i].item);
        // console.log(currentItem);
        amount += currentItem.price * items[i].num;
      }
      const order = new Order({ items, amount });
      // await order.save({ validateBeforeSave: false });

      myhelper.reshandeler(
        res,
        200,
        true,
        { items, amount },
        `click on this link to add details http://127.0.0.1:3000/api/v1/order/orderdetails`
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  //step2

  static orderDetails = async (req, res) => {
    try {
      const { fullName, email, phoneNum, address, paymentMethod } = req.body;

      console.log(fullName);

      const order = await Order.findById(req.params.orderid);

      if (phoneNum.length < 2) throw new Error('at least add two Numbers');
      //0105,0106,0105

      const uniquePhones = [];

      phoneNum.forEach((p, i) => {
        if (uniquePhones.includes(p) && i == phoneNum.length - 1)
          throw new Error('cant add same number twice');
        else uniquePhones.push(p);
      });

      order.fullName = fullName;
      order.email = email;
      order.phoneNum = phoneNum;
      order.address = address;
      order.paymentMethod = paymentMethod;

      await order.save();

      myhelper.reshandeler(
        res,
        200,
        true,
        order,
        'order detalis Click here to conform order .'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  //step3
  static confirmOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderid);
      const confirmCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      console.log(confirmCode);
      await order.encryptConfirmCode(confirmCode.toString());
      await order.save();
      const emailMessage = `To confirm your order with this items: ${JSON.stringify(
        order
      )},
       please back to the website with this code: ${confirmCode}`;
      myhelper.reshandeler(res, 200, true, null, emailMessage);
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  //step4
  static confirmCode = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderid);
      const code = req.body.code;
      const check = await order.checkConfirmCode(code.toString());
      if (!check) throw new Error('invalid confirmation code');
      order.userId = req.user.id;
      await order.save();
      myhelper.reshandeler(
        res,
        200,
        true,
        null,
        'order is created and will delevir soon'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static myOrders = async (req, res) => {
    try {
      await req.user.populate('myOrders');
      myhelper.reshandeler(
        res,
        200,
        true,
        req.user.myOrders,
        'its your orders'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}
module.exports = OrderClass;
