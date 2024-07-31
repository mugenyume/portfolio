// Function to adjust styles for smaller screens
function adjustStylesForSmallScreens() {
    const screenWidth = window.innerWidth;
    const buttons = document.querySelectorAll('.buttons button');

    if (screenWidth < 300) {
        // Apply styles or transformations for screens narrower than 300px
        document.body.style.transform = 'scale(0.8)';
        document.body.style.transformOrigin = 'center';

        const calculator = document.querySelector('.calculator');
        calculator.style.transform = 'scale(1.11)';
        calculator.style.transformOrigin = 'center';
        calculator.style.width = '100%';

        // Make buttons square
        buttons.forEach(button => {
            button.style.padding = '4px'; // Adjust padding to make buttons square
        });
    } else {
        // Reset styles for larger screens
        document.body.style.transform = 'none';

        const calculator = document.querySelector('.calculator');
        calculator.style.transform = 'none';
        calculator.style.width = '350px';

        // Reset button styles to their default size
        buttons.forEach(button => {
            button.style.padding = '20px';
        });
    }
}

// Call the function initially and whenever the window is resized
adjustStylesForSmallScreens();
window.addEventListener('resize', adjustStylesForSmallScreens);
