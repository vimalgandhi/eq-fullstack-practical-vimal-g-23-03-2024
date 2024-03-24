const userRouter = require("./modules/users/user.route")
const categoryRouter = require("./modules/category/category.routes")
const productRouter = require("./modules/product/product.routes")

module.exports = function (app) {
    app.use("/users", userRouter);
    app.use("/categories", categoryRouter);
    app.use("/products", productRouter);
}
