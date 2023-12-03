const productService = require("express").Router();
const productController = require("../controllers/product.controller");
const { getListRole } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authMiddleware");

// api: Lấy 1 sản phẩm theo id
// Lấy tất cả sản phẩm

productService.get("/", productController.getAll);

// Tạo sản phẩm

productService.get('/getProductById/:productId', productController.getProductById);

productService.post("/add_item", [verifyToken], productController.createProductNotVariation);

productService.post("/add_product_variation",[verifyToken], productController.createProductVariation);

productService.get("/getProductByStoreId", [verifyToken], productController.getProductByStoreId)

// Cập nhật sản phẩm
productService.put("/update", getListRole, productController.updateProduct);

// Xóa sản phẩm
productService.delete("/delete", getListRole, productController.deleteProduct);

// productService.get("/bestbook", productController.getBestBook);

// productService.get("/getsellbyid", productController.countNumOfSellById);

// // // api: Lấy danh sách sản phẩm liên quan

// // productApi.get('/list/related', productController.getProductList);

// // api: lấy danh sách và phân trang

// productService.get("/all", productController.getAllProducts);

// // // api: tìm kiếm sản phẩm

// // productApi.get('/search', productController.getSearchProducts);

// productService.get("/search", productController.getProductByNameElk);

// // api: lọc sản phẩm
// productService.get("/filter", productController.getAllProductsByType);
// // api: get top sell
// productService.get("/topsell", productController.getTopSell);
// // api: get top sell by type
// productService.get("/topsell/:type", productController.getTopSellByCategory);

// productApi.post('/list/recommend',productController.getRecommendProducts)

module.exports = productService;
