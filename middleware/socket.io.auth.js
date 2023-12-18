const jwt = require('jsonwebtoken');
const { User } = require('../models');
const cookie = require('cookie');
const jwtAuthSocketIO = async (socket, next) => {
  try {

    // let token = cookie.parse(socket.request.headers.cookie).accessToken;
    const {token} = socket.handshake.headers;

    // console.log("day la token lay dc", token);
    // let token = cookie.parse(socket.request.headers.cookie).accessToken;
    // let token1 = String(token);
    // console.log("day la token bị ăn lol",token1);
    //if not exist cookie[access_token] -> isAuth = false -> next
    // if (!token) {
    //   next(new Error('invalid'));
    //   return;
    // }
    //verify jwt
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // if (decoded) {
      // console.log("Passport Middleware: ", decoded);
      // const { id } = decoded.userId;


      if(token === 'seller'){
        // const user = await User.findByPk(8);
        socket.user ="seller";
      }
      if(token ==='buyer'){
        // const user = await User.findByPk(9);
        socket.user = "buyer";
      }



      // const user = await User.findByPk(token);
      // if (user) {
      //   socket.user = user;
      // } else {
      //   socket.user = null;
      // }
    // }
    next();
  } catch (error) {
    console.log('Socket IO authentica error: ', error);
    next(new Error('invalid'));
  }
};
module.exports = {
  jwtAuthSocketIO,
};
