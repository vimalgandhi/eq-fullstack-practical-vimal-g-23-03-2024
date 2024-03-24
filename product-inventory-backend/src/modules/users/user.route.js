const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const userValidator = require("./validators/user.validator");

router.post("/sign-up", userValidator.signUp, userController.singUp);
router.post("/sign-in", userValidator.signIn, userController.signIn);

module.exports = router;
