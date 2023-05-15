async function renderMovies() {
    const response = await fetch("/movies");
    const movies = await response.json();

    const moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = "";

    for (const movie of movies) {
        const row = addMovieRow(movie);
        moviesContainer.appendChild(row);
    }
    console.log("moviesAdminController.js: Se han cargado las películas satisfactoriamente")
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
    const tr = createElement("tr", { "id": movie._id });

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

    const btnEdit = createElement("button", { type: "button", class: "btn btn-primary" });
    const iconEdit = createElement("i", { class: "bi bi-pencil-fill" });
    btnEdit.appendChild(iconEdit);

    const btnDelete = createElement("button", { type: "button", class: "btn btn-danger" });
    const iconDelete = createElement("i", { class: "bi bi-x-lg" });
    btnDelete.appendChild(iconDelete);

    const tdButtons = createElement("td");
    tdButtons.appendChild(btnEdit);
    tdButtons.appendChild(btnDelete);

    btnEdit.addEventListener('click', () => {
        editMovie(movie);
    });

    btnDelete.addEventListener('click', () => {
        deleteMovie(movie);
    });

    const elements = [tdPoster, tdTitle, tdYear, tdDirector, tdActors, tdGenres, tdSynopsis, tdTrailerUrl, tdButtons];
    elements.forEach((element) => {
        tr.appendChild(element);
    });

    return tr;
}

async function addMovieToDb(movie) {
    const addApiUrl = '/movies/new';
    try {
        const response = await fetch(addApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        });

        if (response.ok) {
            console.log('moviesAdminController.js: Se agregó la película satisfactoriamente');
            renderMovies();
        } else {
            console.error('moviesAdminController.js: Error al agregar la película');
        }
    } catch (error) {
        console.error('moviesAdminController.js - Error al agregar la película:', error);
    }
}

function addMovie() {
    const newMovie = {
        posterUrl: document.getElementById('addMoviePosterUrl').value,
        title: document.getElementById('addMovieTitle').value,
        year: document.getElementById('addMovieYear').value,
        director: document.getElementById('addMovieDirector').value,
        actors: document.getElementById('addMovieActors').value,
        genres: document.getElementById('addMovieGenres').value,
        synopsis: document.getElementById('addMovieSynopsis').value,
        trailerUrl: document.getElementById('addMovieTrailerUrl').value,
    };
    console.log(newMovie);
    addMovieToDb(newMovie);
}

async function updateMovieInDB(movie) {
    const updateApiUrl = `/movies/${movie._id}`;
    try {
        const response = await fetch(updateApiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        });

        if (response.ok) {
            console.log('moviesAdminController.js: Se actualizó la película satisfactoriamente');
            renderMovies();
        } else {
            console.error('moviesAdminController.js: Error al actualizar la película');
        }
    } catch (error) {
        console.error('moviesAdminController.js - Error al actualizar la película:', error);
    }
}

function editMovie(movie) {
    const editMovieModal = new bootstrap.Modal(document.getElementById('movieEditionModal'));
    const saveEditMovieButton = document.getElementById('confirmMovieEdit');

    document.getElementById('editMovieId').value = movie._id;
    document.getElementById('editMoviePosterUrl').value = movie.posterUrl;
    document.getElementById('editMovieTitle').value = movie.title;
    document.getElementById('editMovieYear').value = movie.year;
    document.getElementById('editMovieDirector').value = movie.director;
    document.getElementById('editMovieActors').value = movie.actors;
    document.getElementById('editMovieGenres').value = movie.genres;
    document.getElementById('editMovieSynopsis').value = movie.synopsis;
    document.getElementById('editMovieTrailerUrl').value = movie.trailerUrl;

    function onSave() {
        const updatedMovie = {
            _id: document.getElementById('editMovieId').value,
            posterUrl: document.getElementById('editMoviePosterUrl').value,
            title: document.getElementById('editMovieTitle').value,
            year: document.getElementById('editMovieYear').value,
            director: document.getElementById('editMovieDirector').value,
            actors: document.getElementById('editMovieActors').value,
            genres: document.getElementById('editMovieGenres').value,
            synopsis: document.getElementById('editMovieSynopsis').value,
            trailerUrl: document.getElementById('editMovieTrailerUrl').value,
        };
        console.log('moviesAdminController.js: Actualizando película...')
        updateMovieInDB(updatedMovie);
        saveEditMovieButton.removeEventListener('click', onSave);
        editMovieModal.hide();
    }

    saveEditMovieButton.addEventListener('click', onSave);
    editMovieModal.show();
}

async function deleteMovieFromDB(movieId) {
    const deleteApiUrl = `/movies/${movieId}`;

    try {
        const response = await fetch(deleteApiUrl, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('moviesAdminController.js: Película eliminada satisfactoriamente');
            renderMovies();
        } else {
            console.log('moviesAdminController.js: Error al eliminar la película');
        }
    } catch (error) {
        console.log('moviesAdminController.js: Error al intentar eliminar la película');
        console.error(error);
    }
}

function deleteMovie(movie) {
    const confirmationModal = new bootstrap.Modal(document.getElementById('movieDeletionModal'));
    const confirmDeleteButton = document.getElementById('confirmMovieDeletion');

    function onConfirm() {
        console.log('moviesAdminController.js: Eliminando película...');
        deleteMovieFromDB(movie._id);
        confirmDeleteButton.removeEventListener('click', onConfirm);
        confirmationModal.hide();
    }

    confirmDeleteButton.addEventListener('click', onConfirm);
    confirmationModal.show();
}

document.addEventListener("DOMContentLoaded", () => {
    const addMovieButton = document.getElementById('confirmMovieAdd');
    addMovieButton.addEventListener('click', addMovie);
    console.log("moviesAdminController.js: La página está cargada");
    console.log("moviesAdminController.js: Cargando películas...");
    renderMovies();
});
