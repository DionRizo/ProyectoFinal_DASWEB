async function renderMovies(genre) {
    const response = await fetch("/api/movies");
    const movies = await response.json();
    // Remove all movies that do not contain genre in their genres list
    for (let i = movies.length - 1; i >= 0; i--) {
        if (!movies[i].genres.includes(genre)) {
            movies.splice(i, 1);
        }
    }
    console.log(movies);

    const moviesContainer = document.getElementById(`${genre}-movies-container`);
    moviesContainer.innerHTML = "";

    for (const movie of movies) {
        const card = createMovieCard(movie);
        moviesContainer.appendChild(card);
    }
}

function createMovieCard(movie) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const moviePosterImg = document.createElement("img");
    moviePosterImg.className = "card-img-top";
    moviePosterImg.src = movie.posterUrl;
    cardDiv.appendChild(moviePosterImg);

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    cardDiv.appendChild(cardBodyDiv);

    const movieTitleH5 = document.createElement("h5");
    movieTitleH5.className = "card-title d-flex justify-content-center";
    movieTitleH5.innerText = movie.title;
    cardBodyDiv.appendChild(movieTitleH5);
    return cardDiv;
}

document.addEventListener("DOMContentLoaded", () => {
    renderMovies("Action");
    renderMovies("Adventure");
    renderMovies("Comedy");
    renderMovies("Horror"); 
    renderMovies("Sci-Fi");
});
