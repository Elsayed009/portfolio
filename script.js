
document.addEventListener('DOMContentLoaded', () => {
    // calling all functions
    initNavbar();
    initTypedText();
    initSkillsAnimation();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initPortfolioHover();
    initFormSubmission();
    initVideoSlider();
    initSliderToggle();
    initThemeToggle();
});

// Slider Toggle Functionality

function initSliderToggle() {
    const slider = document.getElementById('videoSlider');
    const toggleBtn = document.getElementById('sliderToggle');
    const sliderIcon = document.getElementById('sliderIcon');
    
    if (toggleBtn && slider) {
        // Set initial icon based on slider state (starts collapsed/hidden)
        if (slider.classList.contains('collapsed')) {
            sliderIcon.classList.remove('fa-chevron-left');
            sliderIcon.classList.add('fa-chevron-right'); // Right arrow means "show"
        }
        
        toggleBtn.addEventListener('click', () => {
            slider.classList.toggle('collapsed');
            
            // Toggle icon direction
            if (slider.classList.contains('collapsed')) {
                // Slider is hidden - show right arrow to indicate "show more"
                sliderIcon.classList.remove('fa-chevron-left');
                sliderIcon.classList.add('fa-chevron-right');
            } else {
                // Slider is visible - show left arrow to indicate "hide"
                sliderIcon.classList.remove('fa-chevron-right');
                sliderIcon.classList.add('fa-chevron-left');
            }
        });
    }
}

//  Light/Dark Mode
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            if (newTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
            
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Video Slidebar
function initVideoSlider() {
    const videoItems = document.querySelectorAll('.video-item');
    const videoFrame = document.getElementById('video-frame');
    const closeBtn = document.getElementById('closeSliderBtn');
    const slider = document.getElementById('videoSlider');
    const sliderIcon = document.getElementById('sliderIcon');

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.getAttribute('data-video');
            
            videoItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            if (videoFrame && videoUrl) {
                videoFrame.src = videoUrl;
            }
        });
    });
    
    if (closeBtn && slider) {
        closeBtn.addEventListener('click', () => {
            slider.classList.add('collapsed');
            // Update toggle button icon
            if (sliderIcon) {
                sliderIcon.classList.remove('fa-chevron-left');
                sliderIcon.classList.add('fa-chevron-right');
            }
        });
    }
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Typed Text Animation
function initTypedText() {
    const typedText = document.querySelector('.typed-text');
    const texts = ['Full Stack Developer', 'Web Designer', 'React Developer', 'Node.js Expert'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typedText) {
        type();
    }
}

// Skills Scroll
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-progress');
    
    if (skillItems.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Portfolio Hover Effect
function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
}

// 
// Form Submission
// 
function initFormSubmission() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS credentials
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    alert('Thank you for your message! I will get back to you soon.');
                    form.reset();
                }, function(error) {
                    console.error('FAILED...', error);
                    alert('Sorry, something went wrong. Please try again later.');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
}


// Reveal Animations on Scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Header Animation on Load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
});

// Active Navigation Highlight
function setActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

setActiveNav();
