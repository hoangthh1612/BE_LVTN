const { getCartProduct, createCartProduct, removeProductFromCart } = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const cartRoute = require('express').Router();
// cartRoute.get('/get', (req, res) => {
//     return res.send("Helllo");
// })
cartRoute.post('/create', [verifyToken], createCartProduct);
cartRoute.get('/getCartByUserId',[verifyToken], getCartProduct);
cartRoute.delete('/removeProductFromCart/:productDetailId',[verifyToken], removeProductFromCart);



module.exports = cartRoute;