var Email = document.getElementById("emailerror");
var Passworderr = document.getElementById("passworderror");
var sendError = document.getElementById("send-error");

function emailValidate()
{
var email = document.getElementById('email').value;
    
    if(email.length==0)
    {
        Email.innerHTML = 'Email is required';
        return false;
    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
         Email.innerHTML = '!Email invalid';
         return false;
    }
    Email.innerHTML= '';
    return true;
}
function passwordValidate()
{
    var passwords = document.getElementById('password').value;
    if(passwords.length<8||passwords === '')
    {
        Passworderr.innerHTML = 'Invalid password';
        return false;
    }
    else
    {
        Passworderr.innerHTML = '';
         return true;
    }
   
}

function validateForm()
{   
    var passwords = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    if(email==""||passwords=="")
    {  
        sendError.innerHTML = 'pls fix all above';

        setTimeout(function(){sendError.style.display='none';},3000)
        return false;
    }
}



// SIGNUP VALIDATION

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const numError = document.getElementById("num-error");
const passError = document.getElementById("pass-error")

function validateName()
{
    let Name = document.getElementById('name').value;

    if(Name.length == 0)
    {
        nameError.innerHTML = 'name is required';
         document.getElementById('name').style.border = '1px solid red'; 
        return false;
    }
    if((!Name.match(/^[A-Za-z]*[A-Za-z]*(\s{1,}[A-Za-z]*)*$/)))
    {
        nameError.innerHTML = 'invalid name';   
        document.getElementById('name').style.border = '1px solid red';
        return false; 
    }
    if(Name.length < 3){
        nameError.innerHTML = 'minimum 3 cheracters';   
        document.getElementById('name').style.border = '1px solid red';
        return false; 
    }
    
    nameError.innerHTML = '';
    document.getElementById('name').style.border = '1px solid green';
    return true;
}
function validateEmail()
{
    let Email = document.getElementById('email').value;
    if(Email.length == 0)
    {
        emailError.innerHTML = 'Email is required';
        document.getElementById('email').style.border = '1px solid red';
        return false;
    }
    if(!Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
        emailError.innerHTML = 'Email invalid';
        document.getElementById('email').style.border = '1px solid red';   
        return false; 
    }
    emailError.innerHTML = "";
    document.getElementById('email').style.border = '1px solid green';
    return true;

}
function validateNumber() {
    let number = document.getElementById("phone").value.trim();
    if (/^[0-9]+$/.test(number) == false) {
        numError.innerHTML = "please enter a valid number";
        document.getElementById('phone').style.border = '1px solid red';
        return false
    }
    else
        if (number.length != 10) {
            numError.innerHTML = "please enter 10 digits";
            document.getElementById('phone').style.border = '1px solid red';
            return false
        } else {
            numError.innerHTML = "";
            document.getElementById('phone').style.border = '1px solid green';
            return true
        }
}
function validatePassword() {
    let Password = document.getElementById("password").value.trim();
    let  passError= document.getElementById("pass-error");

    if (Password === '') {
        passError.innerHTML = "Please enter a password";
        document.getElementById('password').style.border = '1px solid red';
        return false;
    }

    if (Password.length < 8) {
        passError.innerHTML = "At least 8 characters are required";
        document.getElementById('password').style.border = '1px solid red';
        return false;
    }
    let hasSpecialChar = /[!@#$%^&*]/.test(Password);
    let hasNumber = /[0-9]/.test(Password);
    let hasLowerCase = /[a-z]/.test(Password);
    let hasUpperCase = /[A-Z]/.test(Password);


    if (!hasSpecialChar || !hasNumber || !hasLowerCase || !hasUpperCase) {
        passError.innerHTML = `invalid password`;
        document.getElementById('password').style.border = '1px solid red';
        return false;
    }
    passError.innerHTML = "";
    document.getElementById('password').style.border = '1px solid green';
    return true;
}
function confirmPasswordChecking() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confpassword');
    const confirmPasswordError = document.getElementById('Confpassword');
    
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        passError.innerHTML = `invalid password`;
        document.getElementById('confpassword').style.border = '1px solid red';
        return false;
    }
    
    if (!validatePassword()) {
        confirmPasswordError.textContent = "Invalid password format";
        passError.innerHTML = `invalid password`;
        document.getElementById('confpassword').style.border = '1px solid red';
        return false;
    }
    
    confirmPasswordError.textContent = "";
    document.getElementById('confpassword').style.border = '1px solid green';
    return true;
}

function allChecking() {
    if (validateName() && validateEmail() && validateNumber() && validatePassword() && confirmPasswordChecking()) {
        return true
    } else {
        return false
    }
}