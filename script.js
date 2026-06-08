const follower = document.getElementById('muhammed');
const track = document.getElementById('sliderTrack');
const zoneElement = document.querySelector('.zone') || document.getElementById('zone');
const titleWText = document.querySelector('.titleW');
const galleryWrapper = document.querySelector('.gallery-wrapper');
const aboutCard = document.querySelector('.about-card');
const cardInner = document.querySelector('.card-inner');

const images = [
    'comints.png',
    'Dark_Threads_out_now.png',
    'godot.png',
    'im_mohamed.png',
    'mkh.png',
    'script.png',
    'slah.png',
    'sound.png',
    'vr.png'
];

const limit = 50; 
const speed = 0.1; 
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

let sliderX = 0;
let sliderSpeed = 1.5; 
let targetSpeed = 1.5; 
const originalSpeed = 1.5; 
const stopEasing = 0.05; 
const gap = 25;

let cardCurrentRotX = 0;
let cardCurrentRotY = 0;
let cardTargetRotX = 0;
let cardTargetRotY = 0;
let cardCurrentScale = 1;
let cardTargetScale = 1;

const cardSpeed = 0.08; 

window.addEventListener('mousemove', (e) => {
    if (zoneElement) {
        const rect = zoneElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const diffX = e.clientX - centerX;
        const diffY = e.clientY - centerY;
        
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        const radiusLimit = rect.width / 2; 

        if (distance <= radiusLimit) {
            targetX = Math.max(-limit, Math.min(diffX * 0.1, limit));
            targetY = Math.max(-limit, Math.min(diffY * 0.1, limit));
        } else {
            targetX = 0;
            targetY = 0;
        }
    } else {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight * 0.45;
        const diffX = e.clientX - centerX;
        const diffY = e.clientY - centerY;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        
        if (distance <= 300) {
            targetX = Math.max(-limit, Math.min(diffX * 0.1, limit));
            targetY = Math.max(-limit, Math.min(diffY * 0.1, limit));
        } else {
            targetX = 0;
            targetY = 0;
        }
    }
});

window.addEventListener('scroll', () => {
    if (titleWText && galleryWrapper) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        const startFill = galleryWrapper.offsetTop - windowHeight;
        const endFill = galleryWrapper.offsetTop + (galleryWrapper.offsetHeight / 2) - windowHeight;
        
        let percentage = ((scrollTop - startFill) / (endFill - startFill));
        percentage = Math.min(1, Math.max(0, percentage));
        
        titleWText.style.color = `rgba(255, 255, 255, ${percentage})`;
    }
});

function animateFollower() {
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    if (follower) {
        follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }

    cardCurrentRotX += (cardTargetRotX - cardCurrentRotX) * cardSpeed;
    cardCurrentRotY += (cardTargetRotY - cardCurrentRotY) * cardSpeed;
    cardCurrentScale += (cardTargetScale - cardCurrentScale) * cardSpeed;

    if (cardInner) {
        cardInner.style.transform = `rotateX(${cardCurrentRotX}deg) rotateY(${cardCurrentRotY}deg) scale(${cardCurrentScale})`;
    }

    requestAnimationFrame(animateFollower);
}

function createSlider() {
    images.forEach(imgName => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="img/${imgName}" alt="${imgName}">`;
        
        item.addEventListener('mouseenter', () => {
            targetSpeed = 0;
        });
        
        item.addEventListener('mouseleave', () => {
            targetSpeed = originalSpeed;
        });
        
        track.appendChild(item);
    });
}

function updateSlider() {
    sliderSpeed += (targetSpeed - sliderSpeed) * stopEasing;
    sliderX -= sliderSpeed;
    
    const firstItem = track.firstElementChild;
    
    if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const totalOffset = itemWidth + gap;
        
        if (Math.abs(sliderX) >= totalOffset) {
            track.appendChild(firstItem);
            sliderX += totalOffset;
        }
    }
    
    track.style.transform = `translate3d(${sliderX}px, 0, 0)`;
    
    requestAnimationFrame(updateSlider);
}

if (aboutCard && cardInner) {
    cardInner.style.transition = 'border-color 0.3s ease';

    aboutCard.addEventListener('mousemove', (e) => {
        const rect = aboutCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        cardTargetRotX = -(y / (rect.height / 2)) * 8;
        cardTargetRotY = (x / (rect.width / 2)) * 8;
        cardTargetScale = 1.02;
    });

    aboutCard.addEventListener('mouseleave', () => {
        cardTargetRotX = 0;
        cardTargetRotY = 0;
        cardTargetScale = 1;
    });
}

createSlider();
animateFollower();
updateSlider();