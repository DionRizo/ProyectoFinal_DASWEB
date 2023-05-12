// Las siguientes funciones son para el funcionamiento de la pagina de peliculas,
// donde le permite al usuario ver las peliculas que hay en la base de datos y ver la informacion de cada una de ellas.

document.addEventListener('DOMContentLoaded', function () {
    var modalPelicula = document.getElementById('modalPelicula');
    var modalPeliculaLabel = document.getElementById('modalPeliculaLabel');
    var modalTitulo = document.getElementById('modal-titulo');
    var modalSinopsis = document.getElementById('modal-sinopsis');
    var modalDirector = document.getElementById('modal-director');
    var modalActores = document.getElementById('modal-actores');
    var modalGenero = document.getElementById('modal-generos');
    var modalAño = document.getElementById('modal-año');
    var modalVideo = document.getElementById('modal-video');

    modalPelicula.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var titulo = button.getAttribute('data-titulo');
        var sinopsis = button.getAttribute('data-sinopsis');
        var director = button.getAttribute('data-director');
        var actores = button.getAttribute('data-actores');
        var genero = button.getAttribute('data-generos');
        var año = button.getAttribute('data-año');
        var video = button.getAttribute('data-video');
        modalVideo.src = video;
        modalPeliculaLabel.textContent = titulo;
        modalTitulo.textContent = titulo;
        modalSinopsis.textContent = sinopsis;
        modalDirector.textContent = director;
        modalActores.textContent = actores;
        modalGenero.textContent = genero;
        modalAño.textContent = año;
    });
});