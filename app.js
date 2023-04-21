
// see /beforePassportApp.js for the prev authenticaion and post request ( before the passport)
require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();



app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
    secret:"our little secrate.",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB");
const UserSchema = new mongoose.Schema({
    email:String,
    password:String
});
UserSchema.plugin(passportLocalMongoose);

//added encryption in out website
//grabing the secret from the enviorment variable 
// const secret = process.env.SECRET;
// UserSchema.plugin(encrypt , {secret:secret , encryptedFields:["password"]});


const User = new mongoose.model("user" , UserSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrete"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
app.get("/" , function(req , res){
    res.render("home");
});
app.get("/login" , function(req , res){
    res.render("login");
});
app.get("/register" , function(req , res){
    res.render("register");
});
app.get("/secrets" , function(req , res){
    if(req.isAuthenticated()){
        res.render("secrets");
    }
    else{
        res.redirect("/login");
    }
})
app.post("/register" , function(req , res){
  
    User.register({username :req.body.username} , req.body.password , function(err , user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
               passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    })
});
app.post('/login' , function(req ,res){
 const user = new User({
    username:req.body.username,
    password:req.body.password
 });
 req.login(user , function(err){
    if(err)console.log(err);
    else{
           passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
        });
    }
 });
    
});
app.listen(3000 , function(){
  console.log("App is listening on port 3000");
});