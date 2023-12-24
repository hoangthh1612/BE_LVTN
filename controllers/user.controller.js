
const { User } = require('../models');


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


const updateUserInfo = async (req, res) => {
  const {avatar, fullname, phone_number, address} = req.body;
  try {
    const existedUser = await User.findOne({
      where: {
        username: req.username
      }
    })
    if(!existedUser) {
      return res.status(400).json({message: "Not found user"})
    }
    await existedUser.update({
      avatar,
      fullname,
      phone_number,
      address
    })

    res.status(204).json({message: "Update user successfully"});

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  verifyAccount,
  getUserByUsername,
  getUserAuthorization,
  updateUserInfo
};
