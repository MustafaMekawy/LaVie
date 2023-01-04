const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  items: [
    {
      item: { type: mongoose.Schema.ObjectId, ref: 'Item' },
      num: { type: Number, default: 0 },
    },
  ],
  numOfItems: { type: Number, default: 0 },
});

// cartSchema.pre('save', function (next) {
// //   console.log(this.plants);
//   if (this.isModified('plants')) this.numOfItems = this.plants.length;
//   next();
// });

cartSchema.methods.itemsCounter = function (el, num) {
  if (el === 'add') this.numOfItems += num;
  if (el === 'drop' && this.numOfItems > 0) {
    this.numOfItems -= num;
    this.numOfItems = this.numOfItems < 0 ? 0 : this.numOfItems;
  }
};

const cart = mongoose.model('Cart', cartSchema);
module.exports = cart;
