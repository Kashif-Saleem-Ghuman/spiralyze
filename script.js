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



// Caraousel

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Update carousel position
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= slides.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch and mouse events for dragging
    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('touchstart', startDrag, { passive: false });
    
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag, { passive: false });
    
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('touchend', endDrag);
    carousel.addEventListener('mouseleave', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        carousel.classList.add('is-dragging');
        
        // Get initial position
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        currentX = startX;
        
        // Prevent default to avoid text selection
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = x - currentX;
        currentX = x;
        
        // Move the carousel
        const slideWidth = slides[0].offsetWidth;
        const currentTranslate = -currentIndex * slideWidth;
        const newTranslate = currentTranslate + diff;
        
        carousel.style.transform = `translateX(${newTranslate}px)`;
        
        e.preventDefault();
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('is-dragging');
        
        // Determine if we should change slides
        const slideWidth = slides[0].offsetWidth;
        const x = e.type === 'mouseup' ? e.pageX : e.changedTouches[0].pageX;
        const diff = x - startX;
        
        if (Math.abs(diff) > slideWidth / 4) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            updateCarousel(); // Return to current slide
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', updateCarousel);
});