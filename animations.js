/**
 * Portfolio Animations with GSAP
 */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Matrix-style character rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
}

// Initialize matrix rain
createMatrixRain();

// Hero animations
gsap.from('.hero-badge', {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: 'back.out(1.7)',
});

gsap.from('.hero-title', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
});

gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.4,
    ease: 'power3.out',
});

gsap.from('.hero-cta .btn', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)',
});

gsap.from('.hero-stats .stat', {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    delay: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.7)',
});

gsap.from('.code-window', {
    opacity: 0,
    x: 100,
    rotateY: -30,
    duration: 1.2,
    delay: 0.5,
    ease: 'power3.out',
});

// Section title animations
gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
    });
});

// Project cards stagger animation
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.2)',
});

// Skill categories animation
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
});

// Contact card animation
gsap.from('.contact-card', {
    scrollTrigger: {
        trigger: '.contact-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'back.out(1.5)',
});

// Parallax effect on hero visual
gsap.to('.code-window', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: 100,
    opacity: 0.5,
    ease: 'none',
});

// Stat counter animation
function animateCounter(element, target) {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
        },
        textContent: target,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate: function() {
            element.textContent = Math.ceil(this.targets()[0].textContent);
        }
    });
}

// Cursor trail effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #00ff88;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    mix-blend-mode: difference;
    transition: transform 0.15s ease-out, opacity 0.15s;
    opacity: 0;
`;
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: #00ff88;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    box-shadow: 0 0 10px #00ff88;
    transition: transform 0.05s ease-out, opacity 0.15s;
    opacity: 0;
`;
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX - 3 + 'px';
    cursorDot.style.top = mouseY - 3 + 'px';
    cursorDot.style.opacity = '1';
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
});

// Smooth cursor follow
function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Scale cursor on hover
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorDot.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorDot.style.transform = 'scale(1)';
    });
});

// Glitch effect on project cards
function addGlitchEffect(element) {
    const glitchInterval = setInterval(() => {
        if (Math.random() > 0.95) {
            element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                element.style.transform = '';
            }, 50);
        }
    }, 100);
    
    element.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
    }, { once: true });
}

document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', () => addGlitchEffect(card));
});

// Typing effect for code window
function typeCode() {
    const codeElement = document.querySelector('.code-content code');
    if (!codeElement) return;
    
    const originalText = codeElement.textContent;
    codeElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            codeElement.textContent += originalText[i];
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 20);
}

// Run typing effect on load
window.addEventListener('load', () => {
    setTimeout(typeCode, 1000);
});

// Particle system for background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
        this.opacity = Math.random() * 0.5;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        ctx.fill();
    }
}

function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const particles = Array(50).fill().map(() => new Particle(canvas));
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 150)})`;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

createParticleSystem();

// Console easter egg
console.log('%c👾 SYSTEM ONLINE', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? Check out the source at https://github.com/neilyneilynig', 'color: #00ffff; font-size: 12px;');
