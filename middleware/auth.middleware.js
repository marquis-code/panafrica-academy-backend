const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user.models");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log("No Toke found in cookie");
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.locals.user = null;
          next();
        } else {
          console.log(decodedToken);
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
