const express = require("express");
const userRouter = require("./modules/users/user.route")

module.exports = function (app) {
    app.use("/users", userRouter);
}
