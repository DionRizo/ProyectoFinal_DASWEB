const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./app/models/User");
const indexRoutes = require("./app/routes/indexRoutes");
const adminRoutes = require("./app/routes/adminRoutes");

mongoose
    .connect("mongodb+srv://CinemaSurfAdmin:giq1pqvGDDFrDaek@cinemasurfdb.yqvttyu.mongodb.net/movies", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express()
        app.use(express.static('app'));
        app.use(express.json());
        app.use("/index", indexRoutes);
        app.use("/admin", adminRoutes);

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
            saveUninitialized: false,
            cookie: { secure: false },
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());

        app.get("/register", (req, res) => {
            res.render("register");
        });

        app.post("/register", (req, res) => {
            User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: 'Registration failed', error: err });
                }
                passport.authenticate("local")(req, res, () => {
                    console.log("Successfully registered");
                    res.status(200).json({ message: 'Registration successful', user: user });
                });
            });
        });

        app.get("/login", (req, res) => {
            res.render("login");
        });

        app.post("/login", (req, res, next) => {
            passport.authenticate("local", (err, user, info) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Internal server error" });
                } else if (!user) {
                    console.error(info);
                    return res.status(401).json({ message: "Incorrect username or password" });
                } else {
                    req.logIn(user, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Internal server error" });
                        } else {
                            console.log("Logged in");
                            req.session.username = user.username;
                            return res.status(200).json({ message: "Logged in", username: user.username });
                        }
                    });
                }
            })(req, res, next);
        });

        app.get("/logout", (req, res) => {
            req.logout();
            res.redirect("/");
        });

        app.get("/check-login", (req, res) => {
            if (req.session.username) {
                res.status(200).json({ username: req.session.username });
            } else {
                res.status(200).json({});
            }
        });


        app.listen(3000, () => {
            console.log("Server has started!")
        });
    });