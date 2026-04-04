// --- script.js ---

// 1. CURSOR DUAL PERSONALIZADO (FLUIDEZ SÊNIOR)
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');



if (cursor && follower) {
    // Esconde o cursor padrão do Windows/Mac
    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', (e) => {
        // Coordenadas do mouse
        const posX = e.clientX;
        const posY = e.clientY;

        // Mostra os elementos apenas quando o mouse se mover pela primeira vez
        if (cursor.style.opacity === "" || cursor.style.opacity === "0") {
            cursor.style.opacity = "1";
            follower.style.opacity = "0.5";
        }

        // Movimento direto (Pixel-perfect)
        // Usar requestAnimationFrame aqui garante que o cursor acompanhe o monitor (60Hz/144Hz)
        requestAnimationFrame(() => {
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
            
            follower.style.left = `${posX}px`;
            follower.style.top = `${posY}px`;
        });
    });

    // Interações de Hover (Agrupadas para performance)
    const interactiveElements = document.querySelectorAll('a, button, .method-visual img, .professional-photo, .btn-agendar');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(2.2)';
            follower.style.background = 'rgba(205, 164, 52, 0.1)';
            follower.style.borderColor = 'transparent';
            cursor.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.background = 'transparent';
            follower.style.borderColor = 'var(--gold-primary)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// 2. INTEGRAÇÃO GSAP (ANIMAÇÕES DE ENTRADA)
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Filtramos apenas os elementos que existem na página atual
    const revealSections = document.querySelectorAll('.reveal-item, .identity-grid, .about-grid, .combo-ticker');
    
    revealSections.forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 30, // Reduzido de 50 para 30 para ser mais sutil e rápido
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 88%",
                toggleActions: "play none none none"
            }
        });
    });
}

// 3. EFEITO PARALAXE (TEXTO FANTASMA DE FUNDO)
window.addEventListener('scroll', () => {
    const depthText = document.querySelector('.identity-background-text');
    if (depthText) {
        // Move o texto apenas 10% da velocidade do scroll
        let scrollValue = window.scrollY;
        depthText.style.transform = `translate(-50%, calc(-50% + ${scrollValue * 0.1}px))`;
    }
});

// 4. LÓGICA DE COOKIES (LGPD)
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');

// Proteção para não dar erro em páginas que não tem o banner (como Termos)
if (cookieBanner && acceptBtn) {
    if (!localStorage.getItem('cookiesAceitos')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1500);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAceitos', 'true');
        cookieBanner.classList.remove('show');
    });
}

// Inicialização do Carrossel de Avaliações (Versão Espiada)
if (typeof Swiper !== 'undefined') {
    new Swiper(".mySwiper", {
        slidesPerView: 1.2, // Mostra 1 card inteiro e 20% do próximo
        centeredSlides: true, // Deixa o card principal no centro
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { 
                slidesPerView: 2.2, // No tablet mostra 2 e um pedaço
                centeredSlides: false 
            },
            1024: { 
                slidesPerView: 3.2, // No desktop mostra 3 e um pedaço
                centeredSlides: false,
                spaceBetween: 30
            },
        },
    });
}
