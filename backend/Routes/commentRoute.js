const express = require("express")
const Comment = require("../model/commentmodel")
const router = express.Router()
  
// add comments to post
const addComment = async(req, res)=>{
    const {postId}=req.params
    const {title} = req.body
    await Comment.create({
title, postId
    })
    res.send({message:"success"})

}
router.post("/addComment/:postId",addComment)


// going to find   all comments of a single post
const getComment = async(req, res)=>{
    const {postId}=req.params
    const data = await Comment.findAll({where:{postId}})
 
    res.send(data)

}
router.get("/getComment/:postId",getComment)

module.exports= router

