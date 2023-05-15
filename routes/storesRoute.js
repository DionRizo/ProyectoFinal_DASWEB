const express = require('express');
const router = express.Router();
const StoreLocation = require("../models/StoreLocation");

// Stores page
router.get('/', (req, res) => res.render('storesView', { url: req.originalUrl }));

router.get("/locations", async (req, res) => {
    try {
        const locations = await StoreLocation.find();
        console.log("storesRoutes.js: sending stores");
        res.send(locations);
    } catch (error) {
        console.log("storesRoutes.js: Error retrieving store locations");
        console.error(error);
        res.status(500).send({ message: "storesRoute.js: Error retrieving store locations" });
    }
});


module.exports = router;