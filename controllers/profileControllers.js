const userModel = require('../model/usermodel')
const product = require('../model/productmodel')
const couponModle = require('../model/coupon');
const bcrypt = require('bcrypt');
const fast2sms = require('fast-two-sms');  
const OTP = require('../model/otpmodel');  
const { isValidObjectId } = require('mongoose');
const { name } = require('ejs');
    
  
const API = "LpKOkcUND4ClatShjgRIH2FVPG1wbn7sx9BfZeE03QrozXA6WdbwJ2VIs6laoPdzDC14KrOtWTuRA0vm"
// const API = '5up7TU2xUT3b03fmU8g3RwLblLzzewFJCFLvXl9HUseNiiSp93nZ1MiE2aFM'

// PASSWORD BCRYPT
const SecurePassword = async(password)=>
{
    try{
        const passwordSec = await bcrypt.hash(password,10);
        return passwordSec;
    }
    catch(err)
    {
        console.log("error in bcrpt",err)
    }
}
const profile = async(req,res)=>
{
    try{
        const userEmail = req.session.userData;
        const FoundUser = req.session.userData;
        if(req.session.userData)
        {
            const userData = await userModel.findOne({ email: userEmail });
            let cart = userData.cart.items;
            let cartCount = cart.length;
            const wishlist = userData.wishlist.length
            const name = userData.name;
            const user = true
            const userDatas = await userModel.findOne({ email: FoundUser });
            res.render('user/profile', { user,userDatas,userData, cartCount ,name,wishlist});
            }else{
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    module.exports = {

        profile
       
       

    }      