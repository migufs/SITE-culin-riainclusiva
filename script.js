// ============== DADOS - NUNCA ALTERE DIRETAMENTE NO HTML ==============
const receitasData = [
    {
        titulo: "Salada Colorida Sem Glúten",
        subtitulo: "Vegana • 15 min",
        descricao: "Folhas frescas, tomate, abacate e tahine. Perfeita para celíacos e alérgicos a nozes.",
        emoji: "🥗"
    },
    {
        titulo: "Sopa de Abóbora Fácil",
        subtitulo: "Baixo sódio • Uma mão só",
        descricao: "Cremosa e suave, ideal para idosos ou pessoas com dificuldade de mastigação.",
        emoji: "🥣"
    },
    {
        titulo: "Brownie Vegano Sem Lactose",
        subtitulo: "Sem glúten • 25 min",
        descricao: "Chocolate intenso feito com farinha de arroz e leite de aveia.",
        emoji: "🍫"
    },
    {
        titulo: "Arroz com Feijão Universal",
        subtitulo: "Adaptável a 8 restrições",
        descricao: "Versão que pode ser feita com proteína vegetal, carne ou apenas legumes.",
        emoji: "🍲"
    }
];

const carouselData = [
    {
        titulo: "“Finalmente consigo cozinhar com minha filha cega!”",
        descricao: "Receitas com passos em áudio e descrições detalhadas mudaram nossa rotina familiar.",
        nome: "Mariana Silva • São Paulo"
    },
    {
        titulo: "“Minha primeira receita sem glúten que não desmontou”",
        descricao: "A adaptação foi tão simples que agora preparo todas as refeições da família.",
        nome: "João Mendes • Curitiba"
    },
    {
        titulo: "“Cozinha acessível para cadeirantes”",
        descricao: "A bancada baixa e os utensílios ergonômicos fizeram toda a diferença.",
        nome: "Laura Costa • Recife"
    }
];

const accordionData = [
    {
        pergunta: "O que significa Culinária Inclusiva?",
        resposta: "É o ato de criar receitas que respeitam restrições alimentares, limitações motoras, visuais e cognitivas, garantindo que todos possam cozinhar e saborear juntos."
    },
    {
        pergunta: "Como adapto uma receita para celíacos?",
        resposta: "Substitua farinha de trigo por farinha de arroz, amido de milho ou mix de farinhas sem glúten. Sempre leia rótulos e evite contaminação cruzada."
    },
    {
        pergunta: "Posso preparar com apenas uma mão?",
        resposta: "Sim! Nossas receitas priorizam utensílios de uma mão, tigelas com ventosa e passos simplificados."
    },
    {
        pergunta: "As receitas têm versão em áudio?",
        resposta: "Em breve! Atualmente oferecemos texto grande, alto contraste e descrições detalhadas de cada passo."
    }
];

// ============== FUNÇÕES DE RENDERIZAÇÃO ==============
function renderRecipes() {
    const container = document.getElementById('recipes-grid');
    container.innerHTML = '';
    
    receitasData.forEach((receita, index) => {
        const cardHTML = `
            <div class="card" role="article" tabindex="0" aria-labelledby="recipe-${index}">
                <div class="card-emoji">${receita.emoji}</div>
                <h3 id="recipe-${index}">${receita.titulo}</h3>
                <span style="color: var(--accent-color); font-weight: 600;">${receita.subtitulo}</span>
                <p>${receita.descricao}</p>
                <button class="btn-primary" style="margin-top: auto; width: 100%; padding: 12px;" onclick="alert('Modo de preparo completo da ${receita.titulo} seria aberto aqui (demo).')">Ver receita completa</button>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function renderCarousel() {
    const container = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    carouselData.forEach((item, index) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <p style="font-size: 2.5rem; margin-bottom: 1rem;">“</p>
            <h3>${item.titulo}</h3>
            <p style="max-width: 600px; margin: 1.5rem auto;">${item.descricao}</p>
            <p style="font-style: italic; color: var(--accent-color);">${item.nome}</p>
        `;
        container.appendChild(slide);
        
        // Dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === 0);
        dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Inicializa variáveis do carrossel
    window.currentSlide = 0;
    window.totalSlides = carouselData.length;
}

function renderAccordion() {
    const container = document.getElementById('accordion-container');
    container.innerHTML = '';
    
    accordionData.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        accordionItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="content-${index}">
                ${item.pergunta}
                <span class="accordion-icon" aria-hidden="true">▼</span>
            </button>
            <div id="content-${index}" class="accordion-content">
                <p>${item.resposta}</p>
            </div>
        `;
        
        // Evento de clique
        const header = accordionItem.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = accordionItem.querySelector('.accordion-content');
            const isOpen = content.classList.contains('open');
            
            // Fecha todos os outros
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.classList.remove('open');
                c.previousElementSibling.setAttribute('aria-expanded', 'false');
            });
            
            if (!isOpen) {
                content.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
        
        container.appendChild(accordionItem);
    });
}

// ============== CARROSSEL CONTROLS ==============
function goToSlide(index) {
    window.currentSlide = index;
    const carousel = document.getElementById('carousel');
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    // Atualiza dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index);
    });
}

function initCarouselControls() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    prevBtn.addEventListener('click', () => {
        let newIndex = window.currentSlide - 1;
        if (newIndex < 0) newIndex = window.totalSlides - 1;
        goToSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = window.currentSlide + 1;
        if (newIndex >= window.totalSlides) newIndex = 0;
        goToSlide(newIndex);
    });
    
    // Suporte a teclado
    document.getElementById('carousel').addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });
}

// ============== CONTROLES DE ACESSIBILIDADE ==============
function initAccessibility() {
    // Tamanho da fonte
    let fontLevel = 1;
    const fontSizes = ['16px', '18px', '20px', '22px'];
    
    document.getElementById('font-increase').addEventListener('click', () => {
        fontLevel = Math.min(fontLevel + 1, fontSizes.length - 1);
        document.documentElement.style.setProperty('--base-font-size', fontSizes[fontLevel]);
    });
    
    document.getElementById('font-decrease').addEventListener('click', () => {
        fontLevel = Math.max(fontLevel - 1, 0);
        document.documentElement.style.setProperty('--base-font-size', fontSizes[fontLevel]);
    });
    
    // Alto contraste
    const toggleBtn = document.getElementById('high-contrast-toggle');
    toggleBtn.addEventListener('click', () => {
        const isActive = document.body.classList.toggle('high-contrast');
        toggleBtn.setAttribute('aria-pressed', isActive);
        
        // Persistência simples
        if (isActive) {
            localStorage.setItem('highContrast', 'true');
        } else {
            localStorage.removeItem('highContrast');
        }
    });
    
    // Recupera preferência salva
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
        toggleBtn.setAttribute('aria-pressed', 'true');
    }
}

// ============== SCROLL REVEAL ==============
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    reveals.forEach(el => observer.observe(el));
}

// ============== INICIALIZAÇÃO GERAL ==============
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza todo conteúdo dinâmico
    renderRecipes();
    renderCarousel();
    renderAccordion();
    
    // Inicializa componentes interativos
    initCarouselControls();
    initAccessibility();
    initScrollReveal();
    
    console.log('%c✅ Landing Page de Culinária Inclusiva carregada com sucesso! (100% acessível e modular)', 'color:#d35400; font-weight:700');
});
