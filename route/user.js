const express = require("express");
const Router = express.Router(); // Use express.Router() to create a router

//ROUTERS
const userController = require("../controllers/userControllers");

Router.get("/", userController.home);
Router.get("/home", userController.home);

//USER LOGIN
Router.get("/login", userController.login);
   
//Sign Up 
Router.get("/signup", userController.signup);
Router.post("/signup",userController.userRegister) 
Router.post('/signIn',userController.OTPValidationSignIn); 
Router.get('/logout',userController.logout)

// success
Router.get('/success', userController.successTick);

module.exports = Router;
