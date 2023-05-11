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
    await Movie.findByIdAndDelete(movieId);
    res.send({ message: "Movie deleted successfully" });
});

router.get("/codes", async (req, res) => {
    const discountCodes = await DiscountCode.find();
	res.send(discountCodes);
});

router.put("/codes/:id", async (req, res) => {
    const discountCodeId = req.params.id;
    const discountCode = req.body;
    await DiscountCode.findByIdAndUpdate(discountCodeId, discountCode);
    res.send({ message: "Discount code updated successfully" });
});

router.delete("/codes/:id", async (req, res) => {
    const discountCodeId = req.params.id;
    await DiscountCode.findByIdAndDelete(discountCodeId);
    res.send({ message: "Discount code deleted successfully" });
});

module.exports = router