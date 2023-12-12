const userService = require('express').Router();
const { getUserByUsername, getUserAuthorization } = require('../controllers/user.controller');
//const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authMiddleware');

// userService.get('/verify', verifyToken, (req, res) => {
//     res.send({username: req.username})
// });
userService.get('/getUserByUsername/:username', getUserByUsername);
userService.get('/verifyUser',[verifyToken], getUserAuthorization);
// Đăng ký tài khoản
//userService.post('/signup', userController.postSignUp);

module.exports = userService;
 