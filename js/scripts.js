/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener("DOMContentLoaded", () => {
    // Código existente para los enlaces con clase 'text-gradient'
    document.querySelectorAll('.text-gradient').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Nuevo código para el botón de descarga
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.setAttribute('target', '_blank');
        downloadBtn.setAttribute('rel', 'noopener noreferrer');
    }
});

// Botón de "volver arriba"
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '↑';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.padding = '10px 15px';
scrollToTopButton.style.backgroundColor = 'var(--color-terciario)';
scrollToTopButton.style.color = 'var(--color-primario)';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.borderRadius = '50%';
scrollToTopButton.style.cursor = 'pointer';
scrollToTopButton.style.display = 'none';
scrollToTopButton.style.transition = 'opacity 0.3s ease';

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    let autoPlayInterval; // Variable para el intervalo de autoplay

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Eventos de los botones manuales

    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    if (nextButton && prevButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            stopAutoPlay(); // Detiene el autoplay cuando el usuario interactúa
            startAutoPlay(); // Reinicia el autoplay
        });

        prevButton.addEventListener("click", function () {
            prevSlide();
            stopAutoPlay(); // Detiene el autoplay cuando el usuario interactúa
            startAutoPlay(); // Reinicia el autoplay
        });
    }


    if (slides.length > 0) {
        // Iniciar autoplay cuando la página carga
        showSlide(currentIndex);
        startAutoPlay();
    }
});

