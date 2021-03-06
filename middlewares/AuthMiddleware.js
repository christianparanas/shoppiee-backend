const { verify } = require("jsonwebtoken");
const db = require("../models");

const userValidateJWT = (req, res, next) => {
  const uJwtToken = req.header("uJwtToken");

  if (!uJwtToken) res.status(403).json("No token provided!");

  try {
    const validatedToken = verify(uJwtToken, process.env.JWT_SECRET);
    if (validatedToken) return next();
  } catch (err) {
    return res.status(401).json("Unauthorized!");
  }
};

const adminValidateJWT = (req, res, next) => {
  const adJwtToken = req.header("adJwtToken");

  if (!adJwtToken) res.status(403).json("No token provided!");

  try {
    const validatedToken = verify(adJwtToken, process.env.JWT_SECRET_AD);
    if (validatedToken) return next();
  } catch (err) {
    return res.status(401).json("Unauthorized!");
  }
};

module.exports = { userValidateJWT, adminValidateJWT };
