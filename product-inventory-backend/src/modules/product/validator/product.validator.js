const commonHelper = require("../../../helpers/common.helper")
const mongoose = require("mongoose");
const productModel = require("../../../models/product.model");
const categoryModel = require("../../../models/category.model");
const ObjectId = mongoose.Types.ObjectId;

const productValidator = {

    async createProduct(req, res, next) {
        const { name, description, categoryId, price, imageUrl } = req.body;

        const validationErrors = [];

        if (!name) validationErrors.push("name is required");
        if (!description) validationErrors.push("description is required");
        if (!categoryId) validationErrors.push("categoryId is required");
        if (!price) validationErrors.push("price is required");
        if (!imageUrl) validationErrors.push("image is required");

        if (name && !commonHelper.validateNameString(name)) {
            validationErrors.push("Name should only contain alphabets and spaces");
        }

        // Validate that price are numbers
        if (!isNaN(price)) {
            // Convert price to numbers
            req.body.price = parseFloat(price);
        } else {
            if (isNaN(price)) validationErrors.push("Price should be a number");
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        next();
    },

    async updateProduct(req, res, next) {
        const { name, description, categoryId, price, imageUrl, productId } = req.body;

        try {
            // Fetch the existing product from the database
            const existingProduct = await productModel.findById({ _id: ObjectId(productId) });

            if (!existingProduct) {
                return res.status(404).json({ error: "Product not found" });
            }

            const validationErrors = [];

            // Compare the new values with existing ones
            if (name === existingProduct.name && description === existingProduct.description &&
                categoryId === existingProduct.categoryId && price === existingProduct.price &&
                imageUrl === existingProduct.imageUrl) {
                validationErrors.push("All fields are the same, no update needed");
            }

            if (name && !commonHelper.validateNameString(name)) {
                validationErrors.push("Name should only contain alphabets and spaces");
            }

            // Validate that price and quantity are numbers
            if (!isNaN(price)) {
                // Convert price and quantity to numbers
                req.body.price = parseFloat(price);
            } else {
                if (isNaN(price)) validationErrors.push("Price should be a number");
            }

            if (validationErrors.length > 0) {
                return res.status(400).json({ errors: validationErrors });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    }

};

module.exports = productValidator;
