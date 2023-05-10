
const MovieDB = require('node-themoviedb');
let mdbApiKey = '398ac7078932175128202baf1d489b77';
const mdb = new MovieDB(mdbApiKey);

let movieSchema = mongoose.Schema({
  posterUrl: String,
  title: String,
  year: String,
  director: String,
  actors: String,
  genres: String,
  synopsis: String,
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
    for (let i = 0; i < list.data.items.length; i++) {
      console.log(list.data.items[i].id);
      const movieArgs = {
        pathParameters: {
          movie_id: list.data.items[i].id,
        },
      };
      console.log(movieArgs);
      let movie = await mdb.movie.getDetails(movieArgs);
      console.log(movie);
    }
  } catch (error) {
    console.error("Error saving the movie:", error);
  }
}

getMoviesFromList(8252582);