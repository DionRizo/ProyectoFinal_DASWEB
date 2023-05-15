const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie");

router.get('/', (req, res) => res.render('searchView', { url: req.originalUrl }));

router.get("/:genre/:title", async (req, res) => {
    try {
        const movies = await Movie.find();
        const genre = req.params.genre;
        const title = req.params.title;
        const result = movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
        if (!result.length) {
            console.log(`searchRoute.js: No movie found with title: ${title}`)
            return res.status(404).send({ message: `searchRoute.js: No movie found with title: ${title}` });
        }
        if (genre === "All") {
            return res.json(result);
        } 
        const filteredResult = result.filter(movie => movie.genres.toLowerCase().includes(genre.toLowerCase()));
        if (!filteredResult.length) {
            console.log(`searchRoute.js: No movie found in genre: ${genre} with title: ${title}`)
            return res.status(404).send({ message: `searchRoute.js: No movie found in genre: ${genre} with title: ${title}` });
        }
        return res.json(filteredResult);
    } catch (error) {
        console.log(`searchRoute.js: Error retrieving movie with title: ${req.params.title} and genre: ${req.params.genre}`);
        console.error(error);
        return res.status(500).send({ message: "searchRoute.js: Error retrieving movies" });
    }
});

module.exports = router;