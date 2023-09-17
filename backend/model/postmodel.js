const {DataTypes}= require("sequelize")
const sequelize = require("../conection/connection")
const Post= sequelize.define("post",{
    title:{
        type:DataTypes.STRING
    }
})
module.exports=Post