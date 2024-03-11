const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/userModel')

const handleTokens = async function(email){
    const ACCESS_TOKEN = jwt.sign(
        {'email':email},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
     )
    const REFRESH_TOKEN = jwt.sign(
        {'email':email},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )
    try{
        await User.findOneAndUpdate(
            { email: email }, 
            { $set: { refreshToken: REFRESH_TOKEN } }, 
            { new: true } 
          )
    
        tokens = {"refreshToken":REFRESH_TOKEN,"accessToken":ACCESS_TOKEN}
        return tokens

    }catch(err){
        console.log("error:",err);
        throw err;
    }
    
}

module.exports = { handleTokens }