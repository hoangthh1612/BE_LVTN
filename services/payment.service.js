const { createFollow, getFollowsByStoreId, unFollowFromUser, getFollowsOfStore } = require('../controllers/follow.controller');
const {create_payment_url} = require('../controllers/payment.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const paymentRoute = require('express').Router();

paymentRoute.post('/create_payment_url', create_payment_url);

// paymentRoute.get('/create_payment_url', function (req, res, next) {
//     res.render('order', {title: 'Tạo mới đơn hàng', amount: 10000})
// });


module.exports = paymentRoute;