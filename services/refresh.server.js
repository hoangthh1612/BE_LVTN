const refreshService = require('express').Router();
const refreshController = require('../controllers/refreshToken.controller');

refreshService.get('/', refreshController.handleRefreshToken);

module.exports = refreshService;