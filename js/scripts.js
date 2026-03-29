
// === Botón volver arriba ===
(function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const SCROLL_THRESHOLD = 400;

    const toggleVisibility = () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    btn.addEventListener('click', () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });

    toggleVisibility();
})();
