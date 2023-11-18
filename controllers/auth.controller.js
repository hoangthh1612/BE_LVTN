const { User, User_role, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const register = async (req, res) => {
  try {
    const {
      username,
      password,
      fullname,
      email,
      phone_number,
      address,
      avatar,
    } = req.body; ///
    // const {color_name, id} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // check username duplicate
    const userCheck = await User.findOne({ where: { username: username } });
    if (userCheck) {
      return res.status(401).json({ error: "Username already exists" });
    }
    // check email duplicate
    const emailCheck = await User.findOne({ where: { email: email } });
    if (emailCheck) {
      return res.status(401).json({ error: "Email already exists" });
    }

    const user = await User.create({
      username: username,
      password: hashedPassword,
      fullname: fullname,
      email: email,
      phone_number: phone_number,
      address: address,
      avatar: avatar,
    });
    const user_role = await User_role.create({ userId: user.id, roleId: 1 });
    res.json({ message: "Registration successful", user });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username: username } });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user_role = await User_role.findOne({ where: { userId: foundUser.id } }); // SAI vì 1 người có thể có nhiều role
    // Đăng nhập thành công, tạo token JWT kèm theo thông tin vai trò của người dùng
    const accessToken = jwt.sign(
      // { userId: foundUser._id, userRole: foundUser.role }, // Chú ý ở đây: foundUser.role chính là thông tin về vai trò của người dùng
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      // { userId: foundUser._id, userRole: foundUser.role }, // Chú ý ở đây: foundUser.role chính là thông tin về vai trò của người dùng
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "360h" }
    );
    // Lưu thông tin user vào trong cookie
    // Save in DB
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None', 
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: {
      refreshToken
    }
  })
  
  if(!foundUser) {
    res.clearCookie('jwt', {httpOnly: true,sameSite: 'None', secure: true});
    return res.sendStatus(204);
  }
  
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', {httpOnly: true,sameSite: 'None', secure: true})
  .sendStatus(204);
}

const getListRole = async (req, res, next) => {
  try {
    // 
    const { username } = req.body;
    const user = await User.findOne({ where: { username: username } });
    const listRole = await User_role.findAll({where : {userId: user.id}});
    const listRoleId = [];
    listRole.forEach(element => {
      listRoleId.push(element.roleId);
    });

    const listRoleName = [];
    listRoleId.forEach(element => { 
      if(element == 1){
        listRoleName.push("Buyer");
      }
      if(element == 2){
        listRoleName.push("Seller");
      }
      if(element == 3){
        listRoleName.push("Admin");
      }
    });
    req.listRoleName = listRoleName;
    // res.json(listRoleName);
    next();
    // return listRoleName;

  } catch (err) {
    res.status(500).json({ error: "Get list role failed" });
  }
};

const getListRoles = async (req, res) => {
  try {
    const listRoleName = req.listRoleName;
    res.json(listRoleName);
  } catch (err) {
    res.status(500).json({ error: "Get list role failed" });
  }
};


module.exports = { register, login, getListRole, getListRoles, logout };
