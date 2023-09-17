const {DataTypes}= require("sequelize")
const sequelize = require("../conection/connection")
const Comment= sequelize.define("comment", {
    title:{
        type:DataTypes.STRING
    }
})
module.exports=Comment