const voucherService = require("express").Router();
const voucherController = require("../controllers/voucher.controller");

// api: Lấy 1 sản phẩm theo id
voucherService.get("/", voucherController.getAll);


module.exports = voucherService;