const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async(req, res)=>{
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({msg:'User already exists'});
        }
        
        const newUser = new User({email, password});
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }
    catch(err){
        res.status(500).json({msg: 'Server error'});
    }
});

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"Invalid credentials"});

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

        const token = jwt.sign({id:user._id}, processenv.JWT_SECRET, {expiresIn:'1h'});
        res.json({token});
    }
    catch(error){
        res.status(500).json({msg:"server error"});
    }
})

module.exports = router;