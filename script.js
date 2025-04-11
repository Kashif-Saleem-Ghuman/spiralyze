document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        // Toggle menu visibility
        navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';

        // Toggle hamburger/cross animation
        menuToggle.classList.toggle('active');

        // Add transition styles when menu is shown
        if (navMenu.style.display === 'block') {
            navMenu.style.position = 'absolute';
            navMenu.style.top = '80px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = '#1B3B36';
            navMenu.style.padding = '20px';
            navMenu.style.zIndex = '10';
        }
    });

    // Close menu on window resize if screen becomes larger than mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            navMenu.style.display = '';
            menuToggle.classList.remove('active');
        }
    });
});