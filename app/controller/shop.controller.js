const Shop = require('../../db/model/shop.model');
const myhelper = require('../helper');
class ShopClass {
  static createShop = async (req, res) => {
    try {
      console.log(req.user);
      req.body.userId = req.user._id;
      if (req.user.accountType != 'professional')
        throw new Error(
          'your account must be professional to create shop'
        );
      const shop = new Shop(req.body);
      await shop.save();
      myhelper.reshandeler(res, 200, true, shop, 'shop created');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static GetShop = async (req, res) => {
    try {
      const shop = await Shop.findById(req.params.id);
      myhelper.reshandeler(res, 200, true, shop, ' Single shop ');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static GetAllShop = async (req, res) => {
    try {
      const shops = await Shop.find();
      myhelper.reshandeler(res, 200, true, shops, 'All shops');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  //crud
  static editShop = async (req, res) => {
    try {
      const shop = await Shop.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      myhelper.reshandeler(res, 200, true, shop, 'edit shop');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static deletShop = async (req, res) => {
    try {
      const shop = await Shop.findByIdAndDelete(req.params.id);
      if (!shop) throw new Error("wrong id 'shop not found!'");
      myhelper.reshandeler(res, 200, true, null, 'delete shop');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}
module.exports = ShopClass;
