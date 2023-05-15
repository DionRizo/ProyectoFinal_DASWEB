const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Movie = require("../models/Movie");

router.use(bodyParser.json());

// Homepage
router.get('/', (req, res) => res.render('indexView', { url: req.originalUrl }));

// GET movies
router.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log("indexRoute.js: Sending movies from database");
        res.send(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "indexRoute.js: Error retrieving movies from the database" });
    }
});

// GET movie by id
router.get("/movies/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            console.log(`indexRoute.js: No movie found with id: ${movieId}`);
            return res.status(404).send({ message: `indexRoute.js: No movie found with id: ${movieId}` });
        }
        console.log(`indexRoute.js: Sending movie with id: ${movieId}`);
        res.send(movie);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "indexRoute.js: Error retrieving movie from the database" });
    }
});

// POST new movie
router.post("/movies/new", async (req, res) => {
    try {
        const movie = req.body;
        await Movie.create(movie);
        console.log("indexRoute.js: Movie added successfully");
        res.send({ message: "indexRoute.js: Movie added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "indexRoute.js: Error creating movie in the database" });
    }
});

// PUT update movie
router.put("/movies/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, movie, { new: true });
        if (!updatedMovie) {
            return res.status(404).send({ message: "indexRoute.js: No movie found with this id" });
        }
        console.log("indexRoute.js: Movie deleted successfully");
        res.send({ message: "indexRoute.js: Movie deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "indexRoute.js: Error updating movie in the database" });
    }
});

// DELETE movie
router.delete("/movies/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).send({ message: "indexRoute.js: No movie found with this id" });
        }
        console.log("indexRoute.js: Movie deleted successfully");
        res.send({ message: "indexRoute.js: Movie deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "indexRoute.js: Error deleting movie from the database" });
    }
});

// Users profile
router.get('/users/profile', ensureAuthenticated, (req, res) =>
    res.render('profileView', {
        name: req.user.name,
        url: req.originalUrl
    }));

module.exports = router;