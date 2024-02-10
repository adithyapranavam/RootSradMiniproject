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
//product view 
Router.get('/productView/:id',userController.productView);

//ADD TO CART
Router.get('/cart',userController.loadcart);
Router.post('/cart/:id',userController.AddCart)
Router.post('/cart/quantityUpdate/:itemId', userController.cartQuantityUpdate); 
Router.put('/cart/update',userController.updateCart)
Router.get('/cartDelete/:id',userController.cartDelete)

//ADD TO wishlist
Router.get('/wishlist',userController.WishListLoad) 
Router.post('/wishlist/:id',userController.addingWishList)
Router.put('/wishlist/cart',userController.addingWhishListtoCart)
Router.get('/wishlist/:id',userController.WhishProductDelete)

//CHECKOUT
Router.get('/CheckOutPage',userController.Checkout)




// success
Router.get('/success', userController.successTick);

module.exports = Router;
