const { create, getStoreByUsername } = require('../controllers/store.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const storeService = require('express').Router();

storeService.post('/create',[verifyToken], create );
storeService.get('/getStoreByUsername', [verifyToken], getStoreByUsername);
//storeService.get('/getStoreByUsername', getStoreByUsername);


module.exports = storeService;