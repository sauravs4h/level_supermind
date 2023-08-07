const {sequelize}=require("../config/db")
const {DataTypes}=require("sequelize");

const User= sequelize.define("users",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false
    },


},{createdAt:false,updatedAt:false})


module.exports= {User}