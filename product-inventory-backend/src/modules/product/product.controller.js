const productModel = require("../../models/product.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const productController = {

    createProduct: async (req, res) => {
        try {
            const { name, description, categoryId, price, imageUrl } = req.body;
            const { id } = req.me;

            const product = new productModel({
                name,
                description,
                categoryId,
                price,
                imageUrl,
                createdBy: ObjectId(id),
            });

            await product.save();

            return res.status(201).json({ message: "Product created successfully", product });
        } catch (error) {
            return res.status(500).json({ error: "product creation failed", message: error.message });
        }
    },


    updateProduct: async (req, res) => {
        try {
            const { productId, name, description, categoryId, price, imageUrl } = req.body;
            const { me } = req;

            const product = {
                name,
                description,
                categoryId,
                price,
                imageUrl
            }

            await productModel.updateOne({ _id: ObjectId(productId), createdBy: ObjectId(me.id) }, product);

            return res.status(201).json({ message: "Product updated successfully", product });
        } catch (error) {
            return res.status(500).json({ error: "product update failed", message: error.message });
        }

    },

    getProductList: async (req, res) => {
        const { page, limit } = req.query;

        const pageCount = parseInt(page) || 1;
        const limitCount = parseInt(limit) || 10;

        const skipCount = (pageCount - 1) * limitCount;

        const categories = await productModel.find().skip(skipCount).limit(limitCount);
        return res.status(200).json(categories);
    },


    deleleProductById: async (req, res) => {
        const { productId } = req.params;

        try {
            await productModel.deleteOne({ _id: ObjectId(productId) });
            return res.status(200).json({ message: "product deleted successfully" });
        } catch (error) {
            return res.status(400).json({ message: "product delete failed", error: error.message });

        }
    }

};

module.exports = productController;
