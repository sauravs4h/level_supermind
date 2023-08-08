const express=require("express");
const Blogr=express.Router();

const {Blogpost}=require("../models/blog.model")

Blogr.post("/addblog",async(req,res)=>{

    const { title, content } = req.body;
    const authorId = req.user.id;
    try {
      const newBlogPost = await Blogpost.create({ title, content, authorId });
  
      res.status(201).json({ msg: "new Blog created", data: newBlogPost });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
})


Blogr.get("/allblog",async(req,res)=>{

    try {
        const blogPosts = await Blogpost.findAll();
        res.status(200).json({ msg: "All blogs", data: blogPosts });
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        res.status(500).json({ error: "Internal server error" });
      }
})


Blogr.get("/blogbyid",async(req,res)=>{
    const { id } = req.params;
  try {
    const blogPost = await Blogpost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json({ msg: `blog data of id - ${id}`, data: blogPost });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


Blogr.patch("/blogupdate",async(req,res)=>{

    const { id } = req.params;
  const authorId = req.user.id;
  const { title, content } = req.body;
  try {
    const blogPost = await Blogpost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blogPost.authorId !== authorId) {
      return res
        .status(403)
        .json({ error: "Not authorized to udpate the post" });
    }

    await blogPost.update({ title, content });
    res.status(200).send({ msg: "Blog updated", data: blogPost });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }

})


Blogr.delete("/blogdelete",async(req,res)=>{
    const { id } = req.params;
    const authorId = req.user.id;
  try {
    const blogPost = await Blogpost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    if (blogPost.authorId !== authorId) {
      return res
        .status(403)
        .json({ error: "Forbidden: You are not the author of this blog post" });
    }
    await blogPost.destroy();
    res.status(204).json({ msg: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

module.exports={Blogr}