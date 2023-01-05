const router = require('express').Router();
const commentController = require('../app/controller/comment.controller');
const { auth } = require('../app/middlewares/auth.middlewares');

router.post('/createcomment/:comunityId', auth,commentController.createComment );
router.get("/getcomment/:id",auth,commentController.getComment)
router.get("/getallcomments",auth,commentController.getAllComments)
router.patch("/editcomment/:id",auth,commentController.editComment)
router.delete("/deletcomment/:id",auth,commentController.deletComment)
router.post("/addreplay/:id",auth,commentController.addReplay)
router.get("/like/:id",auth,commentController.like)
router.get("/dislike/:id",auth,commentController.dislike)


module.exports = router;
