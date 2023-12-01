const { createLivestream, updateEndStream, getProductsByLivestremId } = require('../controllers/livestream.controller');

const livestreamRoute = require('express').Router();

livestreamRoute.post('/create', createLivestream);
livestreamRoute.put('/updateEndStream/:storeId', updateEndStream);
livestreamRoute.get('/getProductsByLivestreamId/:storeId', getProductsByLivestremId);
module.exports = livestreamRoute;