const { Sequelize } = require("sequelize")//imported Sequelize class that was named export

const sequelize = new Sequelize("userpostcomment", 'root', '@Arif123',{//istance of that class with constructor args
    dialect:"mysql",
    host:"localhost"
})
module.exports=sequelize// default export ,