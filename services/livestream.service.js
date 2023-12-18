const { createLivestream, updateEndStream, getProductsByLivestremId, getLivestream } = require('../controllers/livestream.controller');

const livestreamRoute = require('express').Router();

livestreamRoute.post('/create', createLivestream);
livestreamRoute.put('/updateEndStream/:storeId', updateEndStream);
livestreamRoute.get('/getProductsByLivestreamId/:storeId', getProductsByLivestremId);
livestreamRoute.get('/getLivestream/:roomId', getLivestream);
module.exports = livestreamRoute;