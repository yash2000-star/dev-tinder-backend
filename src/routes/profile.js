const express = require('express');
const profileRouter = express.Router();

const { userAuth } = require('../middleware/auth')
const { validateEditProfileData } = require("../utils/validation")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
    const cookies = req.cookies;

    const { token } = cookies
    if (!token) {
        throw new Error("Invaild Token")
    }
    
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790")

    const { _id } = decodedMessage;
    console.log("Logged In user is: " + _id);

    const user = await User.findById(_id);
    if(!user) {
        throw new Error("User does not exist")
    }

    res.send(user)
    }  catch (err) {
   res.status(400).send("ERROR: " + err.message);
}
});

profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)) {
            throw new Error("Invaild Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile is updated sucessfully`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});

profileRouter.patch("/profile/password",userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if(!currentPassword || !newPassword) {
           return res.status(400).send("Input fields are required.");
        }

        if(!validator.isStrongPassword(newPassword)) {
            return res.status(400).send("Please enter a Strong password.");
        };

        const user = req.user
        const isMatch = await user.validatePassword(currentPassword);

        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        user.password = newPasswordHash;
        await user.save();

        res.send("Password changed sucessfully!");
    } catch (err) {
        console.error("Password update error:", err);
        res.status(400).send("Internal server error");
    }
});

module.exports = profileRouter;