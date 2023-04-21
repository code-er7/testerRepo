
// require('dotenv').config();

// const express = require("express");
// const ejs = require("ejs");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// // const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const app = express();



// app.use(express.static("public"));
// app.set('view engine','ejs');
// app.use(bodyParser.urlencoded({
//     extended:true
// }));
// mongoose.connect("mongodb://localhost:27017/userDB");
// const UserSchema = new mongoose.Schema({
//     email:String,
//     password:String
// });

// //added encryption in out website
// //grabing the secret from the enviorment variable 
// // const secret = process.env.SECRET;
// // UserSchema.plugin(encrypt , {secret:secret , encryptedFields:["password"]});


// const User = new mongoose.model("user" , UserSchema);
// app.get("/" , function(req , res){
//     res.render("home");
// });
// app.get("/login" , function(req , res){
//     res.render("login");
// });
// app.get("/register" , function(req , res){
//     res.render("register");
// });

// app.post("/register" , function(req , res){
//     var Uname = req.body.username;
//     //hashing it threw md5
//     var pass = md5(req.body.password);
//     const newUser = new User({
//       email:Uname,
//       password:pass
//     })
//     newUserSaver();
//     async function newUserSaver(){
//         try{
//             await newUser.save();
//             console.log("added new user");
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
//     res.render('secrets');
// });
// app.post('/login' , function(req ,res){
//     const Uname = req.body.username;
//     const password = md5(req.body.password);
//     datafinder();
//     // console.log(Uname);
//     async function datafinder(){
//         try{
//            const foundUser = await User.findOne({email:Uname});
//            if(foundUser.password==password){
//             res.render("secrets");
//            }
//            else{
//             console.log("access Denied !");
//            }
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
    
// });
// app.listen(3000 , function(){
//   console.log("App is listening on port 3000");
// });