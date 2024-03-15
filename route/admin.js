const express = require('express')
const admin = express.Router()

//MULTER
const multer = require('../middleware/multer');

// MIDDLEWARE
const adminauth = require('../middleware/adminauth');

//ADMIN SIDE ROUTERS
const adminController = require('../controllers/adminControllers');


// Admin Login
admin.get('/',adminController.adminlogin);
admin.post('/login',adminController.loginPost);
admin.get('/dashboard',adminauth.isAdmin,adminController.dashboard);
admin.get('/signout',adminController.adminLogout);

//users routes
admin.get('/userDetails',adminauth.isAdmin,adminController.userDetails)
admin.post('/user-blocking', adminauth.isAdmin,adminController.userblocking)
admin.post('/user-unblocking', adminauth.isAdmin,adminController.userunblocking)
admin.post('/user-Search',adminauth.isAdmin,adminController.userSearch);

//category rutes
admin.get('/category',adminauth.isAdmin,adminController.category);
admin.get('/category-create',adminauth.isAdmin,adminController.createcategory)
admin.post('/category-create',adminauth.isAdmin, adminController.createCategoryPost)
admin.get('/edit-category',adminauth.isAdmin,adminController.editCategory )
admin.post('/edit-Category',adminauth.isAdmin,adminController.categoryEditPost)
admin.post('/unlistCategory/:id',adminauth.isAdmin,adminController.unlistCategory)
admin.post('/listCategory/:id',adminauth.isAdmin,adminController.listCategory)

//product rutes
admin.get('/viewproducts',adminauth.isAdmin,adminController.productView);
admin.get('/productCreate',adminauth.isAdmin,adminController.productAdding);
admin.post('/productCreate',adminauth.isAdmin,multer.upload.array('image'),adminController.productAddingPost)

admin.get('/product-edit/:id',adminauth.isAdmin,adminController.productEdit)
admin.post('/product-edit',adminauth.isAdmin,multer.upload.array('image'),adminController.productEditPost)
admin.post('/productUnlist/:id',adminauth.isAdmin,adminController.productUnlist)
admin.post('/productList/:id',adminauth.isAdmin,adminController.productList)
admin.post('/product-Search',adminauth.isAdmin,adminController.productSearch ) 
admin.get('/productDelete',adminauth.isAdmin,adminController.productDelete)

// coupon Route

admin.get('/coupon',adminauth.isAdmin,adminController.couponsList);
admin.get('/coupons/couponsAdding',adminauth.isAdmin,adminController.couponsAdding)
admin.post('/coupons/couponsAdding',adminauth.isAdmin,adminController.couponCreation)
admin.get('/editCoupon',adminauth.isAdmin,adminController. editCoupon )
admin.post('/editCoupon',adminauth.isAdmin,adminController.postEditCoupon)
admin.get('/deleteCoupon',adminauth.isAdmin,adminController.getCouponDelete)

//ODERS
 admin.get('/oderDetails',adminauth.isAdmin,adminController.oderDetails)
 admin.put('/status/change', adminauth.isAdmin,adminController.status_change);

// BANNERS
admin.get('/banner',adminauth.isAdmin,adminController.banner)
admin.get('/bannerAdding',adminauth.isAdmin,adminController.bannerAdding)
admin.post('/banner',adminauth.isAdmin,multer.upload.array('image'),adminController.bannerPost)
admin.get('/removeBanner',adminauth.isAdmin,adminController.removeBanner)

// GRAPH
admin.post("/graph/data",adminauth.isAdmin, adminController.graph_data);
// pdf
admin.post("/pdf/downloard", adminauth.isAdmin,adminController.pdf_downloard);
module.exports = admin;
