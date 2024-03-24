const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
            required: true
        }
    },
    {
        timestamps: true,
        minimize: false,
    }
);

const userModel = mongoose.model("user", userSchema);
exports.userModel = userModel