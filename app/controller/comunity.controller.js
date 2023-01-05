const Comunity = require('../../db/model/commuinty.model');
const myhelper = require('../helper');
class ComunityClass {
  static createComunity = async (req, res) => {
    try {
      const comunity = new Comunity(req.body);
      await comunity.save();
      myhelper.reshandeler(res, 200, true, comunity, 'Comunity created');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}
module.exports = ComunityClass;
