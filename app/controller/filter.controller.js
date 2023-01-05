const Item = require('../../db/model/item.model');
const Blog = require('../../db/model/blog.model');
const Shop = require('../../db/model/shop.model');

class Filter {
  constructor(queryObj) {
    //set this to go with me in any in class and return this 
    this.query;
    this.queryObj = queryObj;
    this.result = [];
  }

  filter() {
    //first step filter query
    //expected category
    const categories = ['plant','seed', 'shop', 'blog', 'range', 'difficulty'];
    //q :for query serch c: category s:sort py price {price or -price}
    const targetParams = ['q', 'c', 's'];
    const qObj = this.queryObj;//{ q: 'r', c: 'plant', s: '-price' }
   //fillter key 
    Object.keys(qObj).forEach(key => {
      if (!targetParams.includes(key)) delete qObj[key];
    });
   //filter categores
    for (const [key, value] of Object.entries(qObj)) {
      if (!categories.includes(value) && key == 'c') delete qObj[key];
    }
    this.queryObj = qObj;
    return this;
  }

  async querySearch() {
    //secound step serach
    // senario1: quey & empty category
    console.log(this.queryObj);
    if (this.queryObj.q && !this.queryObj.c) {
      //serch with subset of String
      this.query = await Item.find({
        name: {$regex: this.queryObj.q,$options: 'i',},
      });
      this.result.push(this.query);
      this.query = await Item.find({itemType: this.queryObj.q,});
      this.result.push(this.query);
      this.query = await Item.find({difficulty: this.queryObj.q,});
      this.result.push(this.query);
      this.query = await Blog.find({
        name: {$regex: this.queryObj.q,$options: 'i',},
      });
      this.result.push(this.query);
      this.query = await Blog.find({
        about: { $regex: this.queryObj.q,$options: 'i',},
      });
    }

    //  senario2: query & category{seed,plant}
    if (this.queryObj.q && (this.queryObj.c == 'seed' || this.queryObj.c == 'plant')) {
      this.query = await Item.find({
        name: {$regex: this.queryObj.q,$options: 'i',},
      });
      this.query = this.query.filter(d => {
        return d.itemType == this.queryObj.c;
      });
      this.result.push(this.query);
    }

    // senario3: query & category{difficulty}
    if (this.queryObj.q && this.queryObj.c == "difficulty") {
      this.query = await Item.find({
        difficulty: {$regex: this.queryObj.q,$options: 'i',},
      });
      this.result.push(this.query);
    }
     //  senario4: query & category{shop}
     if (this.queryObj.q && this.queryObj.c == "shop") {
      this.query = await Shop.find({
        name: {$regex: this.queryObj.q,$options: 'i',},
      });
      this.result.push(this.query);
    }

    //  senario5: query & category{blog}
    if (this.queryObj.q && this.queryObj.c == 'blog') {
      this.query = await Blog.find({
        name: {$regex: this.queryObj.q,$options: 'i',},
      });
      this.result.push(this.query);
      this.query = await Blog.find({
        about: { $regex: this.queryObj.q,$options: 'i',},
      });

      this.result.push(this.query);
    }
    return this;
  }

  sortDocs() {
    //third step sort by price
    if (this.queryObj.s) {
      let res = [];
      this.result.forEach(r => {
        res = res.concat(r);
      });

      this.query = res;
      // strt with - meannig sort from  highest price to lowest price
      if (this.queryObj.s.startsWith('-')) {
        this.queryObj.s = this.queryObj.s.split('-').join('');
        this.query = this.query.sort((a, b) => {
          return b[this.queryObj.s] > a[this.queryObj.s] ? 1 : -1;
        });
      } else
        this.query = this.query.sort((a, b) => {
          return b[this.queryObj.s] < a[this.queryObj.s] ? 1 : -1;
        });
      this.result = this.query;
    }
    return this;
  }
}

module.exports = Filter;
