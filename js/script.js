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

    // --- LÓGICA DEL INTERRUPTOR DE IDIOMA (CON WHATSAPP INTEGRADO) ---
    try {
        const langToggle = document.getElementById('lang-toggle');
        const translatableElements = document.querySelectorAll('[data-lang-es], [data-lang-en]');
        
        // --- INYECCIÓN 1: Seleccionamos el link de WhatsApp ---
        const whatsappLink = document.getElementById('whatsapp-link');
        const baseWhatsappHref = whatsappLink ? whatsappLink.getAttribute('href') : null;

        if (langToggle && translatableElements.length > 0) {
            let currentLang = 'es'; // idioma por defecto

            function switchLanguage(lang) {
                // Tu código original para cambiar textos (funciona perfecto)
                translatableElements.forEach(el => {
                    if (el.id === 'lang-toggle') return;
                    const text = el.getAttribute(`data-lang-${lang}`);
                    if (text !== null) {
                        el.textContent = text;
                    }
                });

                // --- INYECCIÓN 2: Añadimos la lógica para actualizar el link de WhatsApp ---
                if (whatsappLink && baseWhatsappHref) {
                    const rawMessage = whatsappLink.getAttribute(`data-whatsapp-${lang}`);
                    if (rawMessage) {
                        const encodedMessage = encodeURIComponent(rawMessage);
                        whatsappLink.href = `${baseWhatsappHref}?text=${encodedMessage}`;
                    }
                }
                
                // Tu código original para actualizar el botón y el HTML (funciona perfecto)
                const toggleText = langToggle.getAttribute(`data-lang-${lang}`);
                if (toggleText !== null) {
                    langToggle.innerHTML = toggleText;
                }
                document.documentElement.lang = lang;
            }

            const onToggle = (e) => {
                e.preventDefault();
                currentLang = currentLang === 'es' ? 'en' : 'es';
                switchLanguage(currentLang);
            };
            langToggle.addEventListener('click', onToggle);
            langToggle.addEventListener('touchstart', onToggle, { passive: false });

            // Tu inicialización original (funciona perfecto)
            switchLanguage(currentLang);
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
    } catch (error)
        console.error("No se pudo inicializar el carrusel Swiper:", error);
    }
});
