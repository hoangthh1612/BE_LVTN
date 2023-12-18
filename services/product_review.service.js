
const { createProductReview, getProductReviewByProductId, getNumOfReview } = require('../controllers/product_review.controller');

const productReviewRoute = require('express').Router();

productReviewRoute.post('/create', createProductReview);
productReviewRoute.get('/getProductReviewByProductId/:productId', getProductReviewByProductId);
productReviewRoute.get('/numOfReview/:productId', getNumOfReview);

module.exports = productReviewRoute;