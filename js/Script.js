// Script para controle dos carrosséis
window.addEventListener('load', function() {
    // Configuração dos carrosséis com CSS scroll
    setupCarouselCSS('plans__carrossel');
    setupCarouselCSS('testimonials');
    setupCarouselCSS('services');
    
    // Configurar botões de WhatsApp
    setupWhatsAppButtons();
    
    // Configurar botões "Saiba mais" para direcionar para serviços
    setupSaibaMaisButtons();

    setupMobileMenu();

    window.addEventListener('resize', handleResize);
    
    // Inicializar ajustes para o tamanho atual da tela
    handleResize();
});

// Função para configurar carrosséis usando CSS para rolagem
function setupCarouselCSS(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const items = Array.from(carousel.children).filter(item => 
        !item.classList.contains('btn__carrossel')
    );

    
    const itemWidth = 320; // Largura do item + gap
    const scrollAmount = itemWidth;
    
    // Criar botões fora do carrossel
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&lt;'; // Símbolo < explícito
    prevBtn.className = 'btn__carrossel';
    prevBtn.setAttribute('aria-label', 'Anterior');
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '10px';
    prevBtn.style.zIndex = '100';
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&gt;'; // Símbolo < explícito
    nextBtn.className = 'btn__carrossel';
    nextBtn.setAttribute('aria-label', 'Próximo');
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '10px';
    nextBtn.style.zIndex = '100';
    
    // Criar um container para o carrossel e botões
    const carouselContainer = document.createElement('div');
    carouselContainer.style.position = 'relative';
    carouselContainer.style.width = '100%';
    carouselContainer.classList.add(`${carouselId}__wrapper`);    

    // Mover o carrossel para dentro do container
    carousel.parentNode.insertBefore(carouselContainer, carousel);
    carouselContainer.appendChild(carousel);
    
    // Adicionar botões ao container (não ao carrossel)
    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(nextBtn);
    
    // Adicionar event listeners para botões de navegação
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Função para configurar botões de WhatsApp
function setupWhatsAppButtons() {
    const whatsappNumber = '19993372824';
    const whatsappMessage = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços de vistos.');
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Selecionar todos os botões de "Fale conosco"
    const buttons = document.querySelectorAll('.btn_faleConosco, .btn__faleConosco');
    
    buttons.forEach(button => {
        // Verificar se o botão já é um link
        if (button.tagName === 'A') {
            button.href = whatsappLink;
            button.target = '_blank';
        } else {
            // Transformar o botão em link ou adicionar event listener
            button.addEventListener('click', function() {
                window.open(whatsappLink, '_blank');
            });
        }
    });
}

// Função para configurar botões "Saiba mais" para direcionar para a seção de serviços
function setupSaibaMaisButtons() {
    const saibaMaisButtons = document.querySelectorAll('.saibaMais');
    
    saibaMaisButtons.forEach(button => {
        // Se já for um link <a>
        if (button.tagName === 'A') {
            button.href = '#services';
        } else {
            // Converter botão para link ou adicionar event listener
            button.addEventListener('click', function() {
                document.getElementById('services').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });
}





// Função para lidar com o redimensionamento da janela
function handleResize() {
    adjustCarouselButtons('plans__carrossel');
    adjustCarouselButtons('testimonials');
    adjustCarouselButtons('services');
    
    // Ajustar altura dinâmica dos cards dos carrosséis
    adjustCardsHeight();
    
    // Ajustar posição da imagem do rodapé
    adjustFooterImage();
}

// Função para ajustar a posição dos botões do carrossel com base no tamanho da tela
function adjustCarouselButtons(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const carouselWrapper = carousel.closest(`.${carouselId}__wrapper`);
    if (!carouselWrapper) return;
    
    const prevBtn = carouselWrapper.querySelector('.btn__carrossel[aria-label="Anterior"]');
    const nextBtn = carouselWrapper.querySelector('.btn__carrossel[aria-label="Próximo"]');
    
    if (!prevBtn || !nextBtn) return;
    
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 768) {
        // Em telas menores, posicionar os botões mais próximos do carrossel
        prevBtn.style.left = '-5px';
        nextBtn.style.right = '-5px';
    } else {
        // Em telas maiores, dar mais espaço para os botões
        prevBtn.style.left = '10px';
        nextBtn.style.right = '10px';
    }
}

// Função para ajustar a altura dos cards dos carrosséis para manter consistência
function adjustCardsHeight() {
    // Ajustar altura dos cards de planos
    const plansCards = document.querySelectorAll('[class^="carrossel_"]');
    resetHeight(plansCards);
    if (window.innerWidth > 576) {
        setEqualHeight(plansCards);
    }
    
    // Ajustar altura dos cards de serviços
    const serviceCards = document.querySelectorAll('[class^="services_"]');
    resetHeight(serviceCards);
    if (window.innerWidth > 576) {
        setEqualHeight(serviceCards);
    }
}

// Função para resetar alturas
function resetHeight(elements) {
    elements.forEach(el => {
        el.style.height = '';
    });
}

// Função para igualar alturas
function setEqualHeight(elements) {
    let maxHeight = 0;
    elements.forEach(el => {
        const height = el.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    
    elements.forEach(el => {
        el.style.height = maxHeight + 'px';
    });
}

// Função para ajustar a imagem do rodapé
function adjustFooterImage() {
    const footerImgContainer = document.querySelector('.rodape__img__container');
    const footerImg = document.querySelector('.rodape__img');
    
    if (!footerImgContainer || !footerImg) return;
    
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 576) {
        footerImgContainer.style.height = '80px';
        footerImgContainer.style.marginTop = '-40px';
        footerImgContainer.style.marginBottom = '-40px';
    } else if (windowWidth <= 768) {
        footerImgContainer.style.height = '100px';
        footerImgContainer.style.marginTop = '-50px';
        footerImgContainer.style.marginBottom = '-50px';
    } else {
        footerImgContainer.style.height = '150px';
        footerImgContainer.style.marginTop = '-75px';
        footerImgContainer.style.marginBottom = '-75px';
    }
}

// Configuração do menu mobile
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (!mobileMenuToggle || !navbar) return;
    
    // Criar overlay para fechamento do menu ao clicar fora
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    mobileMenuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Fechar menu ao clicar em um link de navegação
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    function toggleMenu() {
        navbar.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Impedir rolagem do body quando o menu está aberto
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMenu() {
        navbar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
