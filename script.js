const rainSoundPath = window.location.pathname.includes('/pages/') ? '../Rain.mp3' : './Rain.mp3';
const rainSound = new Audio(rainSoundPath);
rainSound.loop = true;
rainSound.volume = 0.4;

function playWeatherSounds() {
    rainSound.play();
}

function pauseWeatherSounds() {
    rainSound.pause();
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
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

function createClouds() {
    const background = document.querySelector('.background-effects');
    const numberOfClouds = 5;
    for (let i = 0; i < numberOfClouds; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.style.top = `${Math.random() * 50}%`;
        cloud.style.animationDuration = `${Math.random() * 20 + 30}s`;
        cloud.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        background.appendChild(cloud);
    }
}

function addLightningEffect() {
    const background = document.querySelector('.background-effects');
    setInterval(() => {
        if (Math.random() > 0.97) {
            background.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            setTimeout(() => {
                background.style.backgroundColor = 'transparent';
            }, 100);
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    createRainDrops();
    createClouds();
    addLightningEffect();
    
    // Activation et désactivation du son via le bouton haut-parleur.
    // Le bouton affiche une icône de haut-parleur activé ("🔊") quand le son est lancé
    // et une icône de haut-parleur coupé ("🔇") quand le son est désactivé.
    const soundToggle = document.getElementById('sound-toggle');
    // Définit l'état initial à "son coupé"
    soundToggle.innerHTML = '🔇';
    
    soundToggle.addEventListener('click', () => {
        if (rainSound.paused) {
            playWeatherSounds();
            soundToggle.innerHTML = '🔊';
        } else {
            pauseWeatherSounds();
            soundToggle.innerHTML = '🔇';
        }
    });
});