document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        // Toggle menu visibility
        const isMenuOpen = navMenu.style.display === 'block';
        navMenu.style.display = isMenuOpen ? 'none' : 'block';

        // Toggle hamburger/cross animation
        menuToggle.classList.toggle('active');

        // Toggle body scroll
        if (!isMenuOpen) {
            // When opening menu
            body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            // When closing menu
            body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close menu on window resize if screen becomes larger than mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            navMenu.style.display = '';
            menuToggle.classList.remove('active');
            body.style.overflow = ''; // Restore scrolling
        }
    });
});