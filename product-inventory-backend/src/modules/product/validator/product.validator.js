const { userModel } = require("../../../models/users.model")
const commonHelper = require("../../../helpers/common.helper")
const mongoose = require("mongoose");
const { categoryModel } = require("../../../models/category.model");
const ObjectId = mongoose.Types.ObjectId;

const productValidator = {

    async createProduct(req, res, next) {
        const { name, description, categoryId, price, quantity, image } = req.body;

        const validationErrors = [];

        if (!name) validationErrors.push("name is required");
        if (!description) validationErrors.push("description is required");
        if (!categoryId) validationErrors.push("categoryId is required");
        if (!price) validationErrors.push("price is required");
        if (!quantity) validationErrors.push("quantity is required");
        if (!image) validationErrors.push("image is required");

        if (name && !commonHelper.validateNameString(name)) {
            validationErrors.push("Name should only contain alphabets and spaces");
        }

        // Validate that price and quantity are numbers
        if (!isNaN(price) && !isNaN(quantity)) {
            // Convert price and quantity to numbers
            req.body.price = parseFloat(price);
            req.body.quantity = parseInt(quantity);
        } else {
            if (isNaN(price)) validationErrors.push("Price should be a number");
            if (isNaN(quantity)) validationErrors.push("Quantity should be a number");
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        next();
    },

    async updateProduct(req, res, next) {
        const { name, description, categoryId, price, quantity, image } = req.body;
        const productId = req.params.productId; // Assuming productId is passed in the request URL

        try {
            // Fetch the existing product from the database
            const existingProduct = await Product.findById(productId);

            if (!existingProduct) {
                return res.status(404).json({ error: "Product not found" });
            }

            const validationErrors = [];

            // Compare the new values with existing ones
            if (name === existingProduct.name && description === existingProduct.description &&
                categoryId === existingProduct.categoryId && price === existingProduct.price &&
                quantity === existingProduct.quantity && image === existingProduct.image) {
                validationErrors.push("All fields are the same, no update needed");
            }

            if (name && !commonHelper.validateNameString(name)) {
                validationErrors.push("Name should only contain alphabets and spaces");
            }

            // Validate that price and quantity are numbers
            if (!isNaN(price) && !isNaN(quantity)) {
                // Convert price and quantity to numbers
                req.body.price = parseFloat(price);
                req.body.quantity = parseInt(quantity);
            } else {
                if (isNaN(price)) validationErrors.push("Price should be a number");
                if (isNaN(quantity)) validationErrors.push("Quantity should be a number");
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
