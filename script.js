let lastScrollTop = 0;

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const loadingScreen = document.getElementById('loading-screen');

    // Hide header during loading
    header.style.display = 'none';

    // Hide loading screen after content is loaded
    setTimeout(() => {
        loadingScreen.style.opacity = '0'; // Fade out effect
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Remove from DOM
            header.style.display = 'block'; // Show header after loading
        }, 500); // Match the duration of the fade out
    }, 2000); // Adjust the duration as needed

    // Initialize the background animation
    initBackground();

    // Typing effect for "About Me"
    const aboutText = "I'm a web developer passionate about creating stunning, user-friendly websites.";
    typeText(aboutText, document.getElementById('about-text'));

    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            section.style.backgroundPositionY = `${scrollPosition * 0.1}px`;
        });

        // Show back-to-top button
        const backToTopButton = document.getElementById('back-to-top');
        if (scrollPosition > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }

        // Hide header on scroll down, show on scroll up
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            header.style.top = "-100px"; // Hide header
        } else {
            header.style.top = "0"; // Show header
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

        // Show footer when at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            footer.style.bottom = "0"; // Show footer
        } else {
            footer.style.bottom = "-100px"; // Hide footer
        }
    });

    // Smooth scroll to top
    const backToTopButton = document.getElementById('back-to-top');
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: 0.5 });

    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// Function to initialize the background animation
function initBackground() {
    const canvas = document.querySelector('.background');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            color: 'rgba(0, 255, 204, 0.8)',
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black'; // Set background to black
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let particle of particles) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        }

        // Draw lines between particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.strokeStyle = 'rgba(0, 255, 204, 0.5)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// Function for typing effect
function typeText(text, element) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust typing speed here
        }
    }
    type();
}