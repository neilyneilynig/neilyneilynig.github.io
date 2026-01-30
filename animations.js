/**
 * GSAP Animations for Portfolio
 */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Hero animations
    animateHero();
    
    // Floating code window
    animateCodeWindow();
    
    // Project cards on scroll
    animateProjectCards();
    
    // Skills fade in
    animateSkills();
    
    // Smooth parallax background
    animateBackground();
    
    // Cursor follow effect
    initCursorEffect();
});

function animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
    })
    .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
    }, '-=0.4')
    .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
    }, '-=0.6')
    .from('.hero-cta .btn', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
    }, '-=0.4')
    .from('.stat', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
    }, '-=0.4');
    
    // Animate gradient text with shimmer effect
    gsap.to('.gradient-text', {
        backgroundPosition: '200% center',
        ease: 'none',
        duration: 3,
        repeat: -1,
        backgroundSize: '200% 100%',
    });
}

function animateCodeWindow() {
    // Float animation
    gsap.to('.code-window', {
        y: '+=20',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
    });
    
    // Entrance
    gsap.from('.code-window', {
        opacity: 0,
        scale: 0.9,
        rotateY: -15,
        duration: 1.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top center',
        },
    });
    
    // Typing effect on code content
    const codeLines = document.querySelectorAll('.code-content code > *');
    gsap.from(codeLines, {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
            trigger: '.code-window',
            start: 'top 80%',
        },
    });
}

function animateProjectCards() {
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            rotateX: -10,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        });
        
        // Hover animations
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                duration: 0.3,
                ease: 'power2.out',
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 0 0 rgba(99, 102, 241, 0)',
                duration: 0.3,
                ease: 'power2.out',
            });
        });
    });
}

function animateSkills() {
    // Section title
    gsap.from('.skills .section-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
        },
    });
    
    // Skill categories
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
            },
        });
        
        // Skill tags pop in
        const tags = category.querySelectorAll('.skill-tag');
        gsap.from(tags, {
            opacity: 0,
            scale: 0.5,
            stagger: 0.05,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
            },
        });
    });
}

function animateBackground() {
    // Parallax grid
    gsap.to('.bg-grid', {
        backgroundPosition: '100px 100px',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
    });
    
    // Parallax gradient
    gsap.to('.bg-gradient', {
        y: 200,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
        },
    });
}

function initCursorEffect() {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursor.appendChild(cursorDot);
    
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        
        .cursor-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 6px;
            background: var(--primary);
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.hover {
            width: 60px;
            height: 60px;
            border-color: rgba(99, 102, 241, 0.8);
        }
        
        @media (max-width: 968px) {
            .custom-cursor { display: none; }
        }
    `;
    document.head.appendChild(style);
    
    // Cursor movement
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth follow
    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Number counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Magnetic button effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    });
});

// Reveal animations for text
gsap.utils.toArray('.section-title').forEach(title => {
    const words = title.textContent.split(' ');
    title.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    gsap.from(title.querySelectorAll('.word'), {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
        },
    });
});
