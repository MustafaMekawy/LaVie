const router = require('express').Router();
const blogController = require('../app/controller/blog.controller');
const { auth } = require('../app/middlewares/auth.middlewares');

router.post('/createblog', auth, blogController.createBlog);
router.get('/getblog/:id', auth, blogController.getBlog);
router.get('/myblogs', auth, blogController.myBlogs);
router.get('/getallblogs', auth, blogController.getAllBlogs);
router.patch('/editblog/:id', auth, blogController.editBlog);
router.delete('/deleteblog/:id', auth, blogController.deletBlog);

module.exports = router;
