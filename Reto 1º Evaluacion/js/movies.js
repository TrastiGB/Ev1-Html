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
            mostrarPeliculas(data);
            configurarBuscador(data); // Configurar el buscador con los datos obtenidos
        })
        .catch(error => console.error('Error al obtener películas:', error));
}

// Función para realizar la llamada a la API y obtener las películas por categoría
function fetchPeliculasPorCategoria(categoria) {
    fetch(`https://localhost:7103/Pelicula/categoria/${categoria}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            mostrarPeliculas(data); // Muestra solo las películas de la categoría seleccionada
        })
        .catch(error => console.error('Error al obtener películas por categoría:', error));
}

// Función para generar y mostrar las cartas de las películas
function mostrarPeliculas(peliculas) {
    console.log(peliculas);
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

// Función para configurar el filtro por categoría
function configurarBotonesDeCategorias() {
    const botonesCategorias = document.querySelectorAll('.categories__item');

    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.textContent.trim(); // Obtiene el texto del botón como categoría
            if (categoria === "All") {
                fetchPeliculas(); // Si se selecciona "All", muestra todas las películas
            } else {
                fetchPeliculasPorCategoria(categoria); // Filtra por la categoría seleccionada
            }
        });
    });
}

// Función para filtrar y mostrar películas según el título ingresado
function configurarBuscador(peliculas) {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim(); // Convertir a minúsculas y eliminar espacios
        const peliculasFiltradas = peliculas.filter(pelicula =>
            pelicula.nombre.toLowerCase().includes(query)
        );
        mostrarPeliculas(peliculasFiltradas);
    });
}

// Función para redirigir a la página de más información
function verMasInformacion(movieId) {
    localStorage.setItem('idPelicula', movieId);
    window.location.href = `detallepelicula.html?id=${movieId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPeliculas(); // Carga todas las películas al inicio
    configurarBotonesDeCategorias(); // Configura los eventos de los botones de categoría
});
