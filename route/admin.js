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



module.exports = admin;
