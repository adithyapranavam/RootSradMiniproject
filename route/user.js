const express = require("express");
const Router = express.Router(); // Use express.Router() to create a router

//ROUTERS
const userController = require("../controllers/userControllers");
const profileController = require("../controllers/profileControllers");

Router.get("/", userController.home);
Router.get("/home", userController.home);
Router.get('/shop',userController.shop)
Router.post("/poduct/sortfind", userController.sortfind);

Router.post("/poduct/filter", userController.filterfind);

Router.post("/poduct/pagin", userController.poductpagin);


//USER LOGIN
Router.get("/login", userController.login);
Router.post('/login',userController.loginPost);
Router.post('/loginOtpValidation',userController.loginOtpValidation)
Router.get('/logout',userController.signout)

Router.get('/forgotPassword',userController.forGotPassword)
Router.post('/numberValidation',userController.numberValidation);
Router.post('/resetPassword',userController.resetPassword);
Router.post('/newPassword',userController.newPassword);

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

// wishlist PART
Router.get('/wishlist',userController.WishListLoad) 
Router.post('/wishlist/:id',userController.addingWishList)
Router.put('/wishlist/cart',userController.addingWhishListtoCart)
Router.get('/wishlist/:id',userController.WhishProductDelete)

//CHECKOUT
Router.get('/CheckOutPage',userController.Checkout)
Router.post('/AddressUpdate',userController.addressAdding)
Router.get('/address',userController.getAddress)
Router.post('/odder/successpost/Check',userController.oderAvailable)
Router.post('/oddersuccesspost',userController.odderSuccsspost)

Router.get('/profile',profileController.profile)
Router.post('/addaddresscheckout',userController.toAddAddressCheckout)
Router.get('/editAddress',userController.geteditAddress)
Router.post('/updateAddress',userController.updateaddress)
Router.get('/deleteAddress',userController.remove)

// COUPON
Router.post('/coupons/couponValidation',userController.coupons)

// order
Router.get('/order',userController.order)
Router.get('/orderView',userController.orderView)
Router.get('/oderSucess',userController.oderrSuccess)
// success
Router.get('/success', userController.successTick);

module.exports = Router;
