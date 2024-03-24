const mongoose = require("mongoose");
const { mongoConnectionUrl } = require("../configs/env")

module.exports = function () {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(mongoConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."));
};
