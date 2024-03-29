async function renderMoviesByGenre(genre) {
    const response = await fetch("/movies");
    const movies = await response.json();
    console.log(movies);

    for (let i = movies.length - 1; i >= 0; i--) {
        if (!movies[i].genres.includes(genre)) {
            movies.splice(i, 1);
        }
    }

    const moviesContainer = document.getElementById(`${genre}-movies-container`);
    moviesContainer.innerHTML = "";

    for (const movie of movies) {
        const card = createMovieCard(movie);
        moviesContainer.appendChild(card);
    }
    console.log("indexController.js: Se han cargado las películas satisfactoriamente");
}

function createMovieCard(movie) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.setAttribute("data-bs-toggle", "modal");
    cardDiv.setAttribute("data-bs-target", "#modalPelicula");
    cardDiv.setAttribute("data-id", movie._id);
    cardDiv.setAttribute("data-titulo", movie.title);
    cardDiv.setAttribute("data-año", movie.year);
    cardDiv.setAttribute("data-director", movie.director);
    cardDiv.setAttribute("data-actores", movie.actors);
    cardDiv.setAttribute("data-generos", movie.genres);
    cardDiv.setAttribute("data-sinopsis", movie.synopsis);

    let movieTrailerUrl = movie.trailerUrl;
    movieTrailerUrl = movieTrailerUrl.replace("watch?v=", "embed/");
    cardDiv.setAttribute("data-video", movieTrailerUrl);

    const moviePosterImg = document.createElement("img");
    moviePosterImg.className = "card-img-top";
    moviePosterImg.src = movie.posterUrl;
    cardDiv.appendChild(moviePosterImg);

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body d-flex align-items-center justify-content-center";
    cardDiv.appendChild(cardBodyDiv);

    const movieTitleH5 = document.createElement("h5");
    movieTitleH5.className = "card-title text-center w-100";
    movieTitleH5.style.overflow = "hidden";
    movieTitleH5.style.textOverflow = "ellipsis";
    movieTitleH5.innerText = movie.title;
    cardBodyDiv.appendChild(movieTitleH5);
    return cardDiv;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("indexController.js: Se ha cargado la página index.hmtl");
    console.log("indexController.js: Cargando películas por género...")
    renderMoviesByGenre("Action");
    renderMoviesByGenre("Adventure");
    renderMoviesByGenre("Comedy");
    renderMoviesByGenre("Horror");
    renderMoviesByGenre("Science Fiction");
});
