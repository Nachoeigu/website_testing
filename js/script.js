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

    // --- LÓGICA DEL INTERRUPTOR DE IDIOMA (VERSIÓN MANUAL Y SIMPLIFICADA) ---
    try {
        const langToggle = document.getElementById('lang-toggle');
        const translatableElements = document.querySelectorAll('[data-lang-es]');
        const whatsappLink = document.getElementById('whatsapp-link');
        
        const baseWhatsappHref = whatsappLink ? whatsappLink.getAttribute('href') : null;

        if (langToggle && translatableElements.length > 0) {
            let currentLang = 'es'; // El idioma siempre empieza en español

            function switchLanguage(lang) {
                // Cambia todos los textos de la página
                translatableElements.forEach(el => {
                    const text = el.dataset[`lang-${lang}`];
                    if (text) el.innerHTML = text;
                });

                // Cambia el link de WhatsApp de forma segura
                if (whatsappLink && baseWhatsappHref) {
                    const rawMessage = whatsappLink.dataset[`whatsapp-${lang}`];
                    if (rawMessage) {
                        const encodedMessage = encodeURIComponent(rawMessage);
                        whatsappLink.href = `${baseWhatsappHref}?text=${encodedMessage}`;
                    }
                }

                // Actualiza la UI
                document.documentElement.lang = lang;
                langToggle.textContent = langToggle.dataset[`lang-${lang}`];
                currentLang = lang;
            }

            // Configura el mensaje de WhatsApp inicial en español
            switchLanguage('es');

            // Evento para el botón manual
            langToggle.addEventListener('click', () => {
                const newLang = currentLang === 'es' ? 'en' : 'es';
                switchLanguage(newLang);
                // Opcional: si querés que recuerde la elección para futuras visitas, descomentá la siguiente línea
                // localStorage.setItem('userLang', newLang);
            });
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
