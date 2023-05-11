async function renderMovies() {
    const response = await fetch("/admin/movies");
    const movies = await response.json();

    const moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = "";

    for (const movie of movies) {
        const row = addMovieRow(movie);
        moviesContainer.appendChild(row);
    }
}

function createElement(tag, attributes = {}, innerHTML = "") {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    element.innerHTML = innerHTML;
    return element;
}

function addMovieRow(movie) {
    const tr = createElement("tr");

    const tdPoster = createElement("td");
    const imgPoster = createElement("img", { src: movie.posterUrl, style: "width: 120px;" });
    tdPoster.appendChild(imgPoster);

    const tdTitle = createElement("td", {}, movie.title);
    const tdYear = createElement("td", {}, movie.year);
    const tdDirector = createElement("td", {}, movie.director);
    const tdActors = createElement("td", {}, movie.actors);
    const tdGenres = createElement("td", {}, movie.genres);
    const tdSynopsis = createElement("td", {}, movie.synopsis);
    const tdTrailerUrl = createElement("td", {}, movie.trailerUrl);

    const tdAvailability = createElement("td", {}, movie.storeAvailability);

    const btnEdit = createElement("button", { type: "button", class: "btn btn-primary" });
    const iconEdit = createElement("i", { class: "bi bi-pencil-fill" });
    btnEdit.appendChild(iconEdit);

    const btnDelete = createElement("button", { type: "button", class: "btn btn-danger" });
    const iconDelete = createElement("i", { class: "bi bi-x-lg" });
    btnDelete.appendChild(iconDelete);

    const tdButtons = createElement("td");
    tdButtons.appendChild(btnEdit);
    tdButtons.appendChild(btnDelete);

    btnDelete.addEventListener('click', () => {
        deleteMovie(movie);
    });

    const elements = [tdPoster, tdTitle, tdYear, tdDirector, tdActors, tdGenres, tdSynopsis, tdTrailerUrl, tdAvailability, tdButtons];
    elements.forEach((element) => {
        tr.appendChild(element);
    });

    return tr;
}

async function deleteMovieFromDB(movieId) {
    const deleteApiUrl = `/admin/movies/${movieId}`;

    try {
        const response = await fetch(deleteApiUrl, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Movie deleted successfully');
            renderMovies();
        } else {
            console.error('Failed to delete movie');
        }
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
}

function deleteMovie(movie) {
    const confirmationModal = new bootstrap.Modal(document.getElementById('deletionModal'));
    const confirmDeleteButton = document.getElementById('confirmDeletion');

    function onConfirm() {
        deleteMovieFromDB(movie._id);
        confirmDeleteButton.removeEventListener('click', onConfirm);
        confirmationModal.hide();
    }

    confirmDeleteButton.addEventListener('click', onConfirm);
    confirmationModal.show();
}


document.addEventListener("DOMContentLoaded", () => {
    renderMovies();
});
