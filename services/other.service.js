const otherService = require("express").Router();
const otherController = require("../controllers/other.controller");

// api: Lấy 1 sản phẩm theo id
otherService.get('/', otherController.getAllCategory);


module.exports = otherService;