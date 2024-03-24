const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const validator = require("./validator/product.validator")
const middleware = require("../../middleware")

router.post("/", middleware.auth, middleware.acl('admin'), validator.createProduct, productController.createProduct);
router.put("/", middleware.auth, middleware.acl('admin'), validator.updateproduct, productController.updateProduct);
router.get("/", middleware.auth, productController.getProductList);
// router.get("/product/:productId", middleware.auth, productController.getProductById);
// router.delete("/product/:id", middleware.auth, middleware.acl('admin'), productController.deleleProductById);

module.exports = router;