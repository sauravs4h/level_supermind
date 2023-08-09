const express=require("express");
const Blogr=express.Router();

const {Blogpost}=require("../models/blog.model")

Blogr.post("/addblog",async(req,res)=>{

    const { title, content } = req.body;
    const authorId = req.user.id;
    try {
      const newBlogPost = await Blogpost.create({ title, content, authorId });
  
      res.status(201).json({ msg: "new Blog created", status:"success" });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ msg: "Internal server error",status:"error" });
    }
})


Blogr.get("/allblog",async(req,res)=>{

    try {
        const blogPosts = await Blogpost.findAll();
        res.status(200).json({ msg: "All blogs", data: blogPosts,status:"success" });
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        res.status(500).json({ msg: "Internal server error", status:"error" });
      }
})


Blogr.get("/blogbyid/:id",async(req,res)=>{
    const { id } = req.params;
  try {
    const blogPost = await Blogpost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ msg: "Blog post not found",status:"error" });
    }
    res.status(200).json({ msg: `blog data of id - ${id}`, data: blogPost,status:"success" });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ msg: "Internal server error",status:"error" });
  }
});


Blogr.patch("/blogupdate/:id",async(req,res)=>{

    const { id } = req.params;
  const authorId = req.user.id;
  const { title, content } = req.body;
  try {
    const blogPost = await Blogpost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ msg: "Blog not found",status:"error" });
    }

    if (blogPost.authorId !== authorId) {
      return res
        .status(403)
        .json({ msg: "Not authorized to udpate the post", status:"error" });
    }

    await blogPost.update({ title, content });
    res.status(200).send({ msg: "Blog updated", data: blogPost,status:"success" });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ msg: "Internal server error",status:"error" });
  }

})


Blogr.delete("/blogdelete/:id",async(req,res)=>{
    const { id } = req.params;
    const authorId = req.user.id;
  try {
    const blogPost = await Blogpost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ msg: "Blog post not found",status:"error" });
    }
    if (blogPost.authorId !== authorId) {
      return res
        .status(403)
        .json({ msg: "Forbidden: You are not the author of this blog post",status:"error" });
    }
    await blogPost.destroy();
    res.status(200).json({ msg: "Blog post deleted successfully", status:"success" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ msg: "Internal server error",status:"error" });
  }
})

module.exports={Blogr}