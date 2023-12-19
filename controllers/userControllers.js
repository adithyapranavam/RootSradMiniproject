const userModel = require('../model/usermodel')
const product = require('../model/productmodel')
const bcrypt = require('bcrypt');
const fast2sms = require('fast-two-sms');  
const OTP = require('../model/otpmodel');  
const { isValidObjectId } = require('mongoose');
    
  
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

//HOME PAGE
const home = async(req,res)=>
{
    try{
        const products = await product.find({availability:true}).limit(4)
        if(req.session.userData){
            const userData = await userModel.findOne({email:req.session.userData})
            const name = userData.name
            const user = true
            res.render('user/home',{user,products,name})
        }else{
            const name = ''
            const user = false
            res.render('user/home',{user,products,name})
        }

    }
    catch(error)
    {
           console.log(error);
    }
}
//LOG IN
const login = async(req,res)=>
{
    try{
        if(req.session.user){
          res.redirect('/home')
        }else{
            res.render('user/login',{title:'Login'})

        }
    }
    catch(error)
    {
        console.log("error in log in ",error);
    }
}
  
 const loginPost = async(req,res)=>
 {
     try{
            const {email,password}=req.body;
            if(!email||!password)
            {
                res.render("user/login",{message:"Require all the feilds"})
            }
            const isExistingUser =  await userModel.findOne({ email: email ,isAdmin:false });

            console.log(isExistingUser)
            
            if(!isExistingUser)
            {
                return res.render("user/login",{message:"This user not found"})
            }
            if(isExistingUser.password === password)
            {
                const signinPage = 0;
                req.session.data = isExistingUser.email
                const number = isExistingUser.number;
                let randome = Math.floor(Math.random() * 9000) + 1000;
                fast2sms.sendMessage({
                    authorization: API,
                    message: `Your verification OTP is: ${randome}`,
                    numbers: [number],
                })
                    .then(saveUser());
                //save randome Number to database then render verify page
                console.log("this is otp",randome);
                function saveUser() {
                    const newUser = new OTP({
                        number: randome
                    })
                    newUser.save()
                        .then(() => {
                            res.render('user/verification', {  signinPage });
                        })
                        .catch((error) => {
                            console.log("error generating numb", error);
                        });
                }
            }
        }
        catch(err)
        {
            console.log("error in sign up",err);
        }
 }
 const loginOtpValidation = async (req, res) => {
    // let cartCount; 
    try {
        // console.log(cartCount);
        const num1 = req.body.num_1;
        const num2 = req.body.num_2;
        const num3 = req.body.num_3;
        const num4 = req.body.num_4;
        const code = parseInt(num1 + num2 + num3 + num4);
        const email = req.session.data
        await OTP.find({ number: code })
            .then((fount) => {
                if (fount.length > 0) {
                    const succ = "Successfully LoggedIn"
                    req.session.userData = email
                    res.redirect('/home')

                    // IF FOUND, DELETE THE OTP CODE FROM DB

                    OTP.findOneAndDelete({ number: code })
                        .then(() => {
                            console.log("successfully deleted")
                        })
                        .catch((err) => {
                            console.log("error while deleting", err);
                        });
                } else {
                    res.render('user/verification', { fal: "Please Check Your OTP" })
                }
            })
            .catch((err) => {
                console.log(err)
                res.render('user/verification', { fal: "Please Check Your OTP" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send("LogIn Otp error")
    }
}
const forGotPassword = async(req,res)=>
{
    try
    {
              res.render("user/forgotPassword")
    }
    catch(err)
    {
        console.log(err)
    }
}
const numberValidation = async(req,res)=>
{
    try
    {
        const number = req.body.number;
        req.session.userNumber = number;
        const signinPage = 2;
        const userExist = await user.findOne({number:number});
        if(userExist)
        {
            const randome = Math.floor(Math.random() * 9000) + 1000;
            fast2sms.sendMessage({
                authorization: API,
                message: `Your verification OTP is: ${randome}`,
                numbers: [number],
            })
                .then(saveUser());
            //save randome Number to database then render verify page
            function saveUser() {
                const newUser = new OTP({
                    number: randome
                })
                newUser.save()
                    .then(() => {
                        res.render('user/verification', { signinPage });
                    })
                    .catch((error) => {
                        console.log("error generating numb", error);
                    });
            }
        } else {
            const msg = "Please Enter The Currect Number";
            res.render("user/forgotPassword", { msg })
        }
    }
    
    catch(err)
    {
        const msg = "Server Error Wait for the Admin Response";
        console.log("error At the number validation inreset place" + err);
        res.status(500).render("user/forgotPassword", {  msg })
    }
}
// const newPassword = async (req, res) => {
//     try {
//         const psw = req.body.password;
//         const userNumber = req.session.userNumber;
//         // const newPassword = await pwdEncription(psw);
//         await user.findOneAndUpdate({ number: userNumber }, {
//             $set: {
//                 password: newPassword
//             }
//         });
//         req.session.userNumber = null;
//         const succ = "Successfully Changed Your Password"
//         res.redirect('/home')
//     } 
//     catch (error) 
//     {
//         console.log(error);
//     }
// }

const productView = async(req,res)=>

{
    try{
        const id = req.params.id;
 
        if(req.session.userData)
        {
        const userData = await userModel.findOne({email:req.session.userData})
        const name = userData.name;
        const data = await product.findOne({_id:id});
        const cate = data.category;
        const category = await product.find({ category: cate }).sort({ _id: -1 }).limit(4);
        const user = true;

        res.render('user/productView',{data,name,user,category})  
    }
    else{
        const name = ''
        const user = false
        const data = await product.findOne({_id:id});
        const cate = data.category;
        const category = await product.find({ category: cate }).sort({ _id: -1 }).limit(4);

        res.render('user/productView',{data,name,user,category})  
    }
}
    catch (error) {
        console.log("detaild page error" + error)
      
    }
}

const signout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.send('Error')
            } else {
                res.redirect('/')
            }
        })

    }
     catch (error) {
        console.log(err);
        const message = error.message
        res.status(500).render('404-error', {  error:500, message:'Internal Server Error' });
    }
} 


//SIGN UP
const signup = async(req,res)=>
{    
    try{
        if(req.session.userData){
            res.redirect('/home')
        }else{
            res.render('user/signup')
        }
    }
    catch(error)
    {
        console.log("error in sign up",error);
        
    }
}

//NEW USER REG
const userRegister = async(req,res)=>
{
    try{
        console.log('hi this is signup post');
        const existUser = await userModel.findOne({email:req.body.email})
        if(!existUser)
        {
            const {name,phone,email,password,confpassword }=req.body;
            req.body.isBlocked = false;
            const isBlocked = req.body.isBlocked
            console.log("this is my phone number",phone);

            const spassword = await SecurePassword(password);
           req.session.data = new userModel(
                { 
                    name:name,
                    number:phone,
                    email:email,
                    password:password,
                    confpassword:confpassword,
                    isBlocked:isBlocked,
                    isAdmin:false
                })
                const signinPage = 1;
                let randome = Math.floor(Math.random() * 9000) + 1000;
                fast2sms.sendMessage({
                    authorization: API,
                    message: `Your verification OTP is: ${randome}`,
                    numbers: [phone],
                })
                    .then(saveUser());
                //save randome Number to database then render verify page
                console.log("this is otp",randome);
                function saveUser() {
                    const newUser = new OTP({
                        number: randome
                    })
                    newUser.save()
                        .then(() => {
                            res.render('user/verification', {  signinPage });
                        })
                        .catch((error) => {
                            console.log("error generating numb", error);
                        });
                }
        }
        else{
            res.render("user/signup",{msg:"user is already registered please log in"})
        }
   
    }
    catch(err)
    {
        console.log("error is user registration",err)
        res.status(500).render("wentWrong");
    }
} 

const OTPValidationSignIn = async (req, res) => {
    let cartCount; 
    try {
        const num1 = req.body.num_1;
        const num2 = req.body.num_2;
        const num3 = req.body.num_3;
        const num4 = req.body.num_4;
        const code = parseInt(num1 + num2 + num3 + num4);
        await OTP.find({ number: code })
            .then((fount) => {
                if (fount.length > 0) {
                    let cartCount; 
                    const succ = "Successfully Created Your Account"
                    userModel.create(req.session.data);
                    req.session.userData = null
                    res.redirect('/success')
                    // IF FOUND, DELETE THE OTP CODE FROM DB
                    OTP.findOneAndDelete({ number: code })
                        .then(() => { 
                            console.log("successfully deleted")
                        })
                        .catch((err) => {
                            console.log("error while deleting", err);
                        });
                } else {
                    res.render('user/verification', { fal: "Please Check Your OTP", user: req.session.user, cartCount })
                }
            })
            .catch((err) => {
                console.log(err)
                res.render('user/verification', { fal: "Please Check Your OTP", user: req.session.user, cartCount })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send("SignIn Otp error")
    }
}

// Success
const successTick = (req, res) => {
    let cartCount;
    res.render('user/successTick', { title: "Account", succ: "Success.....", user: req.session.user, cartCount })
}





module.exports = { 
    home, 
    login,
    signup,
    userRegister, 
    OTPValidationSignIn,
    successTick,
    loginPost,
    loginOtpValidation,
    signout,
    forGotPassword,
    numberValidation,
    // newPassword
    productView
}

