const router = require("express").Router(); 
const mongoose = require("mongoose");
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const config = require('../config/dbConfig')
const sec = config.jwtSecret;
const jwt = require ('jsonwebtoken')
const auth = require('../middleware/auth')

router.post("/" , async (req,res) => {
  const user = new User(req.body)
  console.log(req.body)
  try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({user , token})
  }catch (err) {
      res.status(400).send(err)
  }
});


router.get("/" , async (req , res) => {
    const user = await User.find()
    res.send(user)
});


router.post('/login' , async (req , res) => {
    try {
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user:user,token})
    }catch (err) {
        res.status(400).send(err)
    }
    
})


 router.post('/logout' ,auth, async (req , res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send("Logged Out Successfully")
    }catch (err) {
        console.log("error")
        res.status(500).send(err)
    }
})

router.post("/checklogin" , async (req,res) => {
  const users = await User.findOne({
      email : req.body.email,
      password : req.body.password
  })
  .then(response => {
   return res.status(201).json(response)
 })
 .catch(err => {
   const response = {
      message : "Either Email or Password is wrong."
   }
   return res.status(404).json(response)
 });
})

module.exports = router;