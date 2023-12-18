
const { getAll, createOrder, getOrderByUserId, getOrderByOrderSn, updateOrderStatus, getOrderByStoreId } = require('../controllers/order.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const orderRoute = require('express').Router();

orderRoute.get('/', getAll);
orderRoute.post('/create',[verifyToken], createOrder);
orderRoute.get('/getOrderByUserId/', [verifyToken], getOrderByUserId);
orderRoute.get('/getOrderByOrderSn/:orderSn', getOrderByOrderSn);
orderRoute.put('/updateOrderStatus', updateOrderStatus);
orderRoute.get('/getOrderByStoreId', [verifyToken], getOrderByStoreId);

module.exports = orderRoute;