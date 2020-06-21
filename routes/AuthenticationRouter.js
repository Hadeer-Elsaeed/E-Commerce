var express = require('express');
var authRouter = express.Router();
const bcrypt = require('bcrypt');


require("./../Models/userModel");
let mongoose =require("mongoose");
let userModel =mongoose.model("User");

authRouter.get("/login",(request,response)=>{
  response.send("get login");
});

authRouter.post("/login",async (request,response)=>{

  try {
        let user = await userModel.findOne({email:request.body.email})
        if (!user){
            console.log("There is no account with this email");
        }
        const isMatch = await bcrypt.compare(request.body.password,user.password);
        if(isMatch)
        {

            response.json("/profile");
            console.log("you are login ...")
        }
        else{
            response.redirect("/login");
            console.log("Invalid Password")

        }
  
 } catch (err){
      console.error(err.message);
  }
});

authRouter.get("/register",(request,response)=>{
  response.send("get register");
  
});

authRouter.post("/register",(request,response)=>{
  bcrypt.hash(request.body.password, 10, (err, encrypted) => {
    request.body.password = encrypted;

    var user = new userModel({
        username:request.body.username,
        password:request.body.password,
        email:request.body.email,
        gender:request.body.gender,
        photo:request.body.photo
    }).save()
    .then((data)=>{
        console.log("success registration");

    })
    .catch((error)=>{
        console.log("error in registration")
        console.log(error+"");
    })
  });
});


      
authRouter.get("/logout",(request,response)=>{
  response.send("in /logout");
  console.log("logout");
});
module.exports= authRouter;

