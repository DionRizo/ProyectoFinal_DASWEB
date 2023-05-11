const express = require("express");
const Movie = require("../models/Movie");
const DiscountCode = require("../models/DiscountCode");
const router = express.Router();

router.get("/movies", async (req, res) => {
    const movies = await Movie.find();
	res.send(movies);
});

router.get("/codes", async (req, res) => {
    const discountCodes = await DiscountCode.find();
	res.send(discountCodes);
});

module.exports = router