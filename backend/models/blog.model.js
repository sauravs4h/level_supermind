const {sequelize}=require("../config/db");
const {DataTypes} = require("sequelize");
const {User}=require("./user.model");



const Blogpost= sequelize.define("Blogpost",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    
});

Blogpost.belongsTo(User, { foreignKey: "authorId", allowNull: false });
User.hasMany(Blogpost, { foreignKey: "userId" });

module.exports={Blogpost}
