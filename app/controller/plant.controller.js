const Plant = require('../../db/model/item.model');
const myhelper = require('../helper');
class PlantClass {
  static createPlant = async (req, res) => {
    try {
      const plant = new Plant(req.body);
      await plant.save();
      myhelper.reshandeler(
        res,
        200,
        true,
        plant,
        'plant created in your shop'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static Getplant = async (req, res) => {
    try {
      const plant = await Plant.findById(req.params.id);
      myhelper.reshandeler(res, 200, true, plant, ' Single plant ');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static GetAllPlants = async (req, res) => {
    try {
      const plants = await Plant.find();
      myhelper.reshandeler(res, 200, true, plants, 'All shops');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static editPlant = async (req, res) => {
    try {
      const plant = await Plant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      myhelper.reshandeler(res, 200, true, plant, 'edit plant');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static deletShop = async (req, res) => {
    try {
      const plant = await Plant.findByIdAndDelete(req.params.id);
      if (!plant) throw new Error("wrong id 'plant not found!'");
      myhelper.reshandeler(res, 200, true, null, 'delete plant');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static buyPlant = async (req, res) => {
    try {
      const plant = await Plant.findById(req.params.id);
      if (!plant) throw new Error("wrong id 'plant not found!'");
      req.user.orders.push(plant);
      await req.user.save({ validateBeforeSave: false });
      myhelper.reshandeler(
        res,
        200,
        true,
        req.user.orders,
        'buy plant is done'
      );
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}
module.exports = PlantClass;
