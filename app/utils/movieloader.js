const mongoose = require('mongoose');

const MovieDB = require('node-themoviedb');
let mdbApiKey = '398ac7078932175128202baf1d489b77';
const mdb = new MovieDB(mdbApiKey);

let movieSchema = mongoose.Schema({
    posterUrl: String,
    trailerUrl: String,
    title: String,
    year: String,
    director: String,
    actors: String,
    genres: String,
    synopsis: String,
    storeAvailability: String,
}, { collection: 'action' }); // Specify the collection name explicitly

let Movie = mongoose.model('Movie', movieSchema);

async function getMoviesFromList(listId) {
    try {
        const args = {
            pathParameters: {
                list_id: listId,
            },
        };
        const list = await mdb.list.getDetails(args);
        console.log(list);
        for (let i = 0; i < 1; i++) {
            console.log(list.data.items[i].id);
            const movieArgs = {
                pathParameters: {
                    movie_id: list.data.items[i].id,
                },
            };
            let movie = await mdb.movie.getDetails(movieArgs);
            let movieCredits = await mdb.movie.getCredits(movieArgs);
            let movieVideos = await mdb.movie.getVideos(movieArgs);
            let movieData = {
                posterUrl: "https://image.tmdb.org/t/p/w500" + movie.data.poster_path,
                trailerUrl: "https://www.youtube.com/watch?v=" + movieVideos.data.results.filter((video) => video.name === "Official Trailer")[0].key,
                title: movie.data.original_title,
                actors: movieCredits.data.cast.slice(0, 5).map((actor) => actor.name).join(", "),
                director: movieCredits.data.crew.filter((crewMember) => crewMember.job === "Director").map((director) => director.name).join(", "),
                year: movie.data.release_date.substring(0, 4),
                genres: movie.data.genres.map((genre) => genre.name).join(", "),
                synopsis: movie.data.overview,
                storeAvailability: "1,2,3"
            };
            console.log(movieData);
        }
    } catch (error) {
        console.error("Error saving the movie:", error);
    }
}

let actionMovies = getMoviesFromList(8252582);