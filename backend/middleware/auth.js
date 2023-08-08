var jwt = require('jsonwebtoken');


const auth=(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1];

    if(token){
        jwt.verify(token, 'hush', function(err, decoded) {
            if(err){
                res.send({msg:"something went wrong",status:"error"})
            }
            req.user=decoded.User
            next()
            
          });

    }else{
        res.send({msg:"please login first",status:"error"})
    }
}

module.exports={auth}