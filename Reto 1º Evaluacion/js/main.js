function ImagenCarousel1(imageSrc) {
    document.getElementById("mainImage").src = imageSrc;
}

// Cambia la imagen principal y el texto del segundo carrusel
function changeTextCarouselImage(imageSrc, text) {
    document.getElementById("textCarouselMainImage").src = imageSrc;
    document.getElementById("carouselText").textContent = text;
}