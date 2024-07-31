// Function to initialize the background animation
function initBackground() {
    const canvas = document.querySelector('.background');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 200; // Number of particles

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1 + 1, // Adjusted radius for smaller dots
            color: 'rgba(0, 255, 255, 0.8)', // Aqua color
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Fully black background
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
                if (distance < 80) { // Adjusted distance for more connections
                    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)'; // Aqua color
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

// Call the function to initialize the background animation
initBackground(); // Ensure this is called to start the animation

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = '-60px'; // Hide header on scroll down
    } else {
        header.style.top = '0'; // Show header on scroll up
    }
    lastScrollTop = scrollTop;
});

function addHoverEffect(element) {
    element.addEventListener("mouseover", function () {
        element.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // Change background color on hover
        element.style.transform = "scale(1.05)"; // Scale up the segment on hover
        element.style.transition = "background-color 0.3s, transform 0.3s"; // Add smooth transition
    });
    
    element.addEventListener("mouseout", function () {
        element.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // Reset background color when not hovered
        element.style.transform = "scale(1)"; // Reset scale
    });

    // For touch devices
    element.addEventListener("touchstart", function () {
        element.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // Change background color on tap
        element.style.transform = "scale(1.05)"; // Scale up the segment on tap
    });

    element.addEventListener("touchend", function () {
        element.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // Reset background color when not tapped
        element.style.transform = "scale(1)"; // Reset scale
    });
}

// Apply hover/tap effect to all article segments
const articleSegments = document.querySelectorAll("article");
articleSegments.forEach(addHoverEffect);

// Loading screen effect
window.addEventListener("load", function() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 500);
});