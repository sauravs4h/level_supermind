const express= require("express");
const commentr=express.Router();
const {Blogpost}=require("../models/blog.model")
const {comment}=require("../models/comment.model");
const {User}=require("../models/user.model")


commentr.post("/createcomment/:blogId",async(req,res)=>{
    const {blogId}=req.params;
    const { content} = req.body;
  const userId = req.user.id;
  try {
    const blogPost = await Blogpost.findByPk(blogId);
    if (!blogPost) {
      return res.status(404).json({ msg: "Blog post not found",status:"error" });
    }
    const newComment = await comment.create({
      content,
      userId,
      created_at: new Date(),
      blogpostId: blogId,
    });
    res.status(201).json({ msg: "Comment created", data: newComment,status:"success" });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ msg: "Internal server error",status:"error" });
  }
})

commentr.get("/getallcomment/:blogId",async(req,res)=>{
    const { blogId } = req.params;
  try {
    const Comments = await comment.findByPk(blogId);
    if (!Comments) {
      return res.status(404).json({ msg: "Blog post not found", status:"error" });
    }

    console.log(Comments);
    res
      .status(200)
      .send({ msg: "All comments for the blog", data: Comments ,status:"success"});
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ msg: "Internal server error" , status:"error"});
  }
})


module.exports={commentr}
