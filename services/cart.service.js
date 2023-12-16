const { getCartProduct, createCartProduct, removeProductFromCart, updateProductFromCart } = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const cartRoute = require('express').Router();
// cartRoute.get('/get', (req, res) => {
//     return res.send("Helllo");
// })
cartRoute.post('/create', [verifyToken], createCartProduct);
cartRoute.get('/getCartByUserId',[verifyToken], getCartProduct);
cartRoute.delete('/removeProductFromCart/:productDetailId',[verifyToken], removeProductFromCart);
cartRoute.put('/updateProductFromCart/:productDetailId',[verifyToken], updateProductFromCart)


module.exports = cartRoute;