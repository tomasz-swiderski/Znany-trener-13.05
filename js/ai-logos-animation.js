// Skrypt obsługujący animację logo AI i wyładowania elektryczne
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicjalizacja animacji logo AI...');

    // Elementy DOM
    const logos = document.querySelectorAll('.ai-logo');
    const lightnings = document.querySelectorAll('.lightning');
    const connector = document.querySelector('.connector');
    const pulse = document.querySelector('.pulse');
    const container = document.querySelector('.ai-logos-container');

    // Dodaj klasy CSS dla losowego ruchu logo
    logos.forEach((logo, index) => {
        logo.classList.add('float-' + (index % 5 + 1));
        console.log('Logo znalezione:', logo.getAttribute('alt'));

        // Dodaj efekt pulsowania przy najechaniu myszą
        logo.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 15px rgba(0, 162, 255, 0.9))';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });

    // Funkcja tworząca wyładowanie elektryczne
    function createDischarge(sourceElement) {
        console.log('Tworzenie wyładowania z:', sourceElement.getAttribute('alt'));
        
        // Stwórz nowy element wyładowania
        const discharge = document.createElement('div');
        discharge.className = 'active-lightning';
        
        // Pobierz pozycje elementów
        const sourceRect = sourceElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const connectorRect = connector.getBoundingClientRect();
        
        // Oblicz pozycje względem kontenera
        const sourceX = sourceRect.left - containerRect.left + sourceRect.width/2;
        const sourceY = sourceRect.top - containerRect.top + sourceRect.height/2;
        const targetX = connectorRect.left - containerRect.left + connectorRect.width/2;
        const targetY = connectorRect.top - containerRect.top;
        
        // Oblicz długość i kąt wyładowania
        const length = Math.sqrt(Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2));
        const angle = Math.atan2(targetY - sourceY, targetX - sourceX) * 180 / Math.PI;
        
        // Ustaw właściwości wyładowania
        discharge.style.position = 'absolute';
        discharge.style.left = sourceX + 'px';
        discharge.style.top = sourceY + 'px';
        discharge.style.width = length + 'px';
        discharge.style.transformOrigin = '0 0';
        discharge.style.transform = `rotate(${angle}deg)`;
        
        // Dodaj do DOM
        container.appendChild(discharge);
        
        // Efekt błysku przy źródle
        const flash = document.createElement('div');
        flash.className = 'discharge-flash';
        flash.style.left = (sourceX - 15) + 'px';
        flash.style.top = (sourceY - 15) + 'px';
        container.appendChild(flash);
        
        // Usuń po animacji
        setTimeout(() => {
            discharge.remove();
            flash.remove();
        }, 1000);
    }

    // Funkcja generująca losowe wyładowania
    function randomDischarges() {
        // Losowe logo
        const randomLogo = logos[Math.floor(Math.random() * logos.length)];
        createDischarge(randomLogo);
        
        // Animacja pulsowania dla punktu połączenia
        pulse.style.opacity = '1';
        pulse.style.animation = 'pulse 1s';
        setTimeout(() => {
            pulse.style.opacity = '0';
            pulse.style.animation = '';
        }, 1000);
        
        // Zaplanuj następne wyładowanie
        setTimeout(randomDischarges, Math.random() * 1500 + 500);
    }

    // Rozpocznij animację po krótkim opóźnieniu
    setTimeout(randomDischarges, 1000);

    // Dodaj nasłuchiwanie kliknięć na logo
    logos.forEach(logo => {
        logo.addEventListener('click', function() {
            createDischarge(this);
        });
    });
});
