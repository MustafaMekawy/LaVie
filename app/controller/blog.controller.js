const Blog = require('../../db/model/blog.model');
const myhelper = require('../helper');
class BlogClass {
  static createBlog = async (req, res) => {
    try {
      req.body.userId = req.user.id;
      const blog = new Blog(req.body);
      await blog.save();
      myhelper.reshandeler(res, 200, true, blog, 'blog created');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static getBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      myhelper.reshandeler(res, 200, true, blog, ' Single blog ');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      myhelper.reshandeler(res, 200, true, blogs, 'All blogs');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  //crud
  static editBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      myhelper.reshandeler(res, 200, true, blog, 'edit blog');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static deletBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) throw new Error("wrong id 'shop not found!'");
      myhelper.reshandeler(res, 200, true, null, 'delete Blog');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };

  static myBlogs = async (req, res) => {
    try {
      await req.user.populate('myBlogs');
      myhelper.reshandeler(res, 200, true, req.user.myBlogs, 'its your blogs');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
}
module.exports = BlogClass;
