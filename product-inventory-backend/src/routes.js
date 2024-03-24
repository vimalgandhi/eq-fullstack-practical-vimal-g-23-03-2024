const express = require("express");
const userRouter = require("./modules/users/user.route")
const categoryRouter = require("./modules/category/category.routes")

module.exports = function (app) {
    app.use("/users", userRouter);
    app.use("/categories", categoryRouter);
}
