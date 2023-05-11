const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./app/models/User");
const indexRoutes = require("./app/routes/indexRoutes");
const adminRoutes = require("./app/routes/adminRoutes");
const userRoutes = require("./app/routes/userRoutes");

mongoose
    .connect("mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/movies", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express()
        app.use(express.static('app'));
        app.use(express.json());
        app.use("/index", indexRoutes);
        app.use("/admin", adminRoutes);
        app.use("/user", userRoutes);

        app.get("/", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/index.html")
        });

        app.get("/stores", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/sucursales.html")
        });

        app.get("/admin", (req, res) => {
            res.sendFile(__dirname + "/app/views/pages/admin.html")
        });

        app.use(session({
            secret: "secret",
            resave: false,
            saveUninitialized: false
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());

        app.listen(3000, () => {
            console.log("Server has started!")
        });
    });