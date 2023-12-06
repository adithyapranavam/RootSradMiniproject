const user = require('../model/usermodel')
const bcrypt = require('bcrypt');
const fast2sms = require('fast-two-sms');  
const OTP = require('../model/otpmodel');  
    
  
const API = "LpKOkcUND4ClatShjgRIH2FVPG1wbn7sx9BfZeE03QrozXA6WdbwJ2VIs6laoPdzDC14KrOtWTuRA0vm"


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
        if(req.session.userData){
            const user = false
            res.render('user/home',{user})
        }
        const user = true

         res.render('user/home',{user})

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
        if(req.session.userData){
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
        const existUser = await user.findOne({email:req.body.email})
        if(!existUser)
        {
            const {name,phone,email,password,confpassword }=req.body;
            req.body.isBlocked = false;
            const isBlocked = req.body.isBlocked
            console.log("this is my phone number",phone);

            const spassword = await SecurePassword(password);
            req.session.userData = new user(
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
                console.log(user);
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
                    user.create(req.session.userData);
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

const logout = (req,res)=>{
    try {
        req.session.destroy((err) => {
            if (err) {
                res.send('Error')
            } else {
                res.redirect('/login')
            }
        })

    } catch (error) {
        console.log(err);
        const message = error.message
        res.status(500).send('404-error', {  error:500, message:'Internal Server Error' });
    }
}



module.exports = { 
    home, 
    login,
    signup,
    userRegister, 
    OTPValidationSignIn,
    successTick,
    logout
}

