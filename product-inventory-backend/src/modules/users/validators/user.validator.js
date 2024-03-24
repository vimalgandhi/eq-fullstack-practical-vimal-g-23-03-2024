const validator = require('validator');
const { userModel } = require("../../../models/users.model")
const commonHelper = require("../../../helpers/common.helper")

const userValidator = {

    async userExists(email) {
        const user = await userModel.findOne({ email });
        return user;
    },

    async signUp(req, res, next) {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName) return res.status(400).json({ error: "first name is required" });
        if (!lastName) return res.status(400).json({ error: "last name is required" });
        if (!email) return res.status(400).json({ error: "Email is required" });
        if (!password) return res.status(400).json({ error: "Password is required" });

        // Now calling validateNameString without 'this'
        if (!commonHelper.validateNameString(firstName)) {
            return res.status(400).json({ error: `${firstName} should only contain alphabets and spaces` });
        }
        if (!commonHelper.validateNameString(lastName)) {
            return res.status(400).json({ error: `${lastName} should only contain alphabets and spaces` });
        }

        const user = await userValidator.userExists(email)
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email" });

        next();
    },

    async signIn(req, res, next) {
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ error: "Email is required" });
        if (!password) return res.status(400).json({ error: "Password is required" });

        if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email" });

        const user = await userValidator.userExists(email);
        if (!user) return res.status(400).json({ error: "User not found." });

        req.me = user;
        next();
    }
};

module.exports = userValidator;
