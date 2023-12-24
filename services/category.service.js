const { getAllCategories, getCategoryOfStore, getCategoryByCategoryName } = require('../controllers/category.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const categoryRoute = require('express').Router();

categoryRoute.get('/getCategoryOfStore', [verifyToken], getCategoryOfStore);
categoryRoute.get('/', getAllCategories);
categoryRoute.get("/getCategoryByCategoryName", getCategoryByCategoryName);

//categoryRoute.get('/getCategoryOfStore/:storeId', getCategoryOfStore);

module.exports = categoryRoute;