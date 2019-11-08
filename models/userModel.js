const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

var userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : "First Name is required"
    },
    lastName : {
        type : String
    },
    userName : {
        type : String,
        required : "User Name is required"
    },
    email : {
        type : String,
        required : "Email is required",
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password : {
        type : String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{
   timestamps: true 
}
)

// mongoose middleware hash the plain text password before saving
userSchema.pre('save', async function (next) {
    //this is user object for using before save in db for bcrypt pass
    const user = this
    //Returns true if this document was modified, else false.
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password , 8)
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString()} , 'thisismysecret' ,{expiresIn: '7 days'})
    user.tokens = user.tokens.concat({token})
    //Store tokens while users login
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email , password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

const User = mongoose.model('User' , userSchema)

module.exports = User;