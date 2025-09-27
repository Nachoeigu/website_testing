document.addEventListener("DOMContentLoaded", function() {
    
    // --- LÓGICA DE ANIMACIÓN AL HACER SCROLL ---
    try {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(element => observer.observe(element));
        }
    } catch (error) {
        console.error("Error en la animación de scroll:", error);
    }

    // --- LÓGICA DEL INTERRUPTOR DE IDIOMA (MANUAL Y AUTOMÁTICO) ---
    try {
        const langToggle = document.getElementById('lang-toggle');
        const translatableElements = document.querySelectorAll('[data-lang-es]');
        
        if (langToggle && translatableElements.length > 0) {
            let currentLang = 'es';

            // Función para cambiar el idioma en la página
            function switchLanguage(lang) {
                translatableElements.forEach(el => {
                    const text = el.dataset[`lang-${lang}`];
                    if (text) el.innerHTML = text;
                });
                document.documentElement.lang = lang;
                langToggle.textContent = langToggle.dataset[`lang-${lang}`];
                currentLang = lang;
            }

            // Función para detectar el idioma basado en la IP
            function detectAndSetLanguage() {
                const savedLang = localStorage.getItem('userLang');
                if (savedLang) {
                    switchLanguage(savedLang);
                    return;
                }

                // CORRECCIÓN: Añadimos la URL completa de la API
                fetch('https://ip-api.com/json/?fields=countryCode')
                    .then(response => response.json())
                    .then(data => {
                        const countryCode = data.countryCode;
                        const spanishSpeakingCountries = [
                            'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 
                            'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'ES', 'UY', 'VE'
                        ];
                        if (!spanishSpeakingCountries.includes(countryCode)) {
                            switchLanguage('en');
                        }
                    })
                    .catch(error => {
                        console.error("Error al detectar la geolocalización:", error);
                    });
            }

            // Evento para el botón manual
            langToggle.addEventListener('click', () => {
                const newLang = currentLang === 'es' ? 'en' : 'es';
                switchLanguage(newLang);
                localStorage.setItem('userLang', newLang);
            });

            // Iniciar la detección automática al cargar la página
            detectAndSetLanguage();
        }
    } catch (error) {
        console.error("Error en el interruptor de idioma:", error);
    }

    // --- LÓGICA DEL CARRUSEL DE TESTIMONIOS ---
    try {
        if (typeof Swiper !== 'undefined' && document.querySelector('.swiper')) {
            const swiper = new Swiper('.swiper', {
                loop: true,
                grabCursor: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: {
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }
            });
        }
    } catch (error) {
        console.error("No se pudo inicializar el carrusel Swiper:", error);
    }
});
