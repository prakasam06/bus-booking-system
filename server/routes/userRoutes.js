const express = require('express');
const path = require('path');
const {signUp,signIn,auth,signOut,pagebro,userDetails,checkAccess} = require('../controllers/userController');
const { verifyJWT } =  require('../middlewares/verifyJWT')
const userRouter = express.Router();

userRouter.post('/signup|register',signUp); //register
userRouter.post('/login|signin',signIn); //sign ins  -- verify email and password sets ref token on cookie and sends an access token as res
userRouter.post('/auth',auth); // auth -- verifies the refresh token and provides an access token
userRouter.post('/logout|signout',signOut); // signout -- clears the refresh token on the cookies and the db
userRouter.get('/me',userDetails);
userRouter.get('/checkaccess',checkAccess);

// the verifyJWT middleware validates the access token 
userRouter.get('/pagebro',verifyJWT,pagebro);

module.exports = {userRouter};
