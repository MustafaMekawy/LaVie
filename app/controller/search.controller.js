const myhelper = require('../helper');
const filterController = require('./filter.controller');
/*
=> empty query & empty categoey => home
=> quey & empty category
=> empty query & category
=> quey & category
*/
exports.search = async (req, res) => {
  try {
    const query = (await new filterController(req.query).filter().querySearch()).sortDocs();
    let result = [];
    query.result.forEach(r => {
      result = result.concat(r);
    });

    myhelper.reshandeler(res, 200, true, result);
  } catch (e) {
    myhelper.reshandeler(res, 500, false, e, e.message);
  }
};

