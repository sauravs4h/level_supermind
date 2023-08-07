const express=require("express");

const app=express();


const {sequelize}=require("./config/db")

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