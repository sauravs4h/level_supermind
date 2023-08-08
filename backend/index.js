const express=require("express");
var cors = require('cors');

const app=express();

const {sequelize}=require("./config/db");
const {uroute}=require("./routes/user.routes");
const {auth}=require("./middleware/auth")
const {Blogr}=require("./routes/blog.routes")

app.use(cors());
app.use(express.json());
app.use("/user",uroute);
app.use("/blogs",auth,Blogr)

app.get("/",(req,res)=>{
    res.send({mag:"base api"})
})

app.listen(8080,async()=>{

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("connected to DB")
        console.log("running on 8080")
        
    } catch (error) {
        console.log("error while db connect");
        console.log(error)
    }

})