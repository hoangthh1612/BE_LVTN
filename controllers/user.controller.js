// const AccountModel = require('../models/account.models/account.model');
// const VerifyModel = require('../models/account.models/verify.model');
// const UserModel = require('../models/account.models/user.model');
// const mailConfig = require('../config/mail.config');
// const helper = require('../helpers');
// const constants = require('../constants');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { Op } = require('sequelize');
const helpers = require('../helpers');
const constrants = require('../constrants');

const verifyAccount =  (req, res) => {
  res.send("Hello");
  // const account = await User.findOne({
  //   where: { username: req.username },
  // });
  // account.active = 'active';
  // await account.save();
  // res.status(200).send(account);
};
//fn: Đăng ký tài khoản
const postSignUp = async (req, res, next) => {
  try {
    const { email, password, name, dateOfBirth, gender } = req.body.account;
    // Kiểm tra rỗng , vì một số trường đăng nhập bằng gmail cho phép rỗng
    if (!(email && password && name && dateOfBirth && gender))
      return next({ code: 400, msg: 'Bad Request' });
    //Kiểm tra tài khoản đã tồn tại hay chưa
    const account = await User.findOne({
      where: {
        email,
      },
    });

    //nếu tồn tại, thông báo lỗi, return
    if (account) {
      let error = `Email or Phone already exist !`;
      return next({ code: 409, msg: error });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // Tạo code xác minh tài khoản
    let verifyCode = helpers.generateVerifyCode(constrants.NUMBER_VERIFY_CODE);
    // Tạo tạo tài khoản và user tương ứng
    await User.create({
      email,
      password: hashPassword,
      name,
      dateOfBirth,
      gender,
      active: 'active',
      verifyCode: verifyCode,
      authType: 'local',
    });

    return res.status(200).json({ message: 'successful' });
  } catch (error) {
    return next({ code: 500, msg: 'Something went wrong' });
  }
};



module.exports = {
  postSignUp,
  verifyAccount,
};
