document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const images = [
        '../img/Como_entrenar_dragon_3_E.png',
        '../img/robot_salvaje.jpg',
        '../img/smile2png.png',
        '../img/terrifier-3-4245154.png',
        '../img/Venom-The-Last-Dance.png'
    ];
    
    const mainImage = document.querySelector('.carousel__image');
    const thumbnails = document.querySelectorAll('.carousel__thumbnail');
    const arrowLeft = document.querySelector('.carousel__arrow--left');
    const arrowRight = document.querySelector('.carousel__arrow--right');

    
    const infoThumbnails = document.querySelectorAll('.info-carousel__thumbnail');
    const texts = document.querySelectorAll('.info-carousel__text');

    // Mostrar la imagen actual
    function showSlide(index) {
        currentSlide = index;
        mainImage.src = images[currentSlide];
        updateActiveThumbnail();
    }

    // Ir al siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % images.length;
        showSlide(currentSlide);
    }

    // Ir al slide anterior
    function previousSlide() {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        showSlide(currentSlide);
    }

    // Actualizar la clase activa en la miniatura
    function updateActiveThumbnail() {
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentSlide);
        });
    }

    // Eventos para las flechas
    arrowLeft.addEventListener("click", previousSlide);
    arrowRight.addEventListener("click", nextSlide);

    // Evento para cada miniatura
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => showSlide(index));
    });

    // Iniciar mostrando la primera imagen y la miniatura activa
    showSlide(currentSlide);


    

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
