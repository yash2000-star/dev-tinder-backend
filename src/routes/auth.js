const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user")
const bcrypt = require('bcrypt');


authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
      photoUrl
    } = req.body;

      // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash)

    // Creating a new instance of the user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
         age,
        gender,
       about: about || "Tell us about yourself",
       skills: skills || [],
        photoUrl
    });

    
        await user.save();
   res.send("User added sucessfully!")
    } catch (err) {
      res.status(400).send("Error saving the User:" + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {

        const { emailId, password} = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invaild credentials")
        }

        const isPasswordVaild = await user.validatePassword(password);

        if(isPasswordVaild) {
            
            const token = await user.getJWT()
               

            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            })
            res.send("Login Sucessfull!!!")
        } else {
            throw new Error("Invaild credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
});

authRouter.post("/logout",async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Sucessful!!");
})

module.exports = authRouter; 

