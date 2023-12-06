
const session = require("express-session");
const userModel = require('../model/usermodel');
const categoryCollection = require("../model/categorymodel");
const productCollection = require('../model/productmodel');
const fs = require('fs')

//ADMIN LOGIN

     const adminlogin=(req,res)=>
 
     {
        try{
            if(req.session.admin)
            {
                res.redirect('admin/dashboard')
            }
            else{
             
                res.render('admin/adminLogin')
            }
        }
        catch(error)
        {
            console.log(error)
            {
                console.log(error.message);
            }
        }
     }

     const loginPost = async(req,res)=>
     {
       try {
         
         const {email ,password}=req.body;

         const user=await userModel.findOne({email:email,isAdmin:true})
        
         if(user&& user.password==password)
         {
            res.redirect('/admin/dashboard')
         }
         else
         {
           
            res.redirect('/admin')
         }

       } catch (error) {
         console.log(error.message);
       }
     }

     //Admin Dashboard

     const dashboard = async(req,res)=>
     {
        try{
           
                res.render('admin/dashboard')
           
        }
        catch(error)
        {
            console.log(error.message);
        }

     }


    //USERS BLOCK

const userDetails = async(req,res)=>
{
    try{
            const users = await userModel.find()
            res.render('admin/userDetails',{admin: req.session.admin,user:users})
       
    }
       catch(error)
       {
        console.log(error.message);
       }

}

     const userblocking = async(req,res)=>
     {
        try{
            const userId = req.query.id
            await userModel.updateOne({_id:userId},
                {
                   $set:
                   {
                       isBlocked:true
                   } 
                })
                res.redirect('/admin/userDetails')
            
        }
        catch(err)
        {
            console.log(err)
            res.status(500).send("Internal error")
        }
     }

     const userunblocking = async(req,res)=>
     {
        try{
            const userId = req.query.id
            await userModel.updateOne({_id:userId},
                {
                    $set:{
                        isBlocked:false
                    }
                })
                res.redirect('/admin/userDetails')
        }
        catch(err)
        {
            console.log(err)
        }
     }

     //category block

     const category = async(req,res)=>
     {
        try{
                const data = await categoryCollection.find()
                res.render('admin/category',{data})
            
        }
        catch(error)
        {
            console.log(error.message)
        }

     }

     const createcategory = async(req,res)=>
     {
        try{
            res.render('admin/category-create');
        }
        catch(error)
        {
            console.log("error");
        }
     }
     const createCategoryPost = async (req, res) => {
        try {
            
            console.log(req.body.categoryName);
            const category = await categoryCollection.findOne({categoryName:req.body.categoryName})
            console.log('this is categeory',category);
            if(category){
             
                res.render('admin/category-create',{msg:'Category is already exist'})
            }else{
                const data = {
                    categoryName: req.body.categoryName,
                    categoryDescription: req.body.discription,
                    isavilable: req.body.isAvailable
                }
                await categoryCollection.insertMany([data])
                res.render('admin/category-create', { msg: 'category added sucessfully' })
            }
           
    
        } catch (err) {
            console.log(err.message);
        }
    }

    const editCategory = async(req,res)=>
    {
        try{
            const id = req.query.id
            const list = await categoryCollection.findOne({_id:id})
            res.render('admin/category-edit',{list})
        }
        catch(err)
        {
            console.log(err.message);
        }
    }

     const categoryEditPost = async(req,res)=>
     {
        try{
            await categoryCollection.findByIdAndUpdate({_id:req.body.id},
                {
                    $set:
                    {
                        categoryName:req.body.categoryName,
                        categoryDescription:req.body.description,
                        isavailable: req.body.isavailable,
                    }
                })
                res.redirect('/admin/category')
        }
        catch(error)
        {
            console.log(error);
        }
     }

     const unlistCategory = async (req, res) => {
        try {
         
            const categoryId = req.params.id;
            const cata = await categoryCollection.findByIdAndUpdate({ _id: categoryId },
                {
                    $set: { isavilable: false }  // Corrected field name
                }
            );
    
            console.log(cata);
            res.redirect('/admin/category');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    
    const listCategory = async (req, res) => {
        try {
            const categoryId = req.params.id
            await categoryCollection.findByIdAndUpdate({ _id: categoryId },
                {
                    $set: { isavilable: true }
                })
            res.redirect('/admin/category')
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    
    }

    //Product Block
    const productView = async(req,res)=>
    {
        try{
              const product = await productCollection.find();
              res.render('admin/viewproducts',{product})
        }
        catch(error)
        {
            console.log(error)
            res.status(500).send("interval error")
        }
    }
    const productAdding = async (req, res) => {
        try {
            const cateData = await categoryCollection.find({ isavilable: true });
            console.log(cateData);
            res.render('admin/productCreate', { title: "Product",cateData })
        } catch (error) {
            console.log(error);
            res.status(500).send("internal error")
        }
    }  

    const productAddingPost = async(req,res,next)=>
    {  
        try{
               const files = req.files
               const orginalprice = parseInt(req.body.orginalprice);
            //    console.log(req.body.orginalprice);
               const productOffer = parseInt(req.body.offers);
               const updatingPrice = orginalprice-((orginalprice*productOffer)/100);
                // console.log(updatingPrice)
               const product = {
                name: req.body.name,
                price: updatingPrice,
                orginalprice:req.body.orginalprice,
                productOffer:req.body.offers,
                quantity:req.body.quantity,
                discription: req.body.discription.trim(),
                category:req.body.category.trim(), 
                image:files.map(file => file.filename)
            }
            await productCollection.insertMany([product])
            res.redirect('/admin/viewproducts')
        } 
        catch (error)  
        {
            console.log(error.message);
        }
             
    }
    const productEdit = async(req,res)=>
    {
        try{
            const id = req.params.id
            const productData = await productCollection.findOne({_id:id})
            res.render('admin/product-edit',{productData})
        }
        catch{
            console.log(error.message);
            res.status(500).send("Internal error")
        }
    }
    
    const productEditPost = async(req,res)=>
    {
        try{
            const id = req.body.id;

                // Retrieve existing product data
            const existingProduct = await productCollection.findById(id);
            // Check if the product with the specified ID exists
            if(!existingProduct)
            {
                return res.status(404).send("product not found");
            }
            const existingImages = existingProduct.image;
 
        //adding the discount
            const orginalprice = parseInt(req.body.price);
            const productOffer = parseInt(req.body.Offer);
            const updatingPrice = orginalprice-((orginalprice*productOffer)/100);

               // Get the list of images to delete based on checkbox values
            const imagesToDelete = req.body.imagesToDelete || [];

                  // Delete images that are not selected (checkbox not ticked)
            const imagesToKeep = existingImages.filter((image) => !imagesToDelete.includes(image));
            existingImages.forEach((filename) => {
                if (!imagesToKeep.includes(filename)) {
                    fs.unlink(`productImages/${filename}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
             
        const updatedData = {
            name: req.body.name,
            price: updatingPrice,
            orginalprice:req.body.price,
            productOffer: req.body.Offer,
            discription: req.body.discription,
            category: req.body.category,
            quantity: req.body.quantity,
            image: imagesToKeep, // Set the updated image list
        };

        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => file.filename);
            updatedData.image = updatedData.image.concat(newImages); // Add new images
        }

        await productCollection.findByIdAndUpdate(id, updatedData);
        res.redirect('/admin/viewproducts');
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send("Internal error");
    }
        
}
    

module.exports = 
{
    adminlogin,
    dashboard,
    loginPost,
    userDetails,
    userblocking,
    userunblocking,
    category,
    createcategory,
    createCategoryPost,
    editCategory,
    categoryEditPost,
    unlistCategory,
    listCategory,
    productView,
    productAdding,
    productAddingPost,
    productEdit,
    productEditPost
} 