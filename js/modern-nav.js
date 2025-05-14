document.addEventListener('DOMContentLoaded', function() {
    // Elementy DOM
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Funkcja do obsługi efektu przewijania
    function handleScroll() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    }
    
    // Funkcja do przełączania menu mobilnego
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Funkcja do zamykania menu mobilnego po kliknięciu w link
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Funkcja do ustawiania aktywnego linku
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Nasłuchiwanie zdarzeń
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', setActiveLink);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Zamykanie menu mobilnego po kliknięciu w link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Inicjalizacja stanu początkowego
    handleScroll();
    setActiveLink();
});
