const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("userpostcomment", 'root', '@Arif123',{
    dialect:"mysql",
    host:"localhost"
})
module.exports=sequelize