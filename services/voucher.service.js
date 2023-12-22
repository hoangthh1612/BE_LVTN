const voucherService = require("express").Router();
const voucherController = require("../controllers/voucher.controller");
const { verifyToken } = require("../middleware/authMiddleware");

// api: Lấy 1 sản phẩm theo id
voucherService.get("/", voucherController.getAll);
voucherService.post('/create', [verifyToken], voucherController.createVoucher);
voucherService.get('/getVoucherByStoreId/:storeId',[verifyToken], voucherController.getVoucherByStoreId);
voucherService.get('/getVoucherOfStore', [verifyToken], voucherController.getVoucherOfStore);

module.exports = voucherService;