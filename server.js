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


const likesCounts = {};
const userToSocketMapping = new Map();

const getLikesByRoom = async (roomId) => {
  const livestream = await Livestream.findOne({
    where: {
      roomId,
      inLive: true
    }
  })
  return livestream;
}

io.on("connection", (socket) => { 
  
  socket.on("join-room", async (data) => {
    const {roomId, username} = data;
    socket.join(roomId);
    // if(!likesCounts[room]) {
    //   likesCounts[room] = 0;
    // }
    console.log(data);
    // io.to(room).emit('updateLikes', likesCounts[room]);
    // io.to(room).emit('orderProduct', order);
    
    //io.emit('updateLikes', likesCounts[room]);
  })
  socket.on('like', async (data) => {
    const {roomId, username} = data;
    const livestream = await getLikesByRoom(roomId);
    livestream.nums_like += 1;
    await livestream.save();

    io.to(roomId).emit('updateLikes', livestream.nums_like);
  })

  socket.on("sendOrderProduct", (data) => {
    console.log(data);
    const {order, roomId} = data;
    io.to(roomId).emit("orderProduct", order);
    //io.emit("orderProduct", order);
  })

  socket.on('disconnected', () => {
    console.log("Client disconnected");
  })
})
console.log(likesCounts);
db.sequelize.sync({ alter: false }).then(() => {
  //insertData.initial();
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
  



server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


