function handleRentarButtonClick() {
  if (currentMovie !== null) {
    addToCart(currentMovie);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var modalPelicula = document.getElementById('modalPelicula');
  var modalPeliculaLabel = document.getElementById(
    'modalPeliculaLabel'
  );
  var modalTitulo = document.getElementById('modal-titulo');
  var modalSinopsis = document.getElementById('modal-sinopsis');
  var modalDirector = document.getElementById('modal-director');
  var modalActores = document.getElementById('modal-actores');
  var modalGenero = document.getElementById('modal-generos');
  var modalAño = document.getElementById('modal-año');
  var modalVideo = document.getElementById('modal-video');
  // Agrega el controlador de eventos al botón fuera de la función del controlador de eventos del modal
  const rentarButton = document.getElementById('rentarBtn');
  modalPelicula.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    // Extrae el ID de la película de los datos del botón
    const movieId = button.getAttribute('data-id');

    // Actualiza el atributo data-id del botón de rentar con el ID de la película
    const rentarButton = document.getElementById('rentarBtn');
    rentarButton.setAttribute('data-id', movieId);
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

    currentMovie = JSON.parse(button.getAttribute('data-movie'));

    // Guarda la película actual para usarla en el controlador de eventos del botón
    rentarButton.removeEventListener(
      'click',
      handleRentarButtonClick
    );
    // Agrega el nuevo controlador de eventos
    rentarButton.addEventListener('click', handleRentarButtonClick);
  });
});
