const authService =  require('express').Router();

const authController = require('../controllers/auth.controller');

// Đăng ký tài khoản
authService.post('/signup', authController.register);

// Đăng nhập
authService.post('/login', authController.login);

authService.get('/logout', authController.logout);
authService.get('/getCookies', authController.getCookie);
authService.get('/getListRole', authController.getListRole, authController.getListRoles);



module.exports = authService;