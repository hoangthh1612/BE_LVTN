const { getAllCategories } = require('../controllers/category.controller');

const categoryRoute = require('express').Router();

categoryRoute.get('/', getAllCategories);

module.exports = categoryRoute;