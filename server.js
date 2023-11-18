require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

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







//const {verifyToken} = require('./middleware/authMiddleware');
app.use('/apis/auth', authService);
app.use('/apis/user', userService);
app.use('/apis/refresh', refreshService);

app.use('/apis/store', storeService);
app.use('/apis/product', productService);
app.use('/apis/category', otherService);
// app.use('/apis/account', accountService);
// app.use('/apis/order', orderService);
// app.use('/apis/address', addressService);
// app.use('/apis/livestream', livestreamService);
// app.use('/apis/login', loginService);
// app.use('/apis/notification', notificationService);
app.use('/apis/voucher', voucherService);

  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


