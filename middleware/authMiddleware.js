const jwt = require("jsonwebtoken");
const { User, User_role } = require("../models");
require('dotenv').config();
function isTokenExpired(token) {
  const payloadBase64 = token.split(".")[1];
  const decodedJson = Buffer.from(payloadBase64, "base64").toString();
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  const expired = Date.now() >= exp * 1000;
  return expired;
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if(err) return res.sendStatus(403);
      req.username = decoded.username;
      next();
    }
  )
};

module.exports = { verifyToken };
