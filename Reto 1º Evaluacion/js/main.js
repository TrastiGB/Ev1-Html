let aPeliculas = []; // Array global para las películas

document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;

    // Función para obtener las películas desde la API
    function fetchPeliculas() {
        fetch('https://localhost:7103/Pelicula/top5')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                return response.json();
            })
            .then(data => {
                console.log('a')
                aPeliculas = data; // Guardar las películas obtenidas
                mostrarCarrousel(aPeliculas); // Mostrar el carrusel con los datos
            })
            .catch(error => console.error('Error al obtener películas:', error));
    }

    // Función para mostrar el carrusel dinámicamente
    function mostrarCarrousel(peliculas) {
        console.log(peliculas)
        const carouselContainer = document.querySelector('.carousel');

        // Construir la imagen principal con la primera película
        let mainImageHTML = `
            <div class="carousel__main">
                <button class="carousel__arrow carousel__arrow--left" onclick="previousSlide()">&#10094;</button>
                <img src="../img/banners/${peliculas[0].imagenBannerUrl}" alt="${peliculas[0].nombre}" class="carousel__image">
                <button class="carousel__arrow carousel__arrow--right" onclick="nextSlide()">&#10095;</button>
            </div>
        `;

        // Construir las miniaturas
        let thumbnailsHTML = `<div class="carousel__thumbnails">`;
        peliculas.forEach((pelicula, index) => {
            thumbnailsHTML += `
                <img src=../img/banners/${pelicula.imagenBannerUrl} alt="${pelicula.nombre}" 
                     onclick="showSlide(${index})" class="carousel__thumbnail">
            `;
        });
        thumbnailsHTML += `</div>`;

        // Asignar el HTML construido al contenedor del carrusel
        carouselContainer.innerHTML = mainImageHTML + thumbnailsHTML;
    }

    // Función para mostrar el slide actual
    function showSlide(index) {
        currentSlide = index;
        const mainImage = document.querySelector('.carousel__image');
        mainImage.src = aPeliculas[currentSlide].ImagenBannerUrl; // Actualizar la imagen principal
        updateActiveThumbnail(); // Actualizar la miniatura activa
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % aPeliculas.length;
        showSlide(currentSlide);
    }

    // Función para retroceder al slide anterior
    function previousSlide() {
        currentSlide = (currentSlide - 1 + aPeliculas.length) % aPeliculas.length;
        showSlide(currentSlide);
    }

    // Función para actualizar la miniatura activa
    function updateActiveThumbnail() {
        const thumbnails = document.querySelectorAll('.carousel__thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentSlide);
        });
    }

    // Llamar a la función para obtener las películas
    fetchPeliculas();

    // Hacer las funciones de navegación globales
    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.showSlide = showSlide;

        //constantes necesarias para segundo

        const infoThumbnails = document.querySelectorAll('.info-carousel__thumbnail');
        const texts = document.querySelectorAll('.info-carousel__text');
    
    
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
    
});