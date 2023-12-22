require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const http = require('http');
const {Server} = require('socket.io');
const {Livestream} = require('./models');
const server = http.createServer(app);
//const corsConfig = require('./config/cors.config');
const corsOptions = require('./config/cors.config');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 8000);
const { DataTypes } = require("sequelize");

const insertData = require('./data/insertData');

app.use(credentials)
//app.use(cors());
app.use(cors(corsOptions));

//app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cookieParser());

const io = new Server(server, {
  cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true
    }
});


const getLikesByRoom = async (roomId) => {
  const livestream = await Livestream.findOne({
    where: {
      roomId,
      inLive: true
    }
  })
  return livestream;
}

 
db.sequelize.sync({ alter: false }).then(() => {
  // insertData.initial();
});
// app.use(cors(corsConfig));

const authService =  require('./services/auth.service');
const productService = require('./services/product.service');
const otherService = require('./services/other.service');
const voucherService = require('./services/voucher.service');
const userService = require('./services/user.service');
const refreshService = require('./services/refresh.server');
const storeService = require('./services/store.service');
const orderRoute = require('./services/order.service');
const livestreamRoute = require('./services/livestream.service');
const categoryRoute = require('./services/category.service');
const cartRoute = require('./services/cart.service');
const productReviewRoute = require('./services/product_review.service');
const followRoute = require('./services/follow.service');
const notiRoute = require('./services/notification.service');


//const {verifyToken} = require('./middleware/authMiddleware');
app.use('/apis/auth', authService);
app.use('/apis/user', userService);
app.use('/apis/refresh', refreshService);
app.use('/apis/store', storeService);
app.use('/apis/product', productService);
app.use('/apis/category', categoryRoute);
app.use('/apis/voucher', voucherService);
app.use('/apis/order', orderRoute);
app.use('/apis/livestream', livestreamRoute);
app.use('/apis/cart', cartRoute);
app.use('/apis/product-review', productReviewRoute);
app.use('/apis/follow', followRoute);
app.use('/apis/notification', notiRoute);
  

const socketIO = require('./config/socket.io.config');
socketIO.init(server);
socketIO.getIO().on('connection', (socket) => {
  console.log("co ket noi kia aeeeeeeeeeeeeeeeeeeeeeee");
  // socketIO.connectedUser.push({ userId: socket.user.id, socketId: socket.id });
  // console.log("then nay no vo kia aeeee", socket.id);
  if(socket.user === "seller"){
    console.log("thang nay la nguoi ban");
  }

  if(socket.user === "buyer"){
    console.log("thang nay la nguoi mua");
  }

  socket.on('foo', (e)=>{
    console.log("co thang mua hang kia ae");
    socketIO.getIO().emit('foo', "tao da xac nhan roi nha maiiiiiiiiiii");
    console.log(e);
  })

  socket.on('disconnect', () => {
    console.log("disconnect: ", socket.id);
    // let userIndex = socketIO.connectedUser.findIndex(
    //   (user) => user.socketId === socket.id
    // );
    // if (userIndex !== -1) socketIO.connectedUser.splice(userIndex, 1);
  });
});


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


