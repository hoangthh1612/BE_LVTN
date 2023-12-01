const userService = require('express').Router();
const { getUserByUsername } = require('../controllers/user.controller');
//const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authMiddleware');

// userService.get('/verify', verifyToken, (req, res) => {
//     res.send({username: req.username})
// });
userService.get('/getUserByUsername/:username', getUserByUsername);
// Đăng ký tài khoản
//userService.post('/signup', userController.postSignUp);

module.exports = userService;
 