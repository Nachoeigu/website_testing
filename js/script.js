document.addEventListener("DOMContentLoaded", function() {
    
    // --- LÓGICA DE ANIMACIÓN AL HACER SCROLL ---
    // Se envuelve en try...catch para que un error aquí no afecte al resto del sitio.
    try {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }
    } catch (error) {
        console.error("Error en la animación de scroll:", error);
    }

    // --- LÓGICA DEL INTERRUPTOR DE IDIOMA ---
    // Se envuelve en try...catch para proteger esta funcionalidad crítica.
    try {
        const langToggle = document.getElementById('lang-toggle');
        const translatableElements = document.querySelectorAll('[data-lang-es]');
        
        if (langToggle && translatableElements.length > 0) {
            let currentLang = 'es'; // Idioma por defecto

            function switchLanguage(lang) {
                translatableElements.forEach(el => {
                    const text = el.dataset[`lang-${lang}`];
                    if (text) {
                        el.innerHTML = text;
                    }
                });
                document.documentElement.lang = lang;
                langToggle.textContent = langToggle.dataset[`lang-${lang}`];
            }

            langToggle.addEventListener('click', () => {
                currentLang = currentLang === 'es' ? 'en' : 'es';
                switchLanguage(currentLang);
            });
        }
    } catch (error) {
        console.error("Error en el interruptor de idioma:", error);
    }

    // --- LÓGICA DEL CARRUSEL DE TESTIMONIOS ---
    // Se envuelve en try...catch para que un fallo en la librería externa no rompa el sitio.
    try {
        if (typeof Swiper !== 'undefined' && document.querySelector('.swiper')) {
            const swiper = new Swiper('.swiper', {
                loop: true,
                grabCursor: true,
                
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }
            });
        }
    } catch (error) {
        console.error("No se pudo inicializar el carrusel Swiper:", error);
    }

});
