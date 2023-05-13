const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const User = require("./app/models/User");
const indexRoutes = require("./app/routes/indexRoutes");
const adminRoutes = require("./app/routes/adminRoutes");
const storesRoutes = require("./app/routes/storesRoutes");


mongoose.connect("mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/movies", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB successfully!");
        const app = express()
        app.use(express.static('app'));
        app.use(express.json());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use("/index", indexRoutes);
        app.use("/admin", adminRoutes);
        app.use("/stores", storesRoutes);

        app.get("/", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/index.html")
        });

        app.get("/stores", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/sucursales.html")
        });

        app.get("/admin", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/admin.html")
        });

        app.post('/register', async (req, res) => {
            console.log("app.js: admin");
            const {username, password} = req.body;
            const user = new User({username, password});

            try {
                await user.save();
                res.status(200).send("Usuario registrado satisfactoriamente.");
            } catch (err) {
                res.status(500).send("Error registrando al nuevo usuario, por favor intente de nuevo.");
            }
        });

        app.post('/authenticate', async (req, res) => {
            const {username, password} = req.body;

            try {
                const user = await User.findOne({username});
                if (!user) {
                    res.status(500).send("Usuario no registrado.");
                } else {
                    user.isCorrectPassword(password, (err, result) => {
                        if (err) {
                            res.status(500).send("Error al autenticar al usuario, por favor intente de nuevo.");
                        } else if (result) {
                            res.status(200).send("Usuario autenticado satisfactoriamente.");
                        } else {
                            res.status(500).send("Usuario o contraseña incorrectos.");
                        }
                    });
                }
            } catch (err) {
                res.status(500).send("Error al autenticar al usuario, por favor intente de nuevo.");
            }
        });

        app.listen(3000, () => {
            console.log("Server has started!")
        });
    })
    .catch(err => console.error("Failed to connect to MongoDB: ", err));

/*
mongoose
    .connect("mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/movies", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express()
        app.use(express.static('app'));
        app.use(express.json());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use("/index", indexRoutes);
        app.use("/admin", adminRoutes);
        app.use("/stores", storesRoutes);

        app.get("/", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/index.html")
        });

        app.get("/stores", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/sucursales.html")
        });

        app.get("/admin", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/admin.html")
        });

        app.post('/register', async (req, res) => {
            const {username, password} = req.body;
            const user = new User({username, password});

            try {
                await user.save();
                res.status(200).send("Usuario registrado satisfactoriamente.");
            } catch (err) {
                res.status(500).send("Error registrando al nuevo usuario, por favor intente de nuevo.");
            }
        });

        app.post('/authenticate', async (req, res) => {
            const {username, password} = req.body;

            try {
                const user = await User.findOne({username});
                if (!user) {
                    res.status(500).send("Usuario no registrado.");
                } else {
                    user.isCorrectPassword(password, (err, result) => {
                        if (err) {
                            res.status(500).send("Error al autenticar al usuario, por favor intente de nuevo.");
                        } else if (result) {
                            res.status(200).send("Usuario autenticado satisfactoriamente.");
                        } else {
                            res.status(500).send("Usuario o contraseña incorrectos.");
                        }
                    });
                }
            } catch (err) {
                res.status(500).send("Error al autenticar al usuario, por favor intente de nuevo.");
            }
        });

        app.listen(3000, () => {
            console.log("Server has started!")
        });
    });
*/