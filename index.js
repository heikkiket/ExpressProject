const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8080;

var url = 'mongodb://levylistauser:levylista@localhost:27017?authSource=admin';


app.get("/", (req, res) => {
    console.log("Got response!");

    MongoClient.connect(url, (err, connection) => {
        if (err) throw err;

        db = connection.db("levylista");
        db.collection("levyt").find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
        connection.close();
    });
});

app.listen(port, () => console.log(`Example app listening at localhost on port ${port}`));
