const { createNotification } = require('../controllers/notification.controller');

const notiRoute = require('express').Router();

notiRoute.post('/create', createNotification);

module.exports = notiRoute;