
const { createProductReview, getProductReviewByProductId, getNumOfReview } = require('../controllers/product_review.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const productReviewRoute = require('express').Router();

productReviewRoute.post('/create', [verifyToken], createProductReview);
productReviewRoute.get('/getProductReviewByProductId/:productId', getProductReviewByProductId);
productReviewRoute.get('/numOfReview/:productId', getNumOfReview);

module.exports = productReviewRoute;