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

    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const overlay = document.getElementById('mobile-overlay');
        if (overlay) {
            overlay.classList.toggle('active');
            if (overlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    };

    // Interactive AI Chatbot Demo
    const initialDemoMessages = [
        { from: 'bot', text: "👋 Hi! I'm your AI Sales Assistant. I help businesses in Pakistan & GCC turn conversations into customers automatically." },
        { from: 'bot', text: "What would you like to automate today? More leads? Faster follow-ups? Or 24/7 WhatsApp support?" }
    ];

    const demoResponses = {
        default: [
            "Great question! Our AI systems can handle that automatically. Would you like to see how we can get you 3x more qualified leads?",
            "Exactly what most of our clients in Karachi & Dubai ask! We've built this for businesses just like yours.",
            "Perfect! Our AI Lead Generation + WhatsApp automation can do this 24/7. Want a quick demo of the results?",
            "Yes! We automate exactly that. Most clients see results in under 30 days. Shall I show you a real case study?"
        ],
        lead: [
            "🚀 Our AI Lead Generation System captures & qualifies leads instantly on your website and WhatsApp.",
            "We can set up smart funnels that bring you 50+ qualified leads every week. Interested?"
        ],
        follow: [
            "✅ AI Sales Automation sends personalized follow-ups automatically — no more lost deals!",
            "We've increased conversion rates by 240% for clinics and real estate agencies using this."
        ],
        whatsapp: [
            "📱 WhatsApp is our specialty! Instant replies, lead qualification, and appointment booking — all automated.",
            "Your customers can book meetings directly in WhatsApp. Want to see it in action?"
        ],
        price: [
            "Our custom AI packages start from PKR 85,000/month with full done-for-you implementation.",
            "You only pay when the system is live and delivering results. No upfront tech fees."
        ],
        hello: [
            "Hello! Great to meet you. How's business going in Pakistan these days?",
            "Hi there! Ready to make your business run on AI autopilot?"
        ]
    };

    function addDemoMessage(from, text) {
        const container = document.getElementById('demo-chat-messages');
        if (!container) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${from}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'chat-avatar';
        avatarDiv.innerHTML = from === 'bot' ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'chat-bubble';
        bubbleDiv.innerHTML = text;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(bubbleDiv);
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    function showTypingIndicator() {
        const container = document.getElementById('demo-chat-messages');
        if (!container) return;
        
        const indicatorDiv = document.createElement('div');
        indicatorDiv.id = 'typing-indicator';
        indicatorDiv.className = 'chat-message bot';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'chat-avatar';
        avatarDiv.innerHTML = '<i class="fa-solid fa-robot"></i>';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'chat-bubble';
        bubbleDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        indicatorDiv.appendChild(avatarDiv);
        indicatorDiv.appendChild(bubbleDiv);
        
        container.appendChild(indicatorDiv);
        container.scrollTop = container.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    function getBotResponse(userText) {
        const lower = userText.toLowerCase();
        if (lower.includes('lead') || lower.includes('customer') || lower.includes('client')) {
            return demoResponses.lead[Math.floor(Math.random() * demoResponses.lead.length)];
        }
        if (lower.includes('follow') || lower.includes('nurture')) {
            return demoResponses.follow[Math.floor(Math.random() * demoResponses.follow.length)];
        }
        if (lower.includes('whatsapp') || lower.includes('chat') || lower.includes('bot')) {
            return demoResponses.whatsapp[Math.floor(Math.random() * demoResponses.whatsapp.length)];
        }
        if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('fee')) {
            return demoResponses.price[Math.floor(Math.random() * demoResponses.price.length)];
        }
        if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
            return demoResponses.hello[Math.floor(Math.random() * demoResponses.hello.length)];
        }
        return demoResponses.default[Math.floor(Math.random() * demoResponses.default.length)];
    }

    window.sendDemoMessage = function() {
        const input = document.getElementById('demo-chat-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        
        addDemoMessage('user', text);
        input.value = '';
        
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(text);
            addDemoMessage('bot', response);
        }, 1000 + Math.random() * 800);
    };

    window.resetDemoChat = function() {
        const container = document.getElementById('demo-chat-messages');
        if (!container) return;
        container.innerHTML = '';
        initialDemoMessages.forEach(msg => addDemoMessage(msg.from, msg.text));
    };

    // Load initial messages if demo is on page
    if (document.getElementById('demo-chat-messages')) {
        window.resetDemoChat();
    }
});
