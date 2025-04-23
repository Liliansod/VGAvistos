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
    const whatsappNumber = '19997614391';
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