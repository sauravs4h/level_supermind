const {Sequelize}=require("sequelize");
require('dotenv').config()

const sequelize= new Sequelize("supermind",process.env.Sql_username,process.env.Sql_password,{

    host:"database-1.cdjg2ff7cdap.eu-north-1.rds.amazonaws.com",
    dialect:"mysql"
})

module.exports={sequelize}