// Universe Animation
        const canvas = document.getElementById('universe');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
        
        // Star class
        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speed = Math.random() * 0.5;
                this.brightness = Math.random();
                this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
            }
            
            update() {
                this.y += this.speed;
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
                
                // Pulsing brightness
                this.brightness += 0.02 * this.pulseDirection;
                if (this.brightness >= 1 || this.brightness <= 0.3) {
                    this.pulseDirection *= -1;
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
                ctx.fill();
            }
        }
        
        // Create stars
        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push(new Star());
        }
        
        // Shooting stars
        class ShootingStar {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = 0;
                this.speed = Math.random() * 15 + 10;
                this.size = Math.random() * 2 + 1;
                this.length = Math.random() * 50 + 20;
                this.active = true;
            }
            
            update() {
                this.x += this.speed;
                this.y += this.speed;
                
                if (this.x > canvas.width || this.y > canvas.height) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.length, this.y - this.length);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = this.size;
                ctx.stroke();
            }
        }
        
        const shootingStars = [];
        for (let i = 0; i < 3; i++) {
            shootingStars.push(new ShootingStar());
        }
        
        // Animate universe
        function animateUniverse() {
            ctx.fillStyle = 'rgba(10, 10, 22, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw and update stars
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            
            // Draw and update shooting stars
            shootingStars.forEach(star => {
                star.update();
                star.draw();
            });
            
            requestAnimationFrame(animateUniverse);
        }
        
        animateUniverse();
        
        // Particle cursor
        const cursor = document.querySelector('.cursor-follower');
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        updateCursor();
        
        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 22, 0.95)';
                navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 22, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Service tabs functionality
        const serviceTabs = document.querySelectorAll('.service-tab');
        const pricingContents = document.querySelectorAll('.pricing-content');
        
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                serviceTabs.forEach(t => t.classList.remove('active'));
                pricingContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const service = tab.getAttribute('data-service');
                document.getElementById(`${service}-pricing`).classList.add('active');
            });
        });
        
        // Payment tabs functionality
        const paymentTabs = document.querySelectorAll('.payment-tab');
        const paymentContents = document.querySelectorAll('.payment-content');
        
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                paymentTabs.forEach(t => t.classList.remove('active'));
                paymentContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const payment = tab.getAttribute('data-payment');
                document.getElementById(`${payment}-payment`).classList.add('active');
            });
        });
        
        // Payment modal functionality
        const paymentModal = document.getElementById('paymentModal');
        const closeModal = document.getElementById('closeModal');
        
        // Close modal when clicking close button
        closeModal.addEventListener('click', () => {
            paymentModal.classList.remove('active');
        });
        
        // Close modal when clicking outside content
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.classList.remove('active');
            }
        });
        
        // Plan selection functionality
        const planButtons = document.querySelectorAll('.btn-pricing');
        
        planButtons.forEach(button => {
            button.addEventListener('click', () => {
                const plan = button.getAttribute('data-plan');
                const [service, tier] = plan.split('-');
                
                // Update payment summaries with selected plan
                const serviceNames = {
                    'shopify': 'Shopify Development',
                    'etsy': 'Etsy Optimization',
                    'promotion': 'Store Promotion',
                    'webdesign': 'Web Design'
                };
                
                const tierNames = {
                    'basic': 'Basic',
                    'standard': 'Standard',
                    'premium': 'Premium'
                };
                
                const prices = {
                    'shopify-basic': '$299.00',
                    'shopify-standard': '$799.00',
                    'shopify-premium': '$1,499.00',
                    'etsy-basic': '$149.00',
                    'etsy-standard': '$499.00',
                    'etsy-premium': '$999.00',
                    'promotion-basic': '$399.00',
                    'promotion-standard': '$999.00',
                    'promotion-premium': '$1,999.00',
                    'webdesign-basic': '$499.00',
                    'webdesign-standard': '$1,299.00',
                    'webdesign-premium': '$2,999.00'
                };
                
                const serviceName = serviceNames[service];
                const tierName = tierNames[tier];
                const price = prices[plan];
                
                // Update all payment method summaries
                document.querySelectorAll('#crypto-service, #card-service, #paypal-service, #bank-service').forEach(el => {
                    el.textContent = `${serviceName} - ${tierName}`;
                });
                
                document.querySelectorAll('#crypto-amount, #card-amount, #paypal-amount, #bank-amount').forEach(el => {
                    el.textContent = price;
                });
                
                document.querySelectorAll('#crypto-total, #card-total, #paypal-total, #bank-total').forEach(el => {
                    el.textContent = price;
                });
                
                // Show payment modal
                paymentModal.classList.add('active');
            });
        });
        
        // Copy address functionality
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const address = button.getAttribute('data-address');
                
                // Copy to clipboard
                navigator.clipboard.writeText(address).then(() => {
                    // Show success feedback
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                    }, 2000);
                });
            });
        });
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
        
        // Payment form submission
        document.querySelectorAll('.btn-payment').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const paymentMethod = this.closest('.payment-content').id.replace('-payment', '');
                alert(`Thank you for your payment! Your ${paymentMethod} transaction has been processed securely.`);
                paymentModal.classList.remove('active');
            });
        });
        
        // Add hover effect to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-section');
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });
        
        // Add typing effect to hero title
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
          document.addEventListener('DOMContentLoaded', function() {
            const videos = document.querySelectorAll('.portfolio-video');
            const playAllBtn = document.getElementById('playAll');
            const pauseAllBtn = document.getElementById('pauseAll');
            
            // Ensure videos are playing (autoplay might be blocked by some browsers)
            videos.forEach(video => {
                video.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            });
            
            // Play all videos
            playAllBtn.addEventListener('click', function() {
                videos.forEach(video => {
                    video.play();
                });
            });
            
            // Pause all videos
            pauseAllBtn.addEventListener('click', function() {
                videos.forEach(video => {
                    video.pause();
                });
            });
            
            // Add click to play/pause functionality for each video
            videos.forEach(video => {
                video.addEventListener('click', function() {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            });
        });
        // Start typing effect when page loads
        window.addEventListener('load', typeWriter);
    
