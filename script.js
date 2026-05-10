document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal elements on scroll using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for service cards if needed or just add class
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add staggered animation delay
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Handle form submission UX (Optional, since FormSubmit handles redirect)
    // The form currently uses formsubmit.co which will redirect to a generic thank you page.
    // To make it feel more premium, we could intercept it, but keeping it simple for static HTML.
    
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.style.opacity = '0.8';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch('https://formsubmit.co/ajax/ikkhanbak@gmail.com', {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success || data.success === "true") {
                submitBtn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
                submitBtn.style.background = '#10b981';
                submitBtn.style.borderColor = '#10b981';
                form.reset();
            } else {
                submitBtn.innerHTML = 'Error! Try Again <i class="fa-solid fa-xmark"></i>';
                submitBtn.style.background = '#ef4444';
                submitBtn.style.borderColor = '#ef4444';
            }
            resetButton();
        })
        .catch(error => {
            submitBtn.innerHTML = 'Error! Try Again <i class="fa-solid fa-xmark"></i>';
            submitBtn.style.background = '#ef4444';
            submitBtn.style.borderColor = '#ef4444';
            resetButton();
        });
        
        function resetButton() {
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-arrow-right"></i>';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
            }, 4000);
        }
    });
});
