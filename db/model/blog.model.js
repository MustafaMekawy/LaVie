const mongoose = require('mongoose');
const BlogSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  about: {
    type: String,
    required: true,
    enum: ['plant', 'seed'],
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
});
const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
