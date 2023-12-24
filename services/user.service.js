const userService = require('express').Router();
const { getUserByUsername, getUserAuthorization, updateUserInfo } = require('../controllers/user.controller');
//const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authMiddleware');

// userService.get('/verify', verifyToken, (req, res) => {
//     res.send({username: req.username})
// });
userService.get('/getUserByUsername/:username', getUserByUsername);
userService.get('/verifyUser',[verifyToken], getUserAuthorization);
userService.put("/updateUser", [verifyToken], updateUserInfo);
// Đăng ký tài khoản
//userService.post('/signup', userController.postSignUp);

module.exports = userService;
 