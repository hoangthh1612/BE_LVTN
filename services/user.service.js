const userService = require('express').Router();
const { getUserByUsername, getUserAuthorization, createRoleSeller, createSellerStore } = require('../controllers/user.controller');
//const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authMiddleware');

// userService.get('/verify', verifyToken, (req, res) => {
//     res.send({username: req.username})
// });
userService.get('/getUserByUsername/:username', getUserByUsername);
userService.get('/verifyUser',[verifyToken], getUserAuthorization);

userService.post('/createSellerRole', createRoleSeller);
userService.post('/createSellerStore', createSellerStore);
// Đăng ký tài khoản
//userService.post('/signup', userController.postSignUp);

module.exports = userService;
 