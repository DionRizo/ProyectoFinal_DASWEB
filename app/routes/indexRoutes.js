const express = require("express");
const Movie = require("../models/Movie");
const router = express.Router();

// Get all movies
router.get("/movies", async (req, res) => {
	const movies = await Movie.find();
	res.send(movies);
});

module.exports = router