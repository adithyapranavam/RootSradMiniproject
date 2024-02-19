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

//HOME PAGE
const home = async(req,res)=>
{
    try{
        const products = await product.find({availability:true}).limit(4)

        if(req.session.userData){
            const userData = await userModel.findOne({email:req.session.userData})
            console.log(userData,'this is the userdata form sessions');
            const name = userData.name
            const user = true
            const cart = userData.cart.items;
            const cartCount = cart.length;
            const wishcount = userData.wishlist.length
            const wishlist = userData.wishlist.length
            console.log(wishlist)
            res.render('user/home',{user,products,name,cartCount,wishlist,wishcount})
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
                req.session.userData = isExistingUser.email
                res.redirect('/')
                // const number = isExistingUser.number;
                // let randome = Math.floor(Math.random() * 9000) + 1000;
                // fast2sms.sendMessage({
                //     authorization: API,
                //     message: `Your verification OTP is: ${randome}`,
                //     numbers: [number],
                // })
                //     .then(saveUser());
                // //save randome Number to database then render verify page
                // console.log("this is otp",randome);
                // function saveUser() {
                //     const newUser = new OTP({
                //         number: randome
                //     })
                //     newUser.save()
                //         .then(() => {
                //             res.render('user/verification', {  signinPage });
                //         })
                //         .catch((error) => {
                //             console.log("error generating numb", error);
                //         });
                // }
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
        let cart,cartCount,wishlist;
        if(req.session.userData)
        {
        const userData = await userModel.findOne({email:req.session.userData})
        const name = userData.name;
        const data = await product.findOne({_id:id});
        const cate = data.category;
        cart = userData.cart.items;
        cartCount = cart.length;
        const wishlist = userData.wishlist.length
        const category = await product.find({ category: cate }).sort({ _id: -1 }).limit(4);
        const user = true;

        res.render('user/productView',{data,name,user,category,cartCount,wishlist})  
    }
    else{
        const name = ''
        const user = false
        const data = await product.findOne({_id:id});
        const cate = data.category;
        const category = await product.find({ category: cate }).sort({ _id: -1 }).limit(4);

        res.render('user/productView',{data,name,user,category,cartCount,wishlist})  
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
        const userEmail = req.session.userData;
        if (req.session.userData) {
            const userData = await userModel.findOne({email:userEmail})
            const name = userData.name
            
            const similarproducts = await product.find({ availability: true }).sort({ name: -1 }).limit(4)
            const cartItems = userData.cart.items
            // console.log(cartItems,'this is  the cart items');

            const cartCount = cartItems.length
            const wishlist = userData.wishlist.length
            const cartProductIds = cartItems.map(item => item.productId);
            const cartProducts = await product.find({ _id: { $in: cartProductIds } });
         

            const productsPrices = cartItems.reduce((accu, element) => accu + (element.quantity * element.price), 0);
            const productsPrice = Math.round(productsPrices).toFixed(2);
            console.log(productsPrices,'this is teh product price');

            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
            const subTotal = cartItems.reduce((total, item) => total +( item.realPrice * item.quantity) , 0);
            console.log(subTotal+"subTotal++");
            let totalPrice = 0;
            // let subTotal = 0;
            for (const item of cartItems) {
                const product = cartProducts.find(prod => prod._id.toString() === item.productId.toString());
                if (product) {
                    totalPrice += item.quantity * product.price;
                    // subTotal += item.quantity * product.price;
                } else {
                    console.log(`Product not found for item: ${item.productId}`);
                }
            }
            const user = true
            const discount = Math.abs(totalPrice - subTotal).toFixed(2);
            totalPrice = Math.abs(totalPrice).toFixed(2);
            
            res.render('user/cart', { message: "Login Page", user, name, cartCount, cartItems, cartProducts, productsPrice,totalQuantity,discount,similarproducts,wishlist,userData, totalPrice,subTotal })
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
        else
         {
            const newcartitem = {
                name:data.name,
                productId: id,
                quantity: 1,
                realPrice: data.orginalprice,
                price: data.price,
                offer:data.price,
                image:data.image
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

const cartQuantityUpdate = async (req, res) => {   
   
    const cartId = req.params.itemId;
    const data = Number(req.body.quantity);
    const userEmail = req.session.userData;
    try {
        const userData = await userModel.findOne({ email: userEmail });
        const cartItems = userData.cart.items;
        const cartItem = userData.cart.items.id(cartId);
        
        // const cartQuantityPre = cartItem.quantity;
        // console.log(object);

        const CartQuantity = cartItem.quantity = data;
        const offerPrice = cartItem.offer;
        const cartPrice = cartItem.realPrice = offerPrice * CartQuantity;
        const products = await product.findById(cartItem.productId);
        const ProQuantity = products.quantity;

        
        // const count = CartQuantity - cartQuantityPre;
        // product.quantity -= count;

        const GPrice = cartItems.reduce((accu, element) => accu + (element.quantity * element.price), 0);
        const T = cartItems.reduce((accu, element) => accu + element.realPrice, 0);
        const GrandPrice = userData.grantTotal = GPrice;
        const Total=userData.total = T;

        await userData.save();

        const grantTotal = GrandPrice;
        const total = Total;
        const discount = grantTotal - total;
        res.json({ cartPrice, grantTotal, total, discount, ProQuantity });

    } catch (error) {
        console.log(error);
    }
}

const updateCart = async(req,res)=>
{

        const idvalue = req.body.idvalule;
        const sessvalue = req.body.sessvalues;
        const changenum = req.body.change;

        var user = await userModel.findByIdAndUpdate({ _id: sessvalue });
    
        const index = user.cart.items.indexOf(
            user.cart.items.find((val) => {
                return val.productId == idvalue;
            })
        );
    
        if (changenum == 1) {
            const quantitys = user.cart.items[index].quantity;
            user.cart.items[index].quantity++;
            await user.save();
            let valp = user.cart.items[index].offer;
            let valq = user.cart.items[index].quantity;
            user.cart.items[index].price = valp * valq;
            await user.save();
    
        } else {
            const quantitys = user.cart.items[index].quantity;
    
            user.cart.items[index].quantity--;
    
            await user.save();
    
            let valp = user.cart.items[index].offer;
            let valq = user.cart.items[index].quantity;
            user.cart.items[index].price = valp * valq;
            await user.save();  
        }
res.json(100);
}  


const cartDelete = async (req,res) =>
{
  
    const id = req.params.id
    const userEmail = req.session.userData
    try{
        let cartDelete = await userModel.findOne({ email: userEmail })

        let cardelete = await userModel.updateOne({ email: userEmail }, { $pull: { 'cart.items': { _id: id } } });
     
         res.redirect('/cart');
    }
    catch (err) {
        console.log("detaild page error" + err)
    }
   
}

//WISHLIST
const WishListLoad = async (req, res) => {
    try {
        const userEmail = req.session.userData;
        if (req.session.userData) 
        {
            const userDetails = await userModel.findOne({ email: userEmail });
            const name =  userDetails.name
            const productData = userDetails.wishlist;
            // console.log(productData);
            const cart = userDetails.cart.items;
            const cartCount = cart.length;
            const wishlist = userDetails.wishlist.length
            // item.productId.toString() === id
            const productId = productData.map(items => items.productId);
            // console.log(productId+"iam productId");
            const productDetails = await product.find({ _id: { $in: productId } });
            console.log(productDetails+"i am productDetails");
            const price = productDetails.originalprice - (productDetails.originalprice * productDetails.productOffer) / 100
            // console.log(price,"price....")
            const user = true
            res.render('user/wishlist', { user, price, productDetails, cartCount,name,wishlist })
        } else {
            res.redirect('/login')
        }
    } catch (err) {
        console.log("detaild page error" + err)
    }
}
const addingWishList = async (req, res) =>
 {
    const productId = req.params.id;
    const userEmail = req.session.userData;
    try {
       
        const userDetails = await userModel.findOne({ email: userEmail });
        const productExist = userDetails.wishlist.map(items => items.productId.toString() === productId);

        if (productExist.includes(true)) {
            return res.json("Already Exist");
        } else {
            const WhishList = {
                productId: productId
            }
            userDetails.wishlist.push(WhishList);
            await userDetails.save();
            return res.json('server got this....');
        }
    } catch (error) {
        console.log("detaild page error" + error)
    }
}
const addingWhishListtoCart = async (req, res) => {

             const id = req.body.productId;
             const userEmail = req.session.userData;
        try {
        
            const userDetails = await userModel.findOne({ email: userEmail });
            const cartItems = userDetails.cart.items;
            const existingCartItem = cartItems.find(item => item.productId.toString() === id);
            const cartPrtoduct = await product.findOne({ _id: id });
            console.log(cartPrtoduct+"cartProtoduct")
            const productPrice = cartPrtoduct.price;
            if (existingCartItem) {
                existingCartItem.quantity += 1;
                existingCartItem.price = existingCartItem.quantity * productPrice;
            } else {
                const newCartItem = {
                    productId: id,
                    quantity: 1,
                    price: cartPrtoduct.orginalprice,
                    realPrice: cartPrtoduct.orginalprice
                };
                userDetails.cart.items.push(newCartItem);
            }
        await userDetails.save();

        res.json("successfully cart u r product")
    } catch (error) {
        console.log('Error adding to cart:', error);
    }
}
const WhishProductDelete = async (req, res) => {

    const productId = req.params.id;
    const userEmail = req.session.userData;
    try {
        
        let wishDelete = await userModel.findOne({ email: userEmail })
        let wisDelete = await userModel.updateOne({email:userEmail},{ $pull: { wishlist: { productId: productId } } })
        res.redirect("/wishlist");
    } catch (error) {
        console.log("whish deleting Error" + error)
    }
}

   //CHECKOUT
const Checkout = async (req, res) => {
    const userEmail = req.session.userData;
    if(req.session.userData){
        try {
     
            const userDetails = await userModel.findOne({ email: userEmail });
            console.log(userDetails);
            
            const currentUserID = userDetails._id;
            // console.log(currentUserID+"+++");
            const name =  userDetails.name
            const cartItems = userDetails.cart.items;
            const cartCount = cartItems.length;
            const coupons = await couponModle.find();
            const wishlist = userDetails.wishlist.length;
            const coupon = coupons.filter(coupon => !coupon.userId.includes(currentUserID));
            const cartProductIds = cartItems.map(item => item.productId.toString());
            const cartProducts = await product.find({ _id: { $in: cartProductIds } });

            const totalP_Prices = cartItems.reduce((total, items) => total + parseFloat(items.realPrice), 0);
            const totalP_Price = Math.round( totalP_Prices).toFixed(2);
            const address = userDetails.address;
            let totalPrice = 0;
            totalPrice = cartItems.reduce((total,item) => total + item.price,0);
            const discount = Math.abs(totalP_Price - totalPrice)
            const user = true;
            res.render('user/checkOut', {
                title: "Check Out",
                user,
                cartItems,
                cartProducts,
                discount,
                totalP_Price,
                totalPrice,
                address,
                cartCount,
                wishlist,
                name,
                coupon
            })
        } catch (error) {
            console.log(error);
        }
    }else{
        res.redirect('/login')
    }
}
const getAddress = async(req,res)=>
{
 try{
    const userEmail = req.session.userData;
        if (req.session.userData) 
        {
            const userDetails = await userModel.findOne({ email: userEmail });
            const name =  userDetails.name
            const user = true
            res.redirect('/address',name,user)  
        }
        else
        {
            res.redirect('/login')  
        }
 }
 catch (error) {
    console.log(error);
}
}

const addressAdding = async (req, res) => {


    const userEmail = req.session.userData;
        
    try {
        const { fullname, houseName, country, city, state, mobile, pin,email } = req.body;
        const userData = await userModel.findOne({ email: userEmail });

        if (!userData) {
            return console.log("User not found")
        }

        const newAddress = {
            fullname: fullname,
            houseName: houseName,
            country: country,
            city: city,
            state: state,
            mobile: mobile,
            pin: pin,
            email:email
        };

        userData.address.push(newAddress);
        await userData.save();
        res.redirect('/profile');
    } 
    catch (error) {
        console.log(error);
    }
}

  const toAddAddressCheckout = async(req,res)=>
  {
 
    try
    {
        const userEmail = req.session.userData;
        const { fullname, houseName, country, city, state, mobile, pin,email } = req.body;
        const userData = await userModel.findOne({ email: userEmail });
        if (!userData) {
            return console.log("User not found")
        }
        const newAddress = {
            fullname: fullname,
            houseName: houseName,
            country: country,
            city: city,
            state: state,
            mobile: mobile,
            pin: pin,
            email:email
        };

        userData.address.push(newAddress);
        await userData.save();
        res.redirect('/CheckOutPage');
    }
    catch (error) {
        console.error(error.message);
  }
}
const geteditAddress = async(req,res)=>
{
    try
    {
        const userEmail = req.session.userData;
        const addressId = req.query.id
        if(req.session.userData)
        {
            const userData = await userModel.findOne({ email: userEmail });
            let cart = userData.cart.items;
            let cartCount = cart.length;
            const wishlist = userData.wishlist.length
            const userAddress = userData.address; 
            const name = userData.name
            const selectedAddress = userAddress.find((data) => data._id.toString() === addressId);
            const user = true
            res.render('user/editAddress',{ userAddress, cartCount,name,wishlist,user, selectedAddress})
        }
    }
    catch(error)
    {
        console.log(error)
    }
}
const updateaddress = async (req, res) => {

    const userEmail = req.session.userData;
    try {
        const { fullname, houseName, country, city, state, mobile, pin, email,AddressId } = req.body;
        const userData = await userModel.findOne({ email: userEmail });
        const exisitingAddress = userData.address.find((data) => data._id.toString() === req.body.AddressId);
     
        if (exisitingAddress) {
           
            exisitingAddress.fullname = fullname;
            exisitingAddress.houseName = houseName;
            exisitingAddress.country = country;
            exisitingAddress.city = city;
            exisitingAddress.state = state;
            exisitingAddress.mobile = mobile;
            exisitingAddress.pin = pin;
            exisitingAddress.email = email;
        } else {
            const newAddress = {
                fullname: fullname,
                houseName: houseName,
                country: country,
                city: city,
                state: state,
                mobile: mobile,
                pin: pin,
                email:email
            };
            userModel.address.push(newAddress);
    
        }
        await userData.save();
        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}

const remove = async(req,res)=>
{
    const addressId = req.query.id;
    const userEmail = req.session.userData;
        try {
            let userData = await userModel.findOne({email:userEmail})
            let addsDelete = await userModel.updateOne({email:userEmail},{$pull:{address:{_id:addressId}}})
            res.redirect('/profile'); 
        } catch (err) {
           
            res.status(500).send('Internal Server Error');
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
    AddCart,
    cartQuantityUpdate,
    addingWishList,
    WishListLoad,
    cartDelete,
    updateCart,
    addingWhishListtoCart,
    WhishProductDelete,
    Checkout,
    addressAdding,
    getAddress,
    toAddAddressCheckout,
    geteditAddress,
    updateaddress,
    remove   
}

