const express = require("express");
const Movie = require("../models/Movie");
const router = express.Router();

// Get all movies
router.get("/movies", async (req, res) => {
	const movies = await Movie.find();
	console.log("indexRoutes.js: enviando todas las películas en la base de datos");
	res.send(movies);
});

module.exports = router