document.addEventListener("DOMContentLoaded", function() {
    
    // --- LÓGICA DE ANIMACIÓN AL HACER SCROLL ---
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

    // --- LÓGICA DEL INTERRUPTOR DE IDIOMA ---
    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-lang-es]');
    
    let currentLang = 'es'; // Idioma por defecto

    function switchLanguage(lang) {
        translatableElements.forEach(el => {
            const text = el.dataset[`lang-${lang}`];
            if (text) {
                el.innerHTML = text;
            }
        });
        // Actualiza el atributo lang del HTML para accesibilidad y SEO
        document.documentElement.lang = lang;
        
        // Actualiza el texto del botón
        langToggle.textContent = langToggle.dataset[`lang-${lang}`];
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        switchLanguage(currentLang);
    });

    // --- LÓGICA DEL CARRUSEL DE TESTIMONIOS (MOVIDA AQUÍ ADENTRO) ---
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

});
