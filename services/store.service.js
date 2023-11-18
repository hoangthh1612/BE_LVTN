const { create } = require('../controllers/store.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const storeService = require('express').Router();

storeService.post('/create',[verifyToken], create );


module.exports = storeService;