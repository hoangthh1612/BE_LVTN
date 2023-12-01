require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const http = require('http');
const {Server} = require('socket.io');

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
io.on("connection", (socket) => { 
  //console.log(socket.id);
  // socket.on("create-room", (data) => {
  //   console.log(data);
  //   socket.broadcast.emit("send-room", data);
  // })
  socket.on("join-room", (room) => {
    socket.join(room);
    if(!likesCounts[room]) {
      likesCounts[room] = 0;
    }
    console.log("roomId", room);
    io.to(room).emit('updateLikes', likesCounts[room]);
    //io.emit('updateLikes', likesCounts[room]);
  })
  socket.on('like', (room) => {
    likesCounts[room]++;
    io.to(room).emit('updateLikes', likesCounts[room]);
  })
  socket.on('disconnected', () => {
    console.log("Client disconnected");
  })
})
console.log(likesCounts);
db.sequelize.sync({ force: false }).then(() => {
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


//const {verifyToken} = require('./middleware/authMiddleware');
app.use('/apis/auth', authService);
app.use('/apis/user', userService);
app.use('/apis/refresh', refreshService);

app.use('/apis/store', storeService);
app.use('/apis/product', productService);
app.use('/apis/category', categoryRoute);
// app.use('/apis/account', accountService);
// app.use('/apis/order', orderService);
// app.use('/apis/address', addressService);
// app.use('/apis/livestream', livestreamService);
// app.use('/apis/login', loginService);
// app.use('/apis/notification', notificationService);
app.use('/apis/voucher', voucherService);
app.use('/apis/order', orderRoute);
app.use('/apis/livestream', livestreamRoute);
  



server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


