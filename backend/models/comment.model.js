const {DataTypes}=require("sequelize");
const {sequelize}=require("../config/db")
const {User}=require("./user.model");
const {Blogpost}=require("./blog.model");

const comment=sequelize.define("comment",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},{updatedAt:false});



comment.belongsTo(User,{foreignKey:"userId",allowNull:false});
comment.belongsTo(Blogpost,{foreignKey:"blogpostId",allowNull:false});


module.exports={comment}