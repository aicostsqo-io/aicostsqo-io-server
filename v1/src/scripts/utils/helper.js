const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
const Mongoose = require('mongoose');

const passwordToHash = (password) => {
  return CryptoJS.HmacSHA256(
    password,
    CryptoJS.HmacSHA256(password, process.env.PASSWORD_HASH).toString()
  ).toString();
};

const generateAccessToken = (user) => {
  return JWT.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '1w',
  });
};
const generateRefreshToken = (user) => {
  return JWT.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY);
};

const isValidObjectId = (id) => {
  if (Mongoose.Types.ObjectId.isValid(id)) {
    if (String(new Mongoose.Types.ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
  isValidObjectId,
};
