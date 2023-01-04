const Cart = require('../../db/model/cart.model');
const Item = require('../../db/model/item.model');
const User = require('../../db/model/user.model');
const myhelper = require('../helper');
class CartClass {
  static createCart = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) throw new Error('No user with that id!');

      const cart = await Cart.create({
        userId: req.user.id,
      });

      myhelper.reshandeler(res, 200, true, cart, 'Cart Created.');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };

  static viewCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) throw new Error('No cart with that id!');
      myhelper.reshandeler(
        res,
        200,
        true,
        cart,
        'click her to buy http://127.0.0.1:3000/api/v1/order/plcacitems'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };

  static addToCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) throw new Error('No cart with that id!');

      const item = await Item.findById(req.params.itemId);
      if (!item) throw new Error('No item with that id!');

      const check = cart.items.map(p => {
        if (p.item == item.id) p.num += req.body.num;
        return p.item == item.id;
      });

      if (check.length == 0 || check[check.length - 1] == false) {
        const myObj = { item: item, num: req.body.num };
        cart.items.push(myObj);
      }
      cart.itemsCounter('add', req.body.num);
      await cart.save();

      myhelper.reshandeler(res, 200, true, cart, 'Item added.');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };

  static dropFromCart = async (req, res) => {
    try {
      let nDeletedItems = 0;
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) throw new Error('No cart with that id!');

      const item = await Item.findById(req.params.itemId);
      if (!item) throw new Error('No items with that id!');

      cart.items.forEach(p => {
        if (p.item == item.id) {
          nDeletedItems = req.body.num;
          if (req.body.num > p.num) nDeletedItems = p.num;
          p.num -= nDeletedItems;
        }
        if (p.num == 0) cart.items.pull(p);
      });

      //   console.log(nDeletedItems);
      cart.itemsCounter('drop', nDeletedItems);
      process.env.cartItems = cart.items;
      // console.log(process.env.cartItems);
      await cart.save();
      myhelper.reshandeler(res, 200, true, cart, 'Item dropped.');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}
module.exports = CartClass;
