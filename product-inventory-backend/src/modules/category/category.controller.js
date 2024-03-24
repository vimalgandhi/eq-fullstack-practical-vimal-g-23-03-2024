const { categoryModel } = require("../../models/category.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const categoryController = {

    createCatagory: async (req, res) => {
        const { name, description } = req.body;
        const { id } = req.me;

        const category = new categoryModel({
            name,
            description,
            createdBy: ObjectId(id)
        });

        try {
            await category.save();
            return res.status(201).json({ message: "Category created successfully" });
        } catch (error) {
            return res.status(400).json({ message: "Category creation failed", error: error.message });
        }
    },

    updateCategory: async (req, res) => {
        const { id, name, description } = req.body;
        const { me } = req

        try {
            await categoryModel.updateOne({ _id: ObjectId(id), createdBy: ObjectId(me.id) }, { name, description });
            return res.status(200).json({ message: "Category updated successfully" });
        } catch (error) {
            return res.status(400).json({ message: "Category update failed", error: error.message });
        }
    },

    getCategoryList: async (req, res) => {
        const { page, limit } = req.query;

        const pageCount = parseInt(page) || 1;
        const limitCount = parseInt(limit) || 10;

        const skipCount = (pageCount - 1) * limitCount;

        const categories = await categoryModel.find().skip(skipCount).limit(limitCount);
        return res.status(200).json(categories);
    },

    deleleCategoryById: async (req, res) => {
        const { categoryId } = req.params;

        try {
            await categoryModel.deleteOne({ _id: ObjectId(categoryId) });
            return res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            return res.status(400).json({ message: "Category delete failed", error: error.message });

        }
    }

};

module.exports = categoryController;
