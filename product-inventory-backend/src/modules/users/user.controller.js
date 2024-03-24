const bcryptHelper = require("../../helpers/bcrypt.helper");
const { userModel } = require("../../models/users.model");
const jwt = require("../../helpers/jwt.helper");
const userController = {

    singUp: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        const hashedPassword = await bcryptHelper.hashpassword(password, 10);

        const user = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await user.save()

        return res.status(201).json({ message: "User created successfully" })
    },

    signIn: async (req, res) => {
        const { email, role } = req.body;
        const { id } = req.me;

        const token = await jwt.encode({ id, email, role });

        return res.status(200).json({ message: "User sign in successfully", token });
    }
};

module.exports = userController;
