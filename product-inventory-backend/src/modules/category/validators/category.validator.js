const { userModel } = require("../../../models/users.model")
const commonHelper = require("../../../helpers/common.helper")
const mongoose = require("mongoose");
const { categoryModel } = require("../../../models/category.model");
const ObjectId = mongoose.Types.ObjectId;

const categoryValidator = {

    async userExists(email) {
        const user = await userModel.findOne({ email });
        return user;
    },

    async createCategory(req, res, next) {
        const { name, description } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!description) return res.status(400).json({ error: "Description is required" });

        if (!commonHelper.validateNameString(name)) {
            return res.status(400).json({ error: `Name should only contain alphabets and spaces` });
        }

        next();
    },

    async updateCategory(req, res, next) {
        const { id, name, description } = req.body;

        if (!name) return res.status(400).json({ error: "name is required" });
        if (!description) return res.status(400).json({ error: "description is required" });

        if (!commonHelper.validateNameString(name)) {
            return res.status(400).json({ error: `Name should only contain alphabets and spaces` });
        }

        const category = await categoryModel.findOne({ _id: ObjectId(id) });
        if (!category) return res.status(400).json({ error: "Category not found" });

        if (name === category.name && description === category.description) {
            return res.status(400).json({ error: "No changes detected" });
        }

        next();
    },
};

module.exports = categoryValidator;
