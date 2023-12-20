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
            const cart = userData.cart.items;
            const cartCount = cart.length;
            res.render('user/home',{user,products,name,cartCount})
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
        let cart,cartCount;
        if(req.session.userData)
        {
        const userData = await userModel.findOne({email:req.session.userData})
        const name = userData.name;
        const data = await product.findOne({_id:id});
        const cate = data.category;
        cart = userData.cart.items;
        cartCount = cart.length;
        const category = await product.find({ category: cate }).sort({ _id: -1 }).limit(4);
        const user = true;

        res.render('user/productView',{data,name,user,category,cartCount})  
    }
    else{
        const name = ''
        const user = false
        const data = await product.findOne({_id:id});
        const cate = data.category;
        const category = await product.find({ category: cate }).sort({ _id: -1 }).limit(4);

        res.render('user/productView',{data,name,user,category,cartCount})  
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

//cart section
const loadcart = async (req, res) => {
    try {
        console .log(" i am loadcart")
        const userEmail = req.session.userData;
        if (req.session.user) {
            const userData = await userModel.findOne({email:userEmail})
            const name = userData.name
            const similarproducts = await product.find({ availability: true }).sort({ name: -1 }).limit(4)
            const cartItems = userData.cart.items
            const cartCount = cartItems.length
            console.log(cartCount+"HIIII");
            const cartProductIds = cartItems.map(item => item.productId);
            const cartProducts = await product.find({ _id: { $in: cartProductIds } });
            const productsPrice = cartItems.reduce((accu, element) => accu + (element.quantity * element.price), 0);
            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
            let totalPrice = 0;
            for (const item of cartItems) {
                const product = cartProducts.find(prod => prod._id.toString() === item.productId.toString());
                if (product) {
                    totalPrice += item.quantity * product.price;
                } else {
                    console.log(`Product not found for item: ${item.productId}`);
                }
            }
            const user = true
            const discount = Math.abs(totalPrice - productsPrice);
            res.render('user/cart', { message: "Login Page", user, name, cartCount, cartItems, cartProducts, productsPrice,totalQuantity,discount,similarproducts })
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }

} 


// ADD TO CART

const AddCart = async(req,res)=>
{
    
    const id = req.params.id
    const userEmail = req.session.userData;
    try{
      
        const userData = await userModel.findOne({email: userEmail})
        const cartItems = userData.cart.items
        const existingCartItem = cartItems.find(item => item.productId.toString() === id);
        const data = await product.findOne({_id:id});
        const productprice = data.price
        
        if (existingCartItem) {
            existingCartItem.quantity += 1; 
            existingCartItem.price = existingCartItem.quantity * productprice
        }
        else {
            const newcartitem = {
                name:product.name,
                productId: id,
                quantity: 1,
                realPrice: product.price,
                price: product.originalprice,
                offer: product.price
            }
            userData.cart.items.push(newcartitem)
    }
    await userData.save()
    res.json('successfully cart u r product')
}
   catch(err)
    {
          console.log("detaild page error" + err)
    }

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
    productView,
    loadcart,
    AddCart
}

