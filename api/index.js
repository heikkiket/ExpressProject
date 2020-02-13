const express = require('express');
const Albums = require('./albums.js');
const Artists = require('./artists.js');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 8081;

var url = 'mongodb://levylistauser:levylista@localhost:27017?authSource=admin';


    MongoClient.connect(url, (err, connection) => {
        if (err) throw err;

        db = connection.db("levylista");
        Albums.setDb(db);
        Artists.setDb(db);

        app.get("/", (req, res) => {
            res.sendFile(__dirname + '/vue/index.html');
        });

        app.get("/api/albums", async (req, res) => {
            res.append("Access-Control-Allow-Origin", "*");
            result = await Albums.getAll();
            res.send(result);

        });

        app.get("/api/albums/:id", async (req, res) => {
            res.send(await Albums.getSingle(req.params.id));
        });

        app.get("/api/artists", async (req, res) => {
            res.send(await Artists.getAll());
        });


        app.get("/api/artists/:id", async (req, res) => {
            let result = await Artists.getSingle(req.params.id)
                .catch((err) => {console.log(err);});
            res.send(result);
        });


        app.listen(port, () => console.log(`Example app listening at localhost on port ${port}`));

    });
