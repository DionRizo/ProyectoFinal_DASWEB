const express = require("express");
const mongoose = require("mongoose");
const indexRoutes = require("./app/routes/indexRoutes");

mongoose
    .connect("mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/movies", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express()
        app.use(express.static('app'));
        app.use(express.json());
        app.use("/api", indexRoutes);
        
        app.get("/", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/index.html")
        });

        app.get("/stores", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/sucursales.html")
        });

        app.listen(3000, () => {
            console.log("Server has started!")
        });
    });