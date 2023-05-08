// Las siguientes funciones son para el funcionamiento de la pagina de peliculas,
// donde le permite al usuario ver las peliculas que hay en la base de datos y ver la informacion de cada una de ellas.

document.addEventListener('DOMContentLoaded', function () {
  var modalPelicula = document.getElementById('modalPelicula');
  var modalPeliculaLabel = document.getElementById('modalPeliculaLabel');
  var modalImagen = document.getElementById('modal-imagen');
  var modalTitulo = document.getElementById('modal-titulo');
  var modalSinopsis = document.getElementById('modal-sinopsis');
  var modalDirector = document.getElementById('modal-director');
  var modalActores = document.getElementById('modal-actores');
  var modalGenero = document.getElementById('modal-genero');
  var modalAño = document.getElementById('modal-año');

  modalPelicula.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var titulo = button.getAttribute('data-titulo');
    var sinopsis = button.getAttribute('data-sinopsis');
    var director = button.getAttribute('data-director');
    var actores = button.getAttribute('data-actores');
    var genero = button.getAttribute('data-genero');
    var imagen = button.getAttribute('data-imagen');
    var año = button.getAttribute('data-año');

    modalPeliculaLabel.textContent = titulo;
    modalImagen.src = imagen;
    modalTitulo.textContent = titulo;
    modalSinopsis.textContent = sinopsis;
    modalDirector.textContent = director;
    modalActores.textContent = actores;
    modalGenero.textContent = genero;
    modalAño.textContent = año;
  });
});