const express = require("express");
const app = express();
const art = require("../asciiart");
const cors = require("cors");
require("./configs/db")();

require("dotenv").config();
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());
require("./routes")(app);

app.get("/health-check", (req, res) => {
    return res.status(200).send("OK");
});

app.listen(port, () => {
    console.log(art);
    console.log(`Server status : Running on port ${port}`);
})