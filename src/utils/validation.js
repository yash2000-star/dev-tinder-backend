 const validator = require('validator')


 const validateSignUpData = (req) => {
     const { firstName, lastName, emailId, password, age, gender } = req.body;

    if(!firstName || firstName < 4) {
        throw new Error("First name is required and must be at least 4 characters.");
    } 
     else if (!validator.isEmail(emailId)) {
       throw new Error("Vaild email is required.");
    } 
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password should be atleast 6 characters long.");
    } 
     else if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
        throw new Error("Gender must be 'male', 'female', or 'other'.");
    }
 };

 const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName", 
        "lastName",
        "emailId", 
        "about", 
        "skills", 
         "age", 
        "photoUrl",
        "gender"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => 
    allowedEditFields.includes(field)
    );
    return isEditAllowed;
   

 };


 module.exports = {
    validateSignUpData,
    validateEditProfileData,
 }
   