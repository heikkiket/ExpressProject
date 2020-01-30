const express = require('express');
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    console.log("Got response!");
    res.send("Hello, world!");
});

app.listen(port, () => console.log(`Example app listening at localhost on port ${port}`));
