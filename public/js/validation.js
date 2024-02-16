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



function validateForm() {
    var isValid = true;

    // Full Name
    var fullname = document.getElementById('fullname').value;
    if (fullname.trim() === '') {
        document.getElementById('fullname-error').textContent = 'Full Name is required.';
        isValid = false;
    } else {
        document.getElementById('fullname-error').textContent = '';
    }

    // Country
    var country = document.getElementById('country').value;
    if (country.trim() === '') {
        document.getElementById('country-error').textContent = 'Country is required.';
        isValid = false;
    } else {
        document.getElementById('country-error').textContent = '';
    }

    // Street Address
    var housename = document.getElementById('housename').value;
    if (housename.trim() === '') {
        document.getElementById('housename-error').textContent = 'Street address is required.';
        isValid = false;
    } else {
        document.getElementById('housename-error').textContent = '';
    }

    // Town
    var city = document.getElementById('city').value;
    if (city.trim() === '') {
        document.getElementById('city-error').textContent = 'Town is required.';
        isValid = false;
    } else {
        document.getElementById('city-error').textContent = '';
    }

    // State
    var state = document.getElementById('state').value;
    if (state.trim() === '') {
        document.getElementById('state-error').textContent = 'State is required.';
        isValid = false;
    } else {
        document.getElementById('state-error').textContent = '';
    }


    var postcode = document.getElementById('pin').value;
    var postcodeRegex = /^\d{6}$/; 

    if (!postcodeRegex.test(postcode)) {
        document.getElementById('pin-error').textContent = 'Enter a valid US ZIP code.';
        isValid = false;
    } else {
        document.getElementById('pin-error').textContent = '';
    }

    // Phone (US phone number pattern)
    var mobile = document.getElementById('mobile').value;
    var mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;

    if (!mobileRegex.test(mobile)) {
        document.getElementById('mobile-error').textContent = 'Enter a valid  phone number.';
        isValid = false;
    } else {
        document.getElementById('mobile-error').textContent = '';
    }

    // Email
    var email = document.getElementById('email').value;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Enter a valid email address.';
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = '';
    }

    return isValid;
}


    function addAddress() {
        
        //  Get form input values

        var fullname = document.getElementById("fullname").value;
        var country = document.getElementById("country").value;
        var housename = document.getElementById("housename").value;
        var city = document.getElementById("city").value;
        var state = document.getElementById("state").value;
        var pin = document.getElementById("pin").value;
        var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var closeBtn = document.getElementById('closeBtn')

        var nameRegex = /^[A-Za-z\s]+$/;
        var countryRegex = /^[A-Za-z\s]+$/;
        var pinRegex = /^\d{6}$/;
        var mobileRegex = /^[0-9]{10}$/;
        var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        var cityRegex = /^[A-Za-z\s]+$/; // City validation pattern
        var stateRegex = /^[A-Za-z\s]+$/; // State validation pattern
        var housenameRegex = /^[A-Za-z0-9\s]+$/; // Housename validation pattern

        // Validate inputs
        var isValid = true;

        if (!nameRegex.test(fullname)) {
            isValid = false;
            document.getElementById("fullname-error").textContent = "Enter a valid full name";
        } else {
            document.getElementById("fullname-error").textContent = "";
        }

        if (!countryRegex.test(country)) {
            isValid = false;
            document.getElementById("country-error").textContent = "Enter a valid country name";
        } else {
            document.getElementById("country-error").textContent = "";
        }

        if (!pinRegex.test(pin)) {
            isValid = false;
            document.getElementById("pin-error").textContent = "Enter a valid PIN code";
        } else {
            document.getElementById("pin-error").textContent = "";
        }

        if (!mobileRegex.test(mobile)) {
            isValid = false;
            document.getElementById("mobile-error").textContent = "Enter a valid mobile number";
        } else {
            document.getElementById("mobile-error").textContent = "";
        }

        if (!emailRegex.test(email)) {
            isValid = false;
            document.getElementById("email-error").textContent = "Enter a valid email address";
        } else {
            document.getElementById("email-error").textContent = "";
        }

        if (!cityRegex.test(city)) {
            isValid = false;
            document.getElementById("city-error").textContent = "Enter a valid city name";
        } else {
            document.getElementById("city-error").textContent = "";
        }

        if (!stateRegex.test(state)) {
            isValid = false;
            document.getElementById("state-error").textContent = "Enter a valid state name";
        } else {
            document.getElementById("state-error").textContent = "";
        }

        if (!housenameRegex.test(housename)) {
            isValid = false;
            document.getElementById("housename-error").textContent = "Enter a valid housename";
        } else {
            document.getElementById("housename-error").textContent = "";
        }

        if (isValid) {
            $.ajax({
                url: '/addaddresscheckout',
                method: 'POST',
                data: {
                    fullname: fullname,
                    country: country,
                    housename: housename,
                    city: city,
                    state: state,
                    pin: pin,
                    mobile: mobile,
                    email: email
                },
                success: function (response) {
                    if (response.added) {
                        $("#address-reload").load("/checkout #address-reload", function () {
                            closeBtn.click();
                        });
                    }
                }
            });
        }
    }