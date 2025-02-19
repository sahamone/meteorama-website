const rainSoundPath = window.location.pathname.includes('/pages/') ? '../Sounds/Rain.mp3' : './Sounds/Rain.mp3';
const windsound = window.location.pathname.includes('/pages/') ? '../Sounds/Wind.mp3' : './Sounds/Wind.mp3';

const rainSound = new Audio(rainSoundPath);
rainSound.loop = true;
rainSound.volume = 0.4;

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

let lightningInterval;

function addLightningEffect() {
    const background = document.querySelector('.background-effects');
    lightningInterval = setInterval(() => {
        if (Math.random() > 0.97) {
            background.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            setTimeout(() => {
                background.style.backgroundColor = 'transparent';
            }, 100);
        }
    }, 100);
}

function enableLightning() {
    if (!lightningInterval) {
        addLightningEffect();
    }
}

function disableLightning() {
    clearInterval(lightningInterval);
    lightningInterval = null;
    const background = document.querySelector('.background-effects');
    background.style.backgroundColor = 'transparent';
}

function createSnowFlakes() {
    const snow = document.querySelector('.snow');
    const numberOfFlakes = 100;
    for (let i = 0; i < numberOfFlakes; i++) {
        const flake = document.createElement('div');
        flake.classList.add('flake');
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        flake.style.opacity = `${Math.random() * 0.5 + 0.5}`;
        flake.style.width = `${Math.random() * 5 + 2}px`;
        flake.style.height = flake.style.width;
        snow.appendChild(flake);
    }
}

const backgrounds = [
    { image: window.location.pathname.includes('/pages/') ? '../images/Fond/Neige.jpg' : './images/Fond/Neige.jpg', sound: window.location.pathname.includes('/pages/') ? '../Sounds/Wind.mp3' : './Sounds/Wind.mp3', enableEffect: enableSnow },
    { image: window.location.pathname.includes('/pages/') ? '../images/Fond/Hiver1.jpg' : './images/Fond/Hiver1.jpg', sound: window.location.pathname.includes('/pages/') ? '../Sounds/rain.mp3' : './Sounds/rain.mp3', enableEffect: enableRain },
    { image: window.location.pathname.includes('/pages/') ? '../images/Fond/Printemps.jpg' : './images/Fond/Printemps.jpg', sound: window.location.pathname.includes('/pages/') ? '../Sounds/birds.mp3' : './Sounds/birds.mp3', enableEffect: enableSpring }
];

let currentBackgroundIndex = 0;
const backgroundSound = new Audio();

function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    const { image, sound, enableEffect } = backgrounds[currentBackgroundIndex];
    document.body.style.backgroundImage = `url('${image}')`;
    backgroundSound.src = sound;
    backgroundSound.play();
    enableEffect();

    if (image.includes('Hiver1.jpg')) {
        enableLightning();
    } else {
        disableLightning();
    }
}

function enableRain() {
    document.querySelector('.rain').style.display = 'block';
    document.querySelector('.snow').style.display = 'none';
    rainSound.play();
}

function enableSnow() {
    document.querySelector('.rain').style.display = 'none';
    document.querySelector('.snow').style.display = 'block';
    rainSound.pause();
}

function enableSpring() {
    document.querySelector('.rain').style.display = 'none';
    document.querySelector('.snow').style.display = 'none';
    rainSound.pause();
}

document.addEventListener('DOMContentLoaded', () => {
    createRainDrops();
    createSnowFlakes();

    const { sound, enableEffect } = backgrounds[currentBackgroundIndex];
    backgroundSound.src = sound;
    backgroundSound.play();
    enableEffect();

    if (backgrounds[currentBackgroundIndex].image.includes('Hiver1.jpg')) {
        enableLightning();
    }

    setInterval(changeBackground, 20000);
});




