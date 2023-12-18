// const AccountModel = require('../models/account.models/account.model');
// const VerifyModel = require('../models/account.models/verify.model');
// const UserModel = require('../models/account.models/user.model');
// const mailConfig = require('../config/mail.config');
// const helper = require('../helpers');
// const constants = require('../constants');
//const bcrypt = require('bcryptjs');
const { User } = require('../models');
// const { Op } = require('sequelize');
// const helpers = require('../helpers');
// const constrants = require('../constrants');
// const { login } = require('./auth.controller');

const verifyAccount =  (req, res) => {
  res.send("Hello");
  // const account = await User.findOne({
  //   where: { username: req.username },
  // });
  // account.active = 'active';
  // await account.save();
  // res.status(200).send(account);
};


const getUser = async (username) => {
  const user = await User.findOne({
    where: {
      username: username
    }
  })
  return user;
} 

const getUserByUsername  = async (req, res) => {
  const {username} = req.params;
  try {
    const user = await getUser(username);
    const {dataValues} = user;
    const {password, refreshToken, ...others} = dataValues;
    console.log(others);
    res.status(200).json(others);
    
  } catch (err) {
    console.log(err);
  }
}

const getUserAuthorization = async (req, res) => {
  try {
    const user = await getUser(req.username);
    const {dataValues} = user;
    const {password, refreshToken, ...others} = dataValues;
    res.status(200).json(others);
    
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  verifyAccount,
  getUserByUsername,
  getUserAuthorization
};
