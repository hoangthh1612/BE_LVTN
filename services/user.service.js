const userService = require('express').Router();
//const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authMiddleware');

userService.get('/verify', verifyToken, (req, res) => {
    res.send({username: req.username})
});

// Đăng ký tài khoản
//userService.post('/signup', userController.postSignUp);

module.exports = userService;
 