const express = require ("express")
const User= require("../model/usermodel")
const Post = require("../model/postmodel")
const Comment = require("../model/commentmodel")

const router= express.Router()

router.post("/addUser",async(req, res, next)=>{
const {name , email}= req.body
console.log({name, email})
await User.create({name, email})
const data = await User.findAll({where:{email}})
console.log(data)
res.send(data)

})
const getAllUser= async (req, res, next)=>{
try{
   const data= await User.findAll()
   res.send(data)
}catch(err){
    console.log(err.message)
    res.status(400).json({error:"could not find"})

}
}
router.get("/getAllUser", getAllUser)

// find a specific user by id
const userById= async (req, res)=>{
    try {
        
        const {userId}= req.params
        const user= await User.findByPk(userId)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}
router.get("/userById/:userId",userById)
//********************imp */
//***************find a user with its all post*************
const userWithAllPosts=async(req, res)=>{
    try {
        
        const {userId}= req.params
      /* const data =await  User.findByPk(userId,{
           include:Post// included  posts (associated with the particular user)
           
        })
        */
       // m2 
       const data = await User.findByPk(userId,{
        include:{
            model:Post
        }
       })
        res.send(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"cant find user with its all post"})
    }
}

router.get("/userWithAllPosts/:userId",userWithAllPosts )

//user With All his Posts and all comments
const userWithAllPostsAndComments=async(req, res)=>{
    try {
        const {userId}= req.params
       const data = await User.findByPk(userId,{
        
            include:{

                model:Post,//now in posts im including there conmments
                include:Comment// posts comments ( this inclde will apply on post for comment )
                
            }
        
            /* m2
                include:{//this include for user to posts(one to many)

                model:Post,
                include:{// in model post im including comment as we know there is relation of one to many in post to comment
                    model:Comment
                }
            }
            */
            
        })
            res.send(data)
        
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message:"error"})  
    }
}
router.get("/userWithAllPostsAndComments/:userId",userWithAllPostsAndComments)
/* 
User.findByPk(userId, ...) is a Sequelize method used to find a user by their primary key (userId in this case). It searches for a user in the database based on the provided userId.

The include option is used to specify that you want to include related data when retrieving the user. In this case, you are specifying an array of objects to include, and each object represents a related model.

model: Post indicates that you want to include the Post model associated with the user. This means that along with the user data, the query will also fetch the user's posts.

include: Comment is nested inside the Post object, indicating that for each post, you also want to include the associated comments. So, for each post, the query will retrieve the post data along with its comments.
 const data = await User.findByPk(userId,{
        
            include:[{

                model:Post,//now in posts im including there conmments
                include:Comment// posts comments ( this inclde will apply on post for comment )
                
            },
            // when model and user are associted , but in my case they are not related directly
            {
                model:Comment// this will directly try to fetch comment associted with user
            }
        ]
*/
/*
include key hai aur iski value 3 tarah k ho sakte hai 
1 direct model name 
2 object (model as key and model name as value, 
3 array of object 
include ki value ko object generally tab banate hai hai jab uske andar waale model ke
 associated model se v data find karna ho 
aur array of obj tab banatee hai jab pahle waale se multiple model associated ho 
ex user se post auer user se hi commets
*/
module.exports=router

