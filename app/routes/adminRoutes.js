const express = require("express");
const Movie = require("../models/Movie");
const DiscountCode = require("../models/DiscountCode");
const router = express.Router();

router.get("/movies", async (req, res) => {
    const movies = await Movie.find();
	res.send(movies);
});

router.put("/movies/:id", async (req, res) => {
    const movieId = req.params.id;
    const movie = req.body;
    await Movie.findByIdAndUpdate(movieId, movie);
    res.send({ message: "Movie updated successfully" });
});

router.delete("/movies/:id", async (req, res) => {
    const movieId = req.params.id;
    // delete movie from object id _id in database
    await Movie.findByIdAndDelete(movieId);
    res.send({ message: "Movie deleted successfully" });
});

router.get("/codes", async (req, res) => {
    const discountCodes = await DiscountCode.find();
	res.send(discountCodes);
});

module.exports = router