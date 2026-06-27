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

    // Stats Counter Animation
    const statItems = document.querySelectorAll('.stat-item');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const numberEl = entry.target.querySelector('.stat-number');
                if (numberEl && !numberEl.dataset.animated) {
                    numberEl.dataset.animated = 'true';
                    animateCounter(numberEl);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statItems.forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.15}s`;
        statsObserver.observe(item);
    });

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    // Case Studies Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            caseCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.transitionDelay = '0s';
                } else {
                    card.classList.add('hidden');
                    card.style.transitionDelay = '0s';
                }
            });
        });
    });

    // Animate case cards on scroll
    const caseCardEls = document.querySelectorAll('.case-card');
    const caseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                caseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    caseCardEls.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.12}s`;
        caseObserver.observe(card);
    });

    // Handle form submission UX (Optional, since FormSubmit handles redirect)
    // The form currently uses formsubmit.co which will redirect to a generic thank you page.
    // To make it feel more premium, we could intercept it, but keeping it simple for static HTML.
    
    const form = document.querySelector('.contact-form');
    if (form) {
        const submitBtn = document.querySelector('.submit-btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameVal = document.getElementById('name').value;
            const emailVal = document.getElementById('email').value;
            const messageVal = document.getElementById('message').value;

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
                    
                    // WhatsApp Message trigger
                    const whatsappMsg = `Hello AK Technologies, I would like to get in touch.\n\n*Name:* ${nameVal}\n*Email:* ${emailVal}\n*Message:* ${messageVal}`;
                    const whatsappUrl = `https://wa.me/923319059411?text=${encodeURIComponent(whatsappMsg)}`;
                    window.open(whatsappUrl, '_blank');
                    
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
    }
});
