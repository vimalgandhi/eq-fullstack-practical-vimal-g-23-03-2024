const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");
const validator = require("./validators/category.validator");
const middleware = require("../../middleware")

router.post("/", middleware.auth, middleware.acl('admin'), validator.createCategory, categoryController.createCatagory);
router.put("/", middleware.auth, middleware.acl('admin'), validator.updateCategory, categoryController.updateCategory);
router.get("/", middleware.auth, categoryController.getCategoryList);
router.delete("/category/:categoryId", middleware.auth, middleware.acl('admin'), categoryController.deleleCategoryById);

module.exports = router;