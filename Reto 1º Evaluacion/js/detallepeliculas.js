const idPelicula = localStorage.getItem('idPelicula');

function fetchInfoPelicula() {
  fetch(`https://localhost:7103/Sesion/sesionesPelicula/${idPelicula}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la película');
      }
      return response.json();
    })
    .then(data => {
      mostrarPelicula(data[0].pelicula);
      setupMostrarSesiones(data);
    })
    .catch(error => console.error('Error al obtener la información de la película:', error));
}

function mostrarPelicula(pelicula) {
  const mainContent = document.getElementById('main-content');

  mainContent.innerHTML = `
    <div class="movie__banner" style="background-image: url('../img/banners/${pelicula.imagenBannerUrl}')">
      <div class="movie__banner-overlay"></div>
      <div class="movie__content">
        <div class="movie__poster">
          <img src="../img/img_normales/${pelicula.imagenPequeniaUrl}" alt="${pelicula.nombre}">
        </div>
        <div class="movie__info">
          <h1>${pelicula.nombre}</h1>
          <div class="rating">
            <span class="rating-icon">⭐</span>
            <span>${pelicula.valoracion}</span>
          </div>
          <p><strong>Duración:</strong> ${pelicula.duracion} minutos</p>
          <p class="description"><strong>Descripción:</strong> ${pelicula.descripcion}</p>
          <button class="sessions-button" onclick="toggleSesiones()">Sesiones Disponibles</button>
          <div class="sessions-container hidden"></div>
        </div>
      </div>
    </div>
  `;
}

function setupMostrarSesiones(sesiones) {
  const container = document.querySelector('.sessions-container');

  sesiones.forEach(sesion => {
    const card = document.createElement('div');
    card.className = 'session-card';
    card.innerHTML = `
      <p><strong>Fecha Inicio:</strong> ${new Date(sesion.fechaInicio).toLocaleString()}</p>
      <button onclick="irAComprar(${sesion.id})">Comprar</button>
    `;
    container.appendChild(card);
  });
}

function toggleSesiones() {
  const container = document.querySelector('.sessions-container');
  container.classList.toggle('hidden');
}

function irAComprar(idSesion) {
  localStorage.setItem('idSesion', idSesion);
  window.location.href = 'reservaasiento.html';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchInfoPelicula();
});
