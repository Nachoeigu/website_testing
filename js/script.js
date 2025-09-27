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
        const whatsappLink = document.getElementById('whatsapp-link'); // NUEVO: Seleccionamos el link de WPP
        
        if (langToggle && translatableElements.length > 0) {
            let currentLang = 'es';

            function switchLanguage(lang) {
                // Cambia todos los textos de la página
                translatableElements.forEach(el => {
                    const text = el.dataset[`lang-${lang}`];
                    if (text) el.innerHTML = text;
                });

                // NUEVO: Cambia el link de WhatsApp dinámicamente
                if (whatsappLink) {
                    const baseHref = whatsappLink.href.split('?')[0]; // Tomamos la URL base sin el mensaje
                    const rawMessage = whatsappLink.dataset[`whatsapp-${lang}`]; // Obtenemos el mensaje del idioma actual
                    const encodedMessage = encodeURIComponent(rawMessage); // Lo codificamos para la URL
                    whatsappLink.href = `${baseHref}?text=${encodedMessage}`; // Creamos y asignamos el nuevo link
                }

                document.documentElement.lang = lang;
                langToggle.textContent = langToggle.dataset[`lang-${lang}`];
                currentLang = lang;
            }

            function detectAndSetLanguage() {
                const savedLang = localStorage.getItem('userLang');
                if (savedLang) {
                    switchLanguage(savedLang);
                    return;
                }

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
                        } else {
                            // Aseguramos que el link de WPP se configure correctamente en la primera carga
                            switchLanguage('es');
                        }
                    })
                    .catch(error => {
                        console.error("Error al detectar la geolocalización:", error);
                        // Si la API falla, configuramos el link en español por defecto
                        switchLanguage('es');
                    });
            }

            langToggle.addEventListener('click', () => {
                const newLang = currentLang === 'es' ? 'en' : 'es';
                switchLanguage(newLang);
                localStorage.setItem('userLang', newLang);
            });

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
