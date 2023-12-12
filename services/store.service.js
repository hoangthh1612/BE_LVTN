const { create, getStoreByUsername, getStoreById, updateStore } = require('../controllers/store.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const storeService = require('express').Router();

storeService.post('/create',[verifyToken], create );
storeService.get('/getStoreByUsername', [verifyToken], getStoreByUsername);
storeService.get('/getStoreById/:storeId', getStoreById);
storeService.put('/updateStore', [verifyToken], updateStore);
//storeService.get('/getStoreByUsername', getStoreByUsername);


module.exports = storeService;