const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.use(bodyParser.json());
const User = require('../models/User');
const Order = require('../models/Order');

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            console.log("usersRoute.js: No users found in the database");
            return res.status(404).send({ message: "No users found" });
        }
        console.log("usersRoute.js: Sending all users in the database");
        res.send(users);
    } catch (error) {
        console.log("usersRoute.js: Error retrieving users");
        console.error(error);
        res.status(500).send({ message: "usersRoute.js: Error retrieving users" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: "usersRoute.js: User not found" });
        }
        console.log("usersRoute.js: User deleted successfully");
        res.send({ message: "usersRoute.js: User deleted successfully" });
    } catch (error) {
        console.error("usersRoute.js: There was an error deleting the user", error);
        res.status(500).send({ message: "usersRoute.js: Server error" });
    }
});

// Delete cart from user
router.delete("/:id/cart", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: "usersRoute.js: User not found" });
    }
    try {
        user.cart = [];
        await User.findByIdAndUpdate(req.params.id, user);
        return res.send({ message: "usersRoute.js: Cart deleted successfully" });
    } catch (error) {
        console.error("usersRoute.js: There was an error deleting the cart", error);
        res.status(500).send({ message: "usersRoute.js: Server error" });
    }
});

router.post("/:id/cart", async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log("Usuario agregando pelicula a carrito: ", user);
    console.log("Carrito del usuario anterior: ", user.cart);
    if (!user) {
        return res.status(404).send({ message: "usersRoute.js: User not found" });
    }
    console.log("Orden a agregar: ", req.body);
    const order = req.body;
    // Create a new order
    const newOrder = new Order(order);
    console.log("Orden creada: ", newOrder);
    // Add the order to the user's cart
    user.cart.push(newOrder);
    console.log("Carrito del usuario posterior: ", user.cart);
    // Save the user to database
    await User.findByIdAndUpdate(req.params.id, user);
    try {
        return res.send({ message: "usersRoute.js: Order added to cart successfully" });
    } catch (error) {
        console.error("usersRoute.js: There was an error adding the order to the cart", error);
        res.status(500).send({ message: "usersRoute.js: Server error" });
    }
});

router.get("/:id/cart", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: "usersRoute.js: User not found" });
    }
    try {
        return res.send(user.cart);
    } catch (error) {
        console.error("usersRoute.js: There was an error getting the cart", error);
        res.status(500).send({ message: "usersRoute.js: Server error" });
    }
});

router.get("/:id/pastOrders", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: "usersRoute.js: User not found" });
    }
    try {
        return res.send(user.pastOrders);
    } catch (error) {
        console.error("usersRoute.js: There was an error getting the past orders", error);
        res.status(500).send({ message: "usersRoute.js: Server error" });
    }
});

router.post("/:id/pastOrders", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: "usersRoute.js: User not found" });
    }
    const cart = req.body;
    user.pastOrders.push(cart);
    await User.findByIdAndUpdate(req.params.id, user);
    try {
        return res.send({ message: "usersRoute.js: Orders added successfully" });
    } catch (error) {
        console.error("usersRoute.js: There was an error adding the order", error);
        res.status(500).send({ message: "usersRoute.js: Server error" });
    }
});

// Profile page
router.get('/profile', (req, res) => res.render('profileView'));

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let cart = [];
    let pastOrders = [];
    let errors = [];

    //check required fields
    if (!email || !name || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields.' });
    }

    // check passwords match
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match.' });
    }

    //check password length
    if (password.length < 8 || password.length > 16) {
        errors.push({ msg: 'Passwords should be 8-16 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                        cart,
                        pastOrders
                    });
                    //hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then(user => {
                                    req.login(user, function (err) {
                                        if (err) { return next(err); }
                                        return res.redirect('/users/profile');
                                    });
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '../users/profile',
        failureRedirect: '../',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
})

module.exports = router;