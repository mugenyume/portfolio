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
            radius: Math.random() * 2.5 + 2.5, // Reduced radius for smaller dots (50% smaller)
            color: 'rgba(0, 255, 255, 0.8)', // Aqua color
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black'; // Keep background black
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let particle of particles) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;

            // Add shadow for blur effect
            ctx.shadowColor = 'rgba(0, 255, 255, 0.5)'; // Shadow color
            ctx.shadowBlur = 10; // Blur radius
            ctx.fill(); // Fill the particle

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

// ... existing calculator code ...



let result = document.getElementById('result');

// Add '0' when the page loads
result.value = '0';

let isDecimalAllowed = false; // Track whether decimal input is allowed

function appendToResult(value) {
    // If the result is an error, clear it
    if (result.value === 'Error') {
        clearResult();
    }

    if (value === '.') {
        if (isDecimalAllowed) {
            // Prevent multiple decimal points in the same number
            if (result.value.endsWith('.')) {
                return;
            }
        } else {
            isDecimalAllowed = true;
        }
    }

    // Automatically insert '0' before the decimal point if no number is before it
    if (result.value === '0' && value !== '.' && value !== 'C') {
        result.value = '';
    }

    // Automatically remove leading '0' when a new non-zero digit is entered
    if (result.value === '0' && value !== '.' && value !== 'C') {
        result.value = '';
    }

    result.value += value;
}

function clearResult() {
    result.value = '0';
    isDecimalAllowed = false; // Reset decimal input flag when 'C' is pressed
}

function calculateResult() {
    try {
        // Use parseFloat and toFixed for explicit handling of decimals
        const calculatedResult = eval(result.value);
        result.value = parseFloat(calculatedResult).toFixed(2);
    } catch (error) {
        result.value = 'Error';
    }
}

