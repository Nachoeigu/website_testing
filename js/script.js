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
                // 1. Revisar si el usuario ya eligió un idioma antes
                const savedLang = localStorage.getItem('userLang');
                if (savedLang) {
                    switchLanguage(savedLang);
                    return; // Si ya hay una elección, no hacemos nada más
                }

                // 2. Si no hay elección, procedemos a detectar (solo en la primera visita)
                fetch('https://ip-api.com/json/?fields=countryCode')
                    .then(response => response.json())
                    .then(data => {
                        const countryCode = data.countryCode;
                        // Lista de países de habla hispana principales
                        const spanishSpeakingCountries = [
                            'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 
                            'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'ES', 'UY', 'VE'
                        ];

                        // Regla: si el país NO está en la lista, cambiamos a inglés
                        if (!spanishSpeakingCountries.includes(countryCode)) {
                            switchLanguage('en');
                        }
                        // Si está en la lista, se queda en español por defecto, no hacemos nada.
                    })
                    .catch(error => {
                        console.error("Error al detectar la geolocalización:", error);
                        // Si la API falla, la página simplemente se queda en español.
                    });
            }

            // Evento para el botón manual
            langToggle.addEventListener('click', () => {
                const newLang = currentLang === 'es' ? 'en' : 'es';
                switchLanguage(newLang);
                // Guardamos la elección del usuario para futuras visitas
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
