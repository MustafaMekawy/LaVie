const Cart = require('../../db/model/cart.model');
const Item = require('../../db/model/item.model');
const User = require('../../db/model/user.model');
const myhelper = require('../helper');
const filterController = require('./filter.controller');

/* 
search gwa item
array
search blogs
array
*/
exports.search = async (req, res) => {
  try {
    const query = (await new filterController(req.query).filter().querySearch()).sortDocs();
    // console.log(query);

    let result = [];
    query.result.forEach(r => {
      result = result.concat(r);
    });

    // console.log(result);

    myhelper.reshandeler(res, 200, true, result);
  } catch (e) {
    myhelper.reshandeler(res, 500, false, e, e.message);
  }
};

// static handleQyery = query => {

//   static querySearch = (query) => {
//     const result =
//   }

//   static search = async (req, res) => {
//     try {
//       const filterdQuery = this.filterdQuery(req.query);

//       myhelper.reshandeler(res, 200, true, plant, 'edit plant');
//     } catch (e) {
//       myhelper.reshandeler(res, 500, false, e, e.message);
//     }
//   };

/*
=> empty query & empty categoey => home
=> quey & empty category
=> empty query & category
=> quey & category
*/
