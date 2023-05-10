const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const movieSchema = new Schema({
    posterUrl: String,
    trailerUrl: String,
    title: String,
    year: String,
    director: String,
    actors: String,
    genres: String,
    synopsis: String,
    storeAvailability: String,
});

module.exports = model('Movie', movieSchema);