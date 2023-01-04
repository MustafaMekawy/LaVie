const mongoose = require('mongoose');
const ItemSchema = mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ['plant', 'seed'],
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Hard'],
    default: 'Easy',
  },
  reviews: {
    type: [
      {
      userName:String,
      Rating:Number,
      review:String
    }
    ]
  }
});
const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
