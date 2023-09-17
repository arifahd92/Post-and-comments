const {DataTypes }= require("sequelize")
const sequelize = require("../conection/connection")
const User=sequelize.define("user",{
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    }
})
module.exports=User