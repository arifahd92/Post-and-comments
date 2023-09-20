const cors= require ("cors")
const express = require("express")
const sequelize = require("./conection/connection")

const Post= require("./model/postmodel")
const User = require("./model/usermodel")
const Comment= require("./model/commentmodel")
const port = 4000
const app = express()
   

const userRouter=require("./Routes/userRoute")
const postrouter= require("./Routes/postRoute")
const commentRouter = require("./Routes/commentRoute")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

User.hasMany(Post)
Post.belongsTo(User)
Post.hasMany(Comment)
Comment.belongsTo(Post)

app.use(userRouter)
app.use(postrouter)
app.use(commentRouter)
sequelize.sync().then(()=>{

    app.listen(port, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("listening at port ", port)
    })
})
