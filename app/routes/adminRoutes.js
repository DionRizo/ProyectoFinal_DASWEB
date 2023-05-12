const express = require("express");
const Movie = require("../models/Movie");
const DiscountCode = require("../models/DiscountCode");
const router = express.Router();

router.get("/movies", async (req, res) => {
    const movies = await Movie.find();
    console.log("adminRoutes.js: enviando todas las películas en la base de datos");
	res.send(movies);
});

router.put("/movies/:id", async (req, res) => {
    const movieId = req.params.id;
    const movie = req.body;
    await Movie.findByIdAndUpdate(movieId, movie);
    console.log("adminRoutes.js: Película actualizada satisfacoriamente");
    res.send({ message: "Película actualizada satisfactoriamente" });
});

router.delete("/movies/:id", async (req, res) => {
    const movieId = req.params.id;
    await Movie.findByIdAndDelete(movieId);
    console.log("adminRoutes.js: Película eliminada satisfactoriamente");
    res.send({ message: "Película eliminada satisfactoriamente" });
});

router.get("/codes", async (req, res) => {
    const discountCodes = await DiscountCode.find();
    console.log("adminRoutes.js: enviando todos los códigos de descuento en la base de datos");
	res.send(discountCodes);
});

router.put("/codes/:id", async (req, res) => {
    const discountCodeId = req.params.id;
    const discountCode = req.body;
    await DiscountCode.findByIdAndUpdate(discountCodeId, discountCode);
    console.log("adminRoutes.js: Código de descuento actualizado satisfactoriamente");
    res.send({ message: "Código de descuento actualizado satisfactoriamente" });
});

router.delete("/codes/:id", async (req, res) => {
    const discountCodeId = req.params.id;
    await DiscountCode.findByIdAndDelete(discountCodeId);
    console.log("adminRoutes.js: Código de descuento eliminado satisfactoriamente");
    res.send({ message: "Código de descuento eliminado satisfactoriamente" });
});

module.exports = router