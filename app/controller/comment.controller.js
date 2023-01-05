const Comment = require('../../db/model/comment.model');
const Comunity=require("../../db/model/commuinty.model")
const myhelper = require('../helper');
class CommentClass {
  static createComment = async (req, res) => {
    try {
      if(!await Comunity.findById(req.params.comunityId)) throw new Error("invalid comuinty id")
      req.body.comunityId=req.params.comunityId
      req.body.username = req.user.fName+req.user.lName;
      req.body.date = new Date()
      const comment = new Comment(req.body);
      await comment.save();
      myhelper.reshandeler(res, 200, true, comment, 'comment added');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static getComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if(!await comment) throw new Error("invalid comment id")
      myhelper.reshandeler(res, 200, true, comment, ' Single comment ');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static getAllComments = async (req, res) => {
    try {
      const comments = await Comment.find();
      myhelper.reshandeler(res, 200, true, comments, 'All comments');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static editComment = async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true,});
      myhelper.reshandeler(res, 200, true, comment, 'edit comment');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static deletComment = async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) throw new Error("wrong id 'comment not found!'");
      myhelper.reshandeler(res, 200, true, null, 'delete comment');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static addReplay = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) throw new Error("wrong id 'comment not found!'");
      const username=req.user.fName+req.user.lName
      const replay=req.body.replay
      const date=new Date()
      comment.replays.push({replay,username,date})
      await comment.save()
      myhelper.reshandeler(res, 200, true, replay, 'replay adedde');
    } catch (e) {
      myhelper.reshandeler(res, 500, false, e, e.message);
    }
  };
  static like=async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        if (!comment) throw new Error("wrong id 'comment not found!'");
        //concat user name from user model
        const username=req.user.fName+req.user.lName
        const like=true
        comment.likes.push({like,username})
        await comment.save()
        myhelper.reshandeler(res, 200, true, {like,username}, 'like added');
    } catch (e) {
    myhelper.reshandeler(res, 500, false, e, e.message);
    }
  }
  static dislike=async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        if (!comment) throw new Error("wrong id 'comment not found!'");
        comment.likes.pull({username:req.user.fName+req.user.lName})
        await comment.save()
        myhelper.reshandeler(res, 200, true, null, 'dislike done');
    } catch (e) {
    myhelper.reshandeler(res, 500, false, e, e.message);
    }
  }

}
module.exports = CommentClass;
