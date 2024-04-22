const userSchema = require("../models/userModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { handleTokens } = require("../helpers/handleTokens");

const signUp = async (req, res) => {
  console.log("in user signup controller");
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      confirmPassword: req.body.confirmPassword,
    };
    console.log(data);
    const isUser = await User.findOne({ email: data.email });
    if (isUser) {
      console.log("user already exists");
      return res
        .status(400)
        .send({ status: 400, error: "User already exists" });
    }
    console.log(data.password,"password",data.confirmPassword,"confirmPassword");
    if (data.password.trim() !== data.confirmPassword.trim()) {
      console.log("password does not match");
      return res
        .status(500)
        .send({ status: 400, error: "Passwords does not match" });
    } else {
      try {
        const user = await User.create(data);
        console.log(user);
        return res
          .status(200)
          .json({ status: 200, message: "User created successfully" });
      } catch (err) {
        res.status(500).json({ status: 400, error: `404 Not found,${err}` });
      }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, error: `500 Internal Server Error` });
  }
};

const signIn = async (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.findOne({ email: body.email });

  if (!user) {
    return res
      .status(400)
      .send({ status: 400, message: `User not registered` });
  }

  const isMatch = await user.comparePassword(body.password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .send({ status: 400, message: "invalid credentials" });
  } else {
    const tokens = await handleTokens(user.id);
    // res.cookie("jwt", tokens.refreshToken, {
    //   maxAge: 24 * 60 * 60 * 1000,
    //   httpOnly: false,
    //   secure: true,           
    //   SameSite: 'None',
    //   withCredentials: true,
    //   priority: 'High'
    // });
    let options = {
      maxAge: 14 * 24 * hour,
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      withCredentials: true,
      priority: 'High'
  };
  res.cookie("jwt", tokens.refreshToken, options);
    return res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      accessToken: tokens.accessToken,
      user: user,
    });
  }
};

const auth = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(400).send({ message: "no cookie" });
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken: refreshToken });

  if (!user) return res.status(403).send({ message: `User not found` });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(400).send({ error: err });
    if (user.id !== decoded.id)
      return res(403).send({ message: "not a valid ref token" });
    const ACCESS_TOKEN = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    return res.status(200).json({ status:200,accessToken: ACCESS_TOKEN });
  });
};

const signOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const user = User.findOne({ refreshToken: refreshToken });
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    { $set: { refreshToken: null } },
    { new: true }
  );

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

const pagebro = (req, res) => {
  return res.status(200).json({ message: "hello vrooooooooooo" });
};

const userDetails = async(req, res) => {
  try {
    const data = {
      isAuthenticated: false,
      isRefreshTokenExpired: false,
      user : null,
    };
    const cookies = req.cookies;
    if (!cookies?.jwt){
      return res.status(404).send({ status: 400, message: `no cookie found}`,data:data });
    }
    
    const refreshToken = cookies.jwt;
    console.log(refreshToken,"refreshToken");
    const refreshResult = await checkToken(refreshToken, "refresh");
    console.log(refreshResult,"refreshResult")
    if (refreshResult.valid) {
      data.isRefreshToken = true;
      data.isAuthenticated = true;
    } else {
      data.isAuthenticated = false;
      data.isRefreshToken = false;
    }  
    if (refreshResult.expired) {
      data.isRefreshTokenExpired = true;
    }
    data.user = refreshResult.user;
    console.log(data)
    return res.status(200).json({ status: 200, data: data });
  } catch (err) {
    return res.status(400).send({ message: "error occured", error: err.toString() });
  }
};

const checkAccess = async (req, res) => {
  return res.status(200).json({ status: 200, message: "user is authenticated" });
}

module.exports = { signUp, signIn, auth, signOut, pagebro, userDetails,checkAccess };


const checkToken = (token, type) => {
  let secret = type === "access" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
  
  console.log(token, "token");
  
  return new Promise((resolve, reject) => {
   jwt.verify(token, secret, async (err, decoded) => {
      const result = {
        expired: false,
        valid: false,
        user: null,
      };
      if (err) {
        if (err.name === "TokenExpiredError") {
          result.expired = true;
        }
        result.valid = false;
        resolve(result);
      } else {
        result.valid = true;
        if (decoded && decoded.id) {
          try {
            result.user = await User.findById(decoded.id);
            if (!result.user) {
              result.valid = false;
            }
            resolve(result);
          } catch (userError) {
            reject(userError);
          }
        } else {
          result.valid = false;
          resolve(result);
        }
      }
    });
  });
};
