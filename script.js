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

/* Met à jour le son en fonction de l'icône météo et de l'état du bouton son */
function updateWeatherSound() {
    const soundToggle = document.getElementById('sound-toggle');
    const isSoundEnabled = soundToggle.innerHTML === '🔊';
    const weatherToggle = document.getElementById('weather-toggle');

    // Si le son est désactivé, on s'assure de tout pause()
    if (!isSoundEnabled) {
        pauseWeatherSounds();
        return;
    }

    // Active uniquement le son correspondant à la météo courante
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

/* Bascule entre pluie, neige, soleil dans l'ordre : 🌧️ => ❄️ => 🌤️ => 🌧️ */
function toggleWeather() {
    console.log('toggleWeather called');
    const weatherToggle = document.getElementById('weather-toggle');
    const icon = weatherToggle.innerHTML;

    // Supprime d'abord tous les effets météo
    removeRain();
    removeSnow();

    // Si on part de la pluie, on passe à la neige
    if (icon === '🌧️') {
        addSnow();
        weatherToggle.innerHTML = '❄️';
    }
    // Si on part de la neige, on passe au soleil
    else if (icon === '❄️') {
        weatherToggle.innerHTML = '🌤️';
    }
    // Sinon on repasse à la pluie
    else {
        addRain();
        weatherToggle.innerHTML = '🌧️';
    }
    updateWeatherSound();
}

/* Active la pluie */
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

/* Désactive la pluie */
function removeRain() {
    console.log('removeRain called');
    const rain = document.querySelector('.rain');
    if (rain) {
        rain.remove();
    }
}

/* Active la neige */
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

/* Désactive la neige */
function removeSnow() {
    console.log('removeSnow called');
    const snow = document.querySelector('.snow');
    if (snow) {
        snow.remove();
    }
}

/* Création de la pluie */
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

/* Création de la neige */
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

/* Éclairs uniquement si la pluie est active */
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

/* Menu burger (optionnel) */
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

/* Au chargement de la page, on initialise l’état du son et de la météo */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Bouton du son
    const soundToggle = document.getElementById('sound-toggle');
    soundToggle.innerHTML = '🔇'; // On part sur son désactivé
    soundToggle.addEventListener('click', () => {
        if (soundToggle.innerHTML === '🔇') {
            soundToggle.innerHTML = '🔊';
            updateWeatherSound();
        } else {
            soundToggle.innerHTML = '🔇';
            pauseWeatherSounds();
        }
    });

    // Bouton météo
    const weatherToggle = document.getElementById('weather-toggle');
    // Vérifie la météo initiale pour définir un état cohérent
    const rainContainer = document.querySelector('.rain');
    const snowContainer = document.querySelector('.snow');
    if (rainContainer && rainContainer.children.length > 0) {
        weatherToggle.innerHTML = '🌧️';
    } else if (snowContainer && snowContainer.children.length > 0) {
        weatherToggle.innerHTML = '❄️';
    } else {
        // Par défaut : soleil
        weatherToggle.innerHTML = '🌤️';
    }
    weatherToggle.addEventListener('click', toggleWeather);
});