
const { getAll } = require('../controllers/order.controller');

const orderRoute = require('express').Router();

orderRoute.get('/', getAll);

module.exports = orderRoute;