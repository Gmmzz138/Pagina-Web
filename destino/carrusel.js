document.addEventListener("DOMContentLoaded", () => {
    const carruseles = document.querySelectorAll('.deslizar-paises');

    carruseles.forEach(carrusel => {
        // --- TRUCO INFINITO: Duplicamos el contenido ---
        const contenidoOriginal = carrusel.innerHTML;
        carrusel.innerHTML += contenidoOriginal; // Duplica las tarjetas

        let isDown = false;
        let startX;
        let scrollLeft;
        let animationId;
        const velocidad = 0.5; // Ajusta a tu gusto

        function step() {
            if (!isDown) {
                carrusel.scrollLeft += velocidad;

                // Si llegamos a la mitad (donde empieza el duplicado), 
                // saltamos al inicio de forma instantánea.
                if (carrusel.scrollLeft >= carrusel.scrollWidth / 2) {
                    carrusel.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(step);
        }

        animationId = requestAnimationFrame(step);

        // Pausas
        carrusel.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
        carrusel.addEventListener('mouseleave', () => {
            if (!isDown) animationId = requestAnimationFrame(step);
        });

        // Soporte para arrastre manual (Drag)
        carrusel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carrusel.offsetLeft;
            scrollLeft = carrusel.scrollLeft;
            cancelAnimationFrame(animationId);
        });

        window.addEventListener('mouseup', () => {
            isDown = false;
            animationId = requestAnimationFrame(step);
        });

        carrusel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const x = e.pageX - carrusel.offsetLeft;
            const walk = (x - startX) * 2;
            carrusel.scrollLeft = scrollLeft - walk;
        });
    });
});

// Mantener tu función original para los botones por si el usuario prefiere clics
function moverCarrusel(boton, direccion) {
    const carrusel = boton.parentElement.querySelector('.deslizar-paises');
    const anchoTarjeta = carrusel.querySelector('.diseñtarjet-paises').offsetWidth;
    carrusel.scrollBy({
        left: (anchoTarjeta + 30) * direccion,
        behavior: 'smooth'
    });
}