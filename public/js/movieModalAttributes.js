document.addEventListener('DOMContentLoaded', function () {
    var modalPelicula = document.getElementById('modalPelicula');
    var modalPeliculaLabel = document.getElementById('modalPeliculaLabel');
    var modalPeliculaIdPurchase = document.getElementById('modal-id-purchase');
    var modalPeliculaIdRental = document.getElementById('modal-id-rental');
    var modalTitulo = document.getElementById('modal-titulo');
    var modalSinopsis = document.getElementById('modal-sinopsis');
    var modalDirector = document.getElementById('modal-director');
    var modalActores = document.getElementById('modal-actores');
    var modalGenero = document.getElementById('modal-generos');
    var modalAño = document.getElementById('modal-año');
    var modalVideo = document.getElementById('modal-video');

    modalPelicula.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var movieId = button.getAttribute('data-id');
        var titulo = button.getAttribute('data-titulo');
        var sinopsis = button.getAttribute('data-sinopsis');
        var director = button.getAttribute('data-director');
        var actores = button.getAttribute('data-actores');
        var genero = button.getAttribute('data-generos');
        var año = button.getAttribute('data-año');
        var video = button.getAttribute('data-video');
        modalVideo.src = video;
        modalPeliculaIdPurchase.textContent = movieId;
        modalPeliculaIdRental.textContent = movieId;
        modalPeliculaLabel.textContent = titulo;
        modalTitulo.textContent = titulo;
        modalSinopsis.textContent = sinopsis;
        modalDirector.textContent = director;
        modalActores.textContent = actores;
        modalGenero.textContent = genero;
        modalAño.textContent = año;
    });
});