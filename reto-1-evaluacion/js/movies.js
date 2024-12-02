/* global fetch */
/* global localStorage */

function fetchCategorias() {
    fetch('http://localhost:7103/Categoria')  // Cambié a http://
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            return response.json();
        })
        .then(data => {
            generarBotonesDeCategorias(data);
        })
        .catch(error => console.error('Error al obtener categorías:', error));
}

function fetchPeliculas() {
    fetch('http://localhost:7103/Pelicula')  // Cambié a http://
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            mostrarPeliculas(data);
            configurarBuscador(data);
        })
        .catch(error => console.error('Error al obtener películas:', error));
}

function fetchPeliculasPorCategoria(categoriaId) {
    fetch(`http://localhost:7103/Pelicula/categoria/${categoriaId}`)  // Cambié a http://
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            mostrarPeliculas(data);
        })
        .catch(error => console.error('Error al obtener películas por categoría:', error));
}

function mostrarPeliculas(peliculas) {
    console.log(peliculas);
    const moviesContainer = document.querySelector('.movies__container');
    moviesContainer.innerHTML = '';

    peliculas.forEach(pelicula => {
        const peliculaHTML = `
            <div class="movie-card">
                <div class="movie-card__imagen__estandar">
                    <img src="/images/img_normales/${pelicula.imagenPequeniaUrl}" alt="${pelicula.nombre}" class="movie-card__image"> <!-- Ruta corregida a /images -->
                </div>
                <h3 class="movie-card__title">${pelicula.nombre}</h3>
                <button class="movie-card__button" onclick="verMasInformacion('${pelicula.id}')">Más Información</button>
            </div>
        `;
        moviesContainer.innerHTML += peliculaHTML;
    });
}

function generarBotonesDeCategorias(categorias) {
    const categoriesList = document.querySelector('.categories__list');
    categoriesList.innerHTML = '';

    const allButton = document.createElement('li');
    allButton.innerHTML = `<button id="0" class="categories__item">All</button>`;
    categoriesList.appendChild(allButton);

    categorias.forEach(categoria => {
        const categoriaButton = document.createElement('li');
        categoriaButton.innerHTML = `<button id="${categoria.id}" class="categories__item">${categoria.nombre}</button>`;
        categoriesList.appendChild(categoriaButton);
    });

    configurarBotonesDeCategorias();
}

function configurarBotonesDeCategorias() {
    const botonesCategorias = document.querySelectorAll('.categories__item');

    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoriaId = boton.id;
            if (categoriaId === "0") {
                fetchPeliculas();
            } else {
                fetchPeliculasPorCategoria(categoriaId);
            }
        });
    });
}

function configurarBuscador(peliculas) {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const peliculasFiltradas = peliculas.filter(pelicula =>
            pelicula.nombre.toLowerCase().includes(query)
        );
        mostrarPeliculas(peliculasFiltradas);
    });
}

function verMasInformacion(movieId) {
    localStorage.setItem('idPelicula', movieId);
    window.location.href = `/detallepelicula?id=${movieId}`;  // Ruta corregida para la redirección
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCategorias();
    fetchPeliculas();
});
