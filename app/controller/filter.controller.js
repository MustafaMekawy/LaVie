const Item = require('../../db/model/item.model');
const Blog = require('../../db/model/blog.model');

class Filter {
  constructor(queryObj) {
    this.query;
    this.queryObj = queryObj;
    this.result = [];
  }

  filter() {
    // console.log(this.queryObj);
    const categories = ['plant', 'tool', 'seed', 'shop', 'blog', 'range', 'difficulty'];

    const targetParams = ['q', 'c', 's'];
    console.log(this.queryObj);

    const qObj = this.queryObj;

    Object.keys(qObj).forEach(key => {
      if (!targetParams.includes(key)) delete qObj[key];
    });

    for (const [key, value] of Object.entries(qObj)) {
      if (!categories.includes(value) && key == 'c') delete qObj[key];
    }

    this.queryObj = qObj;
    console.log(this.queryObj);
    return this;
  }

  async querySearch() {
    if (this.queryObj.q && !this.queryObj.c) {
      this.query = await Item.find({
        name: {
          $regex: this.queryObj.q,
          $options: 'i',
        },
      });
      this.result.push(this.query);
      this.query = await Item.find({
        itemType: this.queryObj.q,
      });
      this.result.push(this.query);
      this.query = await Item.find({
        difficulty: this.queryObj.q,
      });
      this.result.push(this.query);
      //   console.log(await Item.find({ name: this.queryObj.q }));
    }

    if (this.queryObj.q && (this.queryObj.c == 'seed' || this.queryObj.c == 'plant')) {
      this.query = await Item.find({
        name: {
          $regex: this.queryObj.q,
          $options: 'i',
        },
      });

      this.query = this.query.filter(d => {
        // console.log(d.itemType);
        return d.itemType == this.queryObj.c;
      });
      //   console.log(this.query);
      this.result.push(this.query);
      //   console.log(await Item.find({ name: this.queryObj.q }));
    }

    if (this.queryObj.q && this.queryObj.c == 'blog') {
      this.query = await Blog.find({
        name: {
          $regex: this.queryObj.q,
          $options: 'i',
        },
      });

      this.result.push(this.query);
      this.query = await Blog.find({
        about: {
          $regex: this.queryObj.q,
          $options: 'i',
        },
      });

      this.result.push(this.query);
    }

    return this;
  }

  sortDocs() {
    if (this.queryObj.s) {
      let res = [];

      this.result.forEach(r => {
        res = res.concat(r);
      });

      this.query = res;

      if (this.queryObj.s.startsWith('-')) {
        // console.log(this.queryObj.s.startsWith('-'));
        this.queryObj.s = this.queryObj.s.split('-').join('');
        // console.log(this.queryObj.s);
        this.query = this.query.sort((a, b) => {
          // console.log(a.this.queryObj.s);
          return b[this.queryObj.s] > a[this.queryObj.s] ? 1 : -1;
        });
      } else
        this.query = this.query.sort((a, b) => {
          // console.log(a.this.queryObj.s);
          return b[this.queryObj.s] < a[this.queryObj.s] ? 1 : -1;
        });
      this.result = this.query;
    }
    return this;
  }
}

module.exports = Filter;
