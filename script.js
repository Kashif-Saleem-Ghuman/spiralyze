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

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active', 'next', 'prev');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Touch events
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 50) {
            e.preventDefault();
        }
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const diff = currentX - startX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        isDragging = false;
        startX = 0;
        currentX = 0;
    });

    // Mouse events for desktop
    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });

    carousel.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const diff = currentX - startX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        isDragging = false;
        startX = 0;
        currentX = 0;
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);
});