const { createFollow, getFollowsByStoreId, unFollowFromUser } = require('../controllers/follow.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const followRoute = require('express').Router();

followRoute.post('/create', [verifyToken], createFollow);
followRoute.get('/getFollowsByStoreId/:storeId', getFollowsByStoreId);
followRoute.delete('/unFollow/:storeId', [verifyToken], unFollowFromUser);

module.exports = followRoute;