async function renderMovies() {
    const response = await fetch("/api/movies");
    const movies = await response.json();

    const moviesContainer = document.getElementById("action-movies-container");

    for (const movie of movies) {
        const card = createMovieCard(movie);
        moviesContainer.appendChild(card);
    }
}

function createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("h3");
    title.textContent = movie.title;
    card.appendChild(title);
    return card;
}

document.addEventListener("DOMContentLoaded", renderMovies);
