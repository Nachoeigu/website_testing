document.addEventListener("DOMContentLoaded", function() {
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: deja de observar el elemento una vez que es visible
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // El elemento se considera visible cuando el 10% está en pantalla
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});
