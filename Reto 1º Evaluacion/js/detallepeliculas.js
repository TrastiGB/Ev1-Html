const idPelicula = localStorage.getItem('idPelicula');

function fetchInfoPelicula() {
  // Obtiene los datos de la película
  fetch(`https://localhost:7103/Sesion/sesionesPelicula/${idPelicula}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la película');
      }
      return response.json();
    })
    .then(data => {
      mostrarPelicula(data[0].pelicula); // Se asume que la primera sesión tiene la información de la película
      mostrarSesiones(data); // Se pasa el array completo de sesiones
    })
    .catch(error => console.error('Error al obtener la información de la película:', error));
}

function mostrarPelicula(pelicula) {
  const mainContent = document.getElementById('main-content');

  mainContent.innerHTML = `
<div class="movie">
  <!-- Banner -->
  <div class="movie__banner" style="background-image: url('../img/banners/${pelicula.imagenBannerUrl}')">
    <div class="movie__banner-overlay"></div>
  </div>

  <!-- Detalles -->
  <section class="movie__details">
    <!-- Póster -->
    <div class="movie__poster">
      <img src="../img/img_normales/${pelicula.imagenPequeniaUrl}" alt="${pelicula.nombre}" class="movie__poster-img">
    </div>
    <!-- Información -->
    <div class="movie__info">
      <div class="movie__info__tittle__rating">
        <h1 class="movie__info__tittle__rating__title">${pelicula.nombre}</h1>
        <div class="movie__info__tittle__rating__rating">
          <span class="rating-icon">⭐</span>
          <span class="movie__info__rating-score">${pelicula.valoracion}</span>
        </div>
      </div>
      <h2 class="movie__info__overview-title">Duración:</h2>
      <p class="movie__info__overview">${pelicula.duracion} minutos</p>
      <h2 class="movie__info__overview-title">Descripción:</h2>
      <p class="movie__info__overview">${pelicula.descripcion}</p>
    </div>
    <div class="sesiones__comprar">
      <button class="movie__info__ticket-btn">Buy Tickets</button>
    </div>
  </section>
</div>
  `;
}

function mostrarSesiones(sesiones) {
  const mainContent = document.getElementById('main-content');

  // Crear un nuevo div para las sesiones
  const sesionesDiv = document.createElement('div');
  sesionesDiv.className = 'sesiones';

  // Agregar título
  const sesionesTitulo = document.createElement('h2');
  sesionesTitulo.textContent = 'Sesiones disponibles:';
  sesionesDiv.appendChild(sesionesTitulo);

  // Crear lista de sesiones
  sesiones.forEach(sesion => {
    const sesionCard = document.createElement('div');
    sesionCard.className = 'sesion-card';

    sesionCard.innerHTML = `

      <button class="movie__info__ticket-btn"onclick="irAComprar(${sesion.id})">
      <p><strong>Fecha Inicio:</strong> ${new Date(sesion.fechaInicio).toLocaleString()}</p>
      </button>
    `;

    sesionesDiv.appendChild(sesionCard);
  });

  // Añadir el div de sesiones al mainContent
  mainContent.appendChild(sesionesDiv);
}

// Función para manejar la selección de una sesión
function irAComprar(idSesion) {
  localStorage.setItem('idSesion', idSesion);
  window.location.href = 'reservaasiento.html'; // Cambiar según tu ruta
}

document.addEventListener('DOMContentLoaded', () => {
  fetchInfoPelicula();
});
