const productService = require("express").Router();
const productController = require("../controllers/product.controller");
const { getListRole } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authMiddleware");

productService.get("/", productController.getAll);

productService.get('/getProductById/:productId', productController.getProductById);

productService.post("/add_item", [verifyToken], productController.createProductNotVariation);

productService.post("/add_product_variation",[verifyToken], productController.createProductVariation);
productService.get('/getProductByStore', [verifyToken], productController.getProductByStore);

productService.get("/getProductByStoreId/:storeId", productController.getProductByStoreId)
productService.get("/getProductByCategoryId/:categoryId", productController.getProductByCategoryId);

// Cập nhật sản phẩm
productService.put("/update", getListRole, productController.updateProduct);

// Xóa sản phẩm
productService.delete("/delete/:productId", [verifyToken], productController.deleteProduct);

// productService.get("/bestbook", productController.getBestBook);

// productService.get("/getsellbyid", productController.countNumOfSellById);



module.exports = productService;
