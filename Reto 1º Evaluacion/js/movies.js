// Función para realizar la llamada a la API y obtener las películas
function fetchPeliculas() {
    fetch('https://localhost:7103/Pelicula')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            mostrarPeliculas(data); // Llama a la función para mostrar las cartas
        })
        .catch(error => console.error('Error al obtener películas:', error));
}

// Función para generar y mostrar las cartas de las películas
function mostrarPeliculas(peliculas) {
    console.log(peliculas)
    const moviesContainer = document.querySelector('.movies__container');
    moviesContainer.innerHTML = '';

    peliculas.forEach(pelicula => {
        const peliculaHTML = `
            <div class="movie-card">
                <div class="movie-card__imagen__estandar">
                <img src="../img/img_normales/${pelicula.imagenPequeniaUrl}" alt="${pelicula.nombre}" class="movie-card__image">
                </div>
                <h3 class="movie-card__title">${pelicula.nombre}</h3>
                <button class="movie-card__button" onclick="verMasInformacion('${pelicula.id}')">Más Información</button>
            </div>
        `;
        moviesContainer.innerHTML += peliculaHTML; // Añade la carta al contenedor
    });
}

// Función para redirigir a la página de más información
function verMasInformacion(movieId) {
    window.location.href = `/movie-details.html?id=${movieId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPeliculas();
});
