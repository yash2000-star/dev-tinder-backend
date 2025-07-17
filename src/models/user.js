const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true, 
        required: true,
        unique: true, // for not duplicate
        trim: true,
        validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("invaild email address:" + value);
          }
        },
    },
    password: {
        type: String,
        required: true,
         validate(value) {
        if (!validator.isStrongPassword(value)) {
            throw new Error("This is not a strong password:" + value);
          }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["Male", "Female", "Other"].includes(value)) {
                throw new Error("Gender data is not vaild");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://m.media-amazon.com/images/M/MV5BMmRlNmI5YWEtMjA5OC00NGM4LWJjMGUtZjU0NmI2MzRlOGNhXkEyXkFqcGc@._V1_.jpg",
        validate(value) {
        if (!validator.isURL(value)) {
            throw new Error("invaild photo URL:" + value);
          }
        },
    },
    about: {
        type: String,
        default: "This is a default abouth of the user!",
    },
    skills: {
        type: [String],
    },
},{timestamps: true});

userSchema.index({ firstName: 1, lastName: 1 })

userSchema.methods.getJWT =  async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
                expiresIn: "1d"
            });

            return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordVaild = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordVaild;
}

module.exports = mongoose.model("User", userSchema);



