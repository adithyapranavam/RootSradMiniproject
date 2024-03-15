const userModel = require('../model/usermodel')
const product = require('../model/productmodel')
const userController = require("../controllers/userControllers");


const isLogin = async (req, res, next) => {
    try {
      if (req.session.userData) {
        next();
      } else {
      
       res.redirect('/user/login')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  
  const isLogout = async (req, res, next) => {
    try {
      if (req.session.userData) {
       next()
      } 
      else {
          res.redirect("/user/login")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const isblock = async (req,res,next) => {
    try{
      console.log('isblocked is actually worked');
      if(req.session.userData){
        console.log('man is worked ');
        
        const email = req.session.userData
        const check = await userModel.findOne({ email:email });
        if(check.isBlocked === false){
          next();
      }else{
         req.session.userData = null
          res.render('user/login',{user,message:"Please contact Your Admin You are no longer to access this account"})
        
      }
     
      }
     
    }catch(err){
      console.log(err.message);
    }
   
  }

  const userChecking = (req,res,next)=>{
    if(req.session.userData){
      next()
    }else{
      res.redirect('/login')
    }
  }
  
  module.exports = {
    isLogin,
    isLogout,
    isblock,
    userChecking,
  };
  