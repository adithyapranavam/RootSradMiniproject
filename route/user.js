const express = require("express");
const Router = express.Router(); // Use express.Router() to create a router

//ROUTERS
const userController = require("../controllers/userControllers");

Router.get("/", userController.home);
Router.get("/home", userController.home);

//USER LOGIN
Router.get("/login", userController.login);
Router.post('/login',userController.loginPost);
Router.post('/loginOtpValidation',userController.loginOtpValidation)
Router.get('/logout',userController.signout)
Router.get('/forgotPassword',userController.forGotPassword)
Router.post('/numberValidation',userController.numberValidation);
// Router.post('/newPassword',userController.newPassword);

//Sign Up 
Router.get("/signup", userController.signup);
Router.post("/signup",userController.userRegister) 
Router.post('/signIn',userController.OTPValidationSignIn); 

// success
Router.get('/success', userController.successTick);

module.exports = Router;
