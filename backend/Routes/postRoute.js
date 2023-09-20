const express = require("express")
const Post = require("../model/postmodel")
const User = require("../model/usermodel")

const router = express. Router()
//************************************* */
// add post
const addPost=async(req, res)=>{
    try {
        const {title}= req.body
     console.log(title)
     const {userId}= req.params
    
       await Post.create({title,userId})
       const data = await Post.findAll()
      // console.log({data})
       res.send(data)
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"error"})
    }
}
// route
router.post("/addPost/:userId",addPost)

//******************** */
 
const getAllPost=async(req, res)=>{
    try {
        const userId= req.params.userId
        console.log({userId})
    
        const data =await Post.findAll()
        res.send(data)
    } catch (error) {
      res.status(400).json({message:"error"})  
    }
}
router.get("/getAllPost/:userId",getAllPost )
//***************************************** */

const getUsersPosts=async(req, res)=>{
    try {
        const userId= req.params.userId
        console.log({userId})
    
        const data =await Post.findAll({where: {userId:userId}})
        res.send(data)
    } catch (error) {
      res.status(400).json({message:"error"})  
    }
}
router.get("/getUsersPosts/:userId",getUsersPosts )




module.exports=router