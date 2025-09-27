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

    // --- LÓGICA DEL INTERRUPTOR DE IDIOMA (MEJORADA) ---
    try {
        const langToggle = document.getElementById('lang-toggle');
        // Selecciono cualquier elemento que tenga data-lang-es o data-lang-en (más robusto)
        const translatableElements = document.querySelectorAll('[data-lang-es], [data-lang-en]');

        if (langToggle && translatableElements.length > 0) {
            let currentLang = 'es'; // idioma por defecto

            function switchLanguage(lang) {
                // Actualizo todos menos el propio botón
                translatableElements.forEach(el => {
                    if (el.id === 'lang-toggle') return;
                    const text = el.getAttribute(`data-lang-${lang}`);
                    if (text !== null) {
                        // Uso textContent para evitar problemas de parseo HTML al setear strings
                        el.textContent = text;
                    }
                });

                // Actualizo el botón por separado (así no perdemos listeners ni corrompemos el elemento)
                const toggleText = langToggle.getAttribute(`data-lang-${lang}`);
                if (toggleText !== null) {
                    // innerHTML está bien para emoji, pero textContent también funciona. Uso innerHTML por compatibilidad visual.
                    langToggle.innerHTML = toggleText;
                }

                // atributo lang en el html
                document.documentElement.lang = lang;

                // debug: imprime en consola para verificar comportamiento
                console.info(`Idioma cambiado a: ${lang} (elementos actualizados: ${translatableElements.length - 1})`);
            }

            // Soporte para click y touch
            const onToggle = (e) => {
                e.preventDefault();
                currentLang = currentLang === 'es' ? 'en' : 'es';
                switchLanguage(currentLang);
            };
            langToggle.addEventListener('click', onToggle);
            langToggle.addEventListener('touchstart', onToggle, { passive: false });

            // Inicializo estado visual
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
    } catch (error) {
        console.error("No se pudo inicializar el carrusel Swiper:", error);
    }
});
