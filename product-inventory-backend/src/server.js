const express = require("express");
const app = express();
const art = require("../asciiart");

require("dotenv").config();
const port = process.env.PORT || 4000;

app.get("/health-check", (req, res) => {
    return res.status(200).send("OK");
});

app.listen(port, () => {
    console.log(art);
    console.log(`Server status : Running on port ${port}`);
})