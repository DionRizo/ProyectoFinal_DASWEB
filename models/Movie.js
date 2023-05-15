const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    posterUrl: String,
    trailerUrl: String,
    title: String,
    year: String,
    director: String,
    actors: String,
    genres: String,
    synopsis: String,
    stock: Number,
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;