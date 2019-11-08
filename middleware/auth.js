const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req , res ,next) => {
    try{
        //taking data from header
        const token = req.header('Authorization')
        const decoded = jwt.verify(token,'thisismysecret')
        const user = await User.findOne({_id: decoded._id , 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user=user
        next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }

}

module.exports = auth