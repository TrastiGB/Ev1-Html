document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    let peliculas = [];

    const carouselContainer = document.querySelector('#carousel-container');

    function getTop5Peliculas() {
        fetch('')
            .then(response => response.json())
            .then(data => {
                peliculas = data; 
                generateCarousel();
                showSlide(currentSlide);
            })
            .catch(error => console.error('Error al obtener películas:', error));
    }

    function generateCarousel() {

        // Crear el HTML del carrusel principal y miniaturas
        let mainImageHTML = `
            <button class="carousel__arrow carousel__arrow--left" onclick="previousSlide()">&#10094;</button>
            <img src="${peliculas[0].ImagenBannerUrl}" alt="${peliculas[0].Nombre}" class="carousel__image">
            <button class="carousel__arrow carousel__arrow--right" onclick="nextSlide()">&#10095;</button>
        `;

        let thumbnailsHTML = peliculas.map((pelicula, index) => `
            <img src="${pelicula.ImagenBannerUrl}" alt="${pelicula.Nombre}" 
                 onclick="showSlide(${index})" class="carousel__thumbnail">
        `).join('');

        // Insertar el HTML generado en el contenedor
        carouselContainer.innerHTML = `
            <div class="carousel__main">${mainImageHTML}</div>
            <div class="carousel__thumbnails">${thumbnailsHTML}</div>
        `;
    }

    function showSlide(index) {
        currentSlide = index;
        const mainImage = document.querySelector('.carousel__image');
        mainImage.src = peliculas[currentSlide].ImagenBannerUrl;

        updateActiveThumbnail();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % peliculas.length;
        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + peliculas.length) % peliculas.length;
        showSlide(currentSlide);
    }

    function updateActiveThumbnail() {
        const thumbnails = document.querySelectorAll('.carousel__thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentSlide);
        });
    }

    // Inicializar el carrusel llamando a la API para obtener las películas
    getTop5Peliculas();

    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.showSlide = showSlide;
});



    

    function showInfo(category) {
        // Ocultar todos los textos
        texts.forEach(text => text.classList.remove('active'));
        // Quitar clase activa de todas las miniaturas
        infoThumbnails.forEach(thumb => thumb.classList.remove('active'));
        // Mostrar texto correspondiente
        document.getElementById(`info-${category}`).classList.add('active');
        // Agregar clase activa a la miniatura seleccionada
        event.target.classList.add('active');
    }
    
    // Configurar evento de clic en cada miniatura
    infoThumbnails.forEach(thumb => {
        thumb.addEventListener('click', event => {
            const category = event.target.alt;
            showInfo(category);
            event.stopPropagation(); // Evita que el clic se propague al documento
        });
    });
    
    // Detectar clics fuera de las miniaturas para ocultar el texto y restaurar el tamaño
    document.addEventListener('click', () => {
        // Ocultar todos los textos
        texts.forEach(text => text.classList.remove('active'));
        // Quitar clase activa de todas las miniaturas
        infoThumbnails.forEach(thumb => thumb.classList.remove('active'));
    });
