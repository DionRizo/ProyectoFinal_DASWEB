const express = require("express");
const StoreLocation = require("../models/StoreLocation");
const router = express.Router();

// Get all movies
router.get("/locations", async (req, res) => {
	const locations = await StoreLocation.find();
	console.log("storesRoutes.js: enviando todas las tiendas en la base de datos");
	res.send(locations);
});

module.exports = router