const idPelicula = localStorage.getItem('idPelicula')
console.log(idPelicula)

function fetchInfoPelicula() {
    fetch(`https://localhost:7103/Pelicula/${idPelicula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            mostrarPelicula(data);
        })
        .catch(error => console.error('Error al obtener películas:', error));
}

function mostrarPelicula(pelicula) {
    console.log(pelicula)
    // Aquí está el contenido dinámico
    const mainContent = document.getElementById('main-content');
  
    mainContent.innerHTML = `
      <div class="movie">
        <div class="movie__banner">
          <img src="../img/banners/${pelicula.imagenBannerUrl}" alt="Movie Banner" class="movie__banner-img">
        </div>
        <section class="movie__details">
          <div class="movie__poster">
            <img src="../img/img_normales/${pelicula.imagenPequeniaUrl}" alt="${peliculas.nombre}" class="movie__poster-img">
          </div>
          <div class="movie__info">
            <h1 class="movie__title">${peliculas.nombre}</h1>
            <div class="movie__rating">
              <span>⭐</span>
              <span class="movie__rating-score">${peliculas.calificacion}</span>
            </div>
            <button class="movie__ticket-btn">Buy Tickets</button>
            <h2 class="movie__overview-title">Overview</h2>
            <p class="movie__overview">${peliculas.descripcion}</p>
          </div>
        </section>
      </div>
    `;
}
  