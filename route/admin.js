const express = require('express')
const admin = express.Router()

//MULTER
const multer = require('../middleware/multer');

//ADMIN SIDE ROUTERS
const adminController = require('../controllers/adminControllers');


// Admin Login
admin.get('/',adminController.adminlogin);
admin.post('/login',adminController.loginPost);
admin.get('/dashboard',adminController.dashboard);
admin.get('/signout',adminController.adminLogout);

//users routes
admin.get('/userDetails',adminController.userDetails)
admin.post('/user-blocking', adminController.userblocking)
admin.post('/user-unblocking', adminController.userunblocking)
admin.post('/user-Search',adminController.userSearch);

//category rutes
admin.get('/category',adminController.category);
admin.get('/category-create',adminController.createcategory)
admin.post('/category-create', adminController.createCategoryPost)
admin.get('/edit-category',adminController.editCategory )
admin.post('/edit-Category',adminController.categoryEditPost)
admin.post('/unlistCategory/:id',adminController.unlistCategory)
admin.post('/listCategory/:id',adminController.listCategory)

//product rutes
admin.get('/viewproducts',adminController.productView);
admin.get('/productCreate',adminController.productAdding);
admin.post('/productCreate',multer.upload.array('image'),adminController.productAddingPost)

admin.get('/product-edit/:id',adminController.productEdit)
admin.post('/product-edit',multer.upload.array('image'),adminController.productEditPost)
admin.post('/productUnlist/:id',adminController.productUnlist)
admin.post('/productList/:id',adminController.productList)
admin.post('/product-Search',adminController.productSearch ) 
admin.get('/productDelete',adminController.productDelete)

// coupon Route

admin.get('/coupon',adminController.couponsList);
admin.get('/coupons/couponsAdding',adminController.couponsAdding)
admin.post('/coupons/couponsAdding',adminController.couponCreation)
admin.get('/editCoupon',adminController. editCoupon )
admin.post('/editCoupon',adminController.postEditCoupon)
admin.get('/deleteCoupon',adminController.getCouponDelete)

//ODERS
 admin.get('/oderDetails',adminController.oderDetails)
 admin.put('/status/change', adminController.status_change);

// BANNERS
admin.get('/banner',adminController.banner)
admin.get('/bannerAdding',adminController.bannerAdding)
admin.post('/banner',multer.upload.array('image'),adminController.bannerPost)
admin.get('/removeBanner',adminController.removeBanner)

// GRAPH
admin.post("/graph/data", adminController.graph_data);
// pdf
admin.post("/pdf/downloard", adminController.pdf_downloard);
module.exports = admin;
