const rainSoundPath = window.location.pathname.includes('/pages/')
    ? '../sounds/Rain.mp3'
    : './sounds/Rain.mp3';
const snowSoundPath = window.location.pathname.includes('/pages/')
    ? '../sounds/Snow.mp3'
    : './sounds/Snow.mp3';
const sunSoundPath = window.location.pathname.includes('/pages/')
    ? '../sounds/Sun.mp3'
    : './sounds/Sun.mp3';

const rainSound = new Audio(rainSoundPath);
rainSound.loop = true;
rainSound.volume = 0.4;

const snowSound = new Audio(snowSoundPath);
snowSound.loop = true;
snowSound.volume = 0.4;

const sunSound = new Audio(sunSoundPath);
sunSound.loop = true;
sunSound.volume = 0.4;

function pauseWeatherSounds() {
    rainSound.pause();
    snowSound.pause();
    sunSound.pause();
}
function updateWeatherSound() {
    const soundToggle = document.getElementById('sound-toggle');
    const isSoundEnabled = soundToggle.innerHTML === '🔊';
    const weatherToggle = document.getElementById('weather-toggle');

    if (!isSoundEnabled) {
        pauseWeatherSounds();
        return;
    }

    pauseWeatherSounds();
    const icon = weatherToggle.innerHTML;
    switch (icon) {
        case '🌧️':
            rainSound.play().catch(() => {});
            break;
        case '❄️':
            snowSound.play().catch(() => {});
            break;
        case '🌤️':
            sunSound.play().catch(() => {});
            break;
    }
}

function toggleWeather() {
    console.log('toggleWeather called');
    const weatherToggle = document.getElementById('weather-toggle');
    const icon = weatherToggle.innerHTML;

    removeRain();
    removeSnow();

    if (icon === '🌧️') {
        addSnow();
        weatherToggle.innerHTML = '❄️';
    }
    else if (icon === '❄️') {
        weatherToggle.innerHTML = '🌤️';
    }
    else {
        addRain();
        weatherToggle.innerHTML = '🌧️';
    }
    updateWeatherSound();
}

function addRain() {
    console.log('addRain called');
    const background = document.querySelector('.background-effects');
    let rain = document.querySelector('.rain');
    if (!rain) {
        rain = document.createElement('div');
        rain.classList.add('rain');
        background.appendChild(rain);
        createRainDrops();
        addLightningEffect();
    }
}

function removeRain() {
    console.log('removeRain called');
    const rain = document.querySelector('.rain');
    if (rain) {
        rain.remove();
    }
}

function addSnow() {
    console.log('addSnow called');
    const background = document.querySelector('.background-effects');
    let snow = document.querySelector('.snow');
    if (!snow) {
        snow = document.createElement('div');
        snow.classList.add('snow');
        background.appendChild(snow);
        createSnowFlakes();
    }
}

function removeSnow() {
    console.log('removeSnow called');
    const snow = document.querySelector('.snow');
    if (snow) {
        snow.remove();
    }
}

function createRainDrops() {
    const rain = document.querySelector('.rain');
    const numberOfDrops = 100;
    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        drop.style.height = `${Math.random() * 60 + 40}px`;
        rain.appendChild(drop);
    }
}

function createSnowFlakes() {
    const snow = document.querySelector('.snow');
    const numberOfFlakes = 100;
    for (let i = 0; i < numberOfFlakes; i++) {
        const flake = document.createElement('div');
        flake.classList.add('flake');
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        flake.style.animationDelay = `${Math.random() * 2}s`;
        flake.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        flake.style.width = `${Math.random() * 5 + 2}px`;
        flake.style.height = flake.style.width;
        snow.appendChild(flake);
    }
}

function addLightningEffect() {
    const background = document.querySelector('.background-effects');
    setInterval(() => {
        if (document.querySelector('.rain')) {
            if (Math.random() > 0.97) {
                background.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                setTimeout(() => {
                    background.style.backgroundColor = 'transparent';
                }, 100);
            }
        }
    }, 100);
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const soundToggle = document.getElementById('sound-toggle');
    soundToggle.innerHTML = '🔇';
    soundToggle.addEventListener('click', () => {
        if (soundToggle.innerHTML === '🔇') {
            soundToggle.innerHTML = '🔊';
            updateWeatherSound();
        } else {
            soundToggle.innerHTML = '🔇';
            pauseWeatherSounds();
        }
    });

    const weatherToggle = document.getElementById('weather-toggle');
    const rainContainer = document.querySelector('.rain');
    const snowContainer = document.querySelector('.snow');
    if (rainContainer && rainContainer.children.length > 0) {
        weatherToggle.innerHTML = '🌧️';
    } else if (snowContainer && snowContainer.children.length > 0) {
        weatherToggle.innerHTML = '❄️';
    } else {
        weatherToggle.innerHTML = '🌤️';
    }
    weatherToggle.addEventListener('click', toggleWeather);
});

// Animation au défilement - Reveal sections
document.addEventListener('DOMContentLoaded', function() {
    // Observer pour les animations au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, {threshold: 0.15});
    
    // Observer tous les éléments avec la classe reveal
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
    
    // Fonction pour toggle le menu mobile
    window.toggleMenu = function() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileNav = document.getElementById('mobileNav');
        
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('show');
    }
});

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajustement pour la hauteur du header
                behavior: 'smooth'
            });
        }
    });
});