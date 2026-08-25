/* ==========================================================================
   STUDENT PORTFOLIO WEBSITE - INTERACTIVITY STACK (VANILLA JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY NAVBAR & BACK TO TOP BUTTON
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const currentYearSpan = document.getElementById('current-year');

    // Dynamic Year for copyright
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    window.addEventListener('scroll', () => {
        // Sticky Header shadow elevation
        if (window.scrollY > 40) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Back to Top Button display
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // Scroll to Top action
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // 2. MOBILE HAMBURGER MENU TOGGLE
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside nav links
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });


    // 3. TYPING ANIMATION (HERO SECTION)
    const typingText = document.getElementById('typing-text');
    const titles = [
        "Aspiring Full Stack Developer",
        "Computer Science Student",
        "Coding Enthusiast"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function handleTyping() {
        if (!typingText) return;
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            // Delete characters
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; // delete faster
        } else {
            // Write characters
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        // State changes
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at full title
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 400; // Pause before typing next
        }

        setTimeout(handleTyping, typeSpeed);
    }

    // Initialize typing loop
    if (typingText) {
        setTimeout(handleTyping, 1000);
    }


    // 4. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // Reveal animated sections
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    scrollRevealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Fill skill progress-bars on entering viewport
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    const skillListSection = document.querySelector('.skills-grid');

    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const percent = bar.getAttribute('data-progress');
                    bar.style.width = percent;
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    if (skillListSection) {
        progressObserver.observe(skillListSection);
    }


    // 5. ACTIVE NAVBAR LINK HIGHLIGHTING
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Offset relative to sticky header height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // 6. CONTACT FORM SUBMISSION & CLIENT-SIDE VALIDATION
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const successBox = document.getElementById('form-success-box');

    // Email regex validation helper
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Input error handling functions
    function showError(input, errorElementId) {
        input.classList.add('invalid');
        document.getElementById(errorElementId).style.display = 'block';
    }

    function removeError(input, errorElementId) {
        input.classList.remove('invalid');
        document.getElementById(errorElementId).style.display = 'none';
    }

    // Add inputs change listener for immediate error removals
    nameInput?.addEventListener('input', () => removeError(nameInput, 'name-error'));
    emailInput?.addEventListener('input', () => removeError(emailInput, 'email-error'));
    subjectInput?.addEventListener('input', () => removeError(subjectInput, 'subject-error'));
    messageInput?.addEventListener('input', () => removeError(messageInput, 'message-error'));

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Reset errors
        successBox.style.display = 'none';

        // 1. Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'name-error');
            isFormValid = false;
        } else {
            removeError(nameInput, 'name-error');
        }

        // 2. Validate Email
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'email-error');
            isFormValid = false;
        } else {
            removeError(emailInput, 'email-error');
        }

        // 3. Validate Subject
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'subject-error');
            isFormValid = false;
        } else {
            removeError(subjectInput, 'subject-error');
        }

        // 4. Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'message-error');
            isFormValid = false;
        } else {
            removeError(messageInput, 'message-error');
        }

        // If form valid, mock submit
        if (isFormValid) {
            successBox.style.display = 'flex';
            
            // Console log details matching requirements
            console.log("Form Submitted Successfully:", {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            });

            // Clear inputs
            contactForm.reset();
        }
    });
});
