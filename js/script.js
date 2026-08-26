/* ==========================================================================
   STUDENT PORTFOLIO WEBSITE
   RESPONSIVE VANILLA JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================================
       1. ELEMENT REFERENCES
       ====================================================================== */

    const navbar = document.getElementById("navbar");
    const scrollTopBtn = document.getElementById("scroll-top-btn");
    const currentYearSpan = document.getElementById("current-year");

    const hamburger = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");


    /* ======================================================================
       2. CURRENT YEAR
       ====================================================================== */

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    /* ======================================================================
       3. NAVBAR + BACK TO TOP
       ====================================================================== */

    function handleScroll() {

        const scrollPosition = window.scrollY;

        /* Sticky navbar */

        if (navbar) {

            if (scrollPosition > 40) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }

        }


        /* Back to top button */

        if (scrollTopBtn) {

            if (scrollPosition > 500) {
                scrollTopBtn.classList.add("active");
            } else {
                scrollTopBtn.classList.remove("active");
            }

        }

    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();


    /* ======================================================================
       4. BACK TO TOP
       ====================================================================== */

    if (scrollTopBtn) {

        scrollTopBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ======================================================================
       5. MOBILE HAMBURGER MENU
       ====================================================================== */

    function closeMobileMenu() {

        if (hamburger) {
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        document.body.classList.remove("menu-open");

    }


    function openMobileMenu() {

        if (hamburger) {
            hamburger.classList.add("active");
            hamburger.setAttribute("aria-expanded", "true");
        }

        if (navLinks) {
            navLinks.classList.add("active");
        }

        document.body.classList.add("menu-open");

    }


    if (hamburger && navLinks) {

        hamburger.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                navLinks.classList.contains("active");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }


    /* Close menu when clicking a navigation item */

    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

        if (!hamburger || !navLinks) {
            return;
        }

        const clickedInsideButton =
            hamburger.contains(event.target);

        const clickedInsideMenu =
            navLinks.contains(event.target);

        if (!clickedInsideButton && !clickedInsideMenu) {

            closeMobileMenu();

        }

    });


    /* Close mobile menu with Escape */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* Close mobile menu if screen becomes desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {

            closeMobileMenu();

        }

    });


    /* ======================================================================
       6. TYPING ANIMATION
       ====================================================================== */

    const typingText =
        document.getElementById("typing-text");

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

        if (!typingText) {
            return;
        }

        const currentTitle =
            titles[titleIndex];


        /* Write */

        if (!isDeleting) {

            typingText.textContent =
                currentTitle.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;

            typeSpeed = 90;

        }


        /* Delete */

        else {

            typingText.textContent =
                currentTitle.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;

            typeSpeed = 45;

        }


        /* Finished typing */

        if (
            !isDeleting &&
            charIndex === currentTitle.length
        ) {

            isDeleting = true;

            typeSpeed = 2000;

        }


        /* Finished deleting */

        else if (
            isDeleting &&
            charIndex === 0
        ) {

            isDeleting = false;

            titleIndex =
                (titleIndex + 1) % titles.length;

            typeSpeed = 500;

        }


        setTimeout(handleTyping, typeSpeed);

    }


    if (typingText) {

        setTimeout(handleTyping, 800);

    }


    /* ======================================================================
       7. SCROLL REVEAL
       ====================================================================== */

    const scrollRevealSections =
        document.querySelectorAll(".scroll-reveal");


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        scrollRevealSections.forEach((section) => {

            sectionObserver.observe(section);

        });

    } else {

        /* Fallback for old browsers */

        scrollRevealSections.forEach((section) => {

            section.classList.add("reveal");

        });

    }


    /* ======================================================================
       8. SKILL PROGRESS BARS
       ====================================================================== */

    const progressBars =
        document.querySelectorAll(".progress-bar-fill");

    const skillListSection =
        document.querySelector(".skills-grid");


    if (
        skillListSection &&
        "IntersectionObserver" in window
    ) {

        const progressObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            progressBars.forEach((bar) => {

                                const percent =
                                    bar.getAttribute(
                                        "data-progress"
                                    );

                                if (percent) {

                                    bar.style.width =
                                        percent;

                                }

                            });

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );


        progressObserver.observe(
            skillListSection
        );

    } else {

        progressBars.forEach((bar) => {

            const percent =
                bar.getAttribute(
                    "data-progress"
                );

            if (percent) {
                bar.style.width = percent;
            }

        });

    }


    /* ======================================================================
       9. ACTIVE NAVIGATION
       ====================================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNavigation() {

        let currentSectionId = "";

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSectionId =
                    section.getAttribute("id");

            }

        });


        navItems.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSectionId}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );

    updateActiveNavigation();


    /* ======================================================================
       10. CONTACT FORM
       ====================================================================== */

    const contactForm =
        document.getElementById("contact-form");

    const nameInput =
        document.getElementById("form-name");

    const emailInput =
        document.getElementById("form-email");

    const subjectInput =
        document.getElementById("form-subject");

    const messageInput =
        document.getElementById("form-message");

    const successBox =
        document.getElementById("form-success-box");


    /* Email validation */

    function isValidEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }


    /* Show error */

    function showError(
        input,
        errorElementId
    ) {

        if (!input) {
            return;
        }

        input.classList.add("invalid");

        const errorElement =
            document.getElementById(
                errorElementId
            );

        if (errorElement) {

            errorElement.style.display =
                "block";

        }

    }


    /* Remove error */

    function removeError(
        input,
        errorElementId
    ) {

        if (!input) {
            return;
        }

        input.classList.remove("invalid");

        const errorElement =
            document.getElementById(
                errorElementId
            );

        if (errorElement) {

            errorElement.style.display =
                "none";

        }

    }


    /* Live validation */

    nameInput?.addEventListener(
        "input",
        () => {
            removeError(
                nameInput,
                "name-error"
            );
        }
    );


    emailInput?.addEventListener(
        "input",
        () => {
            removeError(
                emailInput,
                "email-error"
            );
        }
    );


    subjectInput?.addEventListener(
        "input",
        () => {
            removeError(
                subjectInput,
                "subject-error"
            );
        }
    );


    messageInput?.addEventListener(
        "input",
        () => {
            removeError(
                messageInput,
                "message-error"
            );
        }
    );


    /* Form submission */

    contactForm?.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            let isFormValid = true;


            if (successBox) {

                successBox.style.display =
                    "none";

            }


            /* Name */

            if (
                !nameInput ||
                nameInput.value.trim() === ""
            ) {

                showError(
                    nameInput,
                    "name-error"
                );

                isFormValid = false;

            } else {

                removeError(
                    nameInput,
                    "name-error"
                );

            }


            /* Email */

            const emailValue =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            if (
                !emailValue ||
                !isValidEmail(emailValue)
            ) {

                showError(
                    emailInput,
                    "email-error"
                );

                isFormValid = false;

            } else {

                removeError(
                    emailInput,
                    "email-error"
                );

            }


            /* Subject */

            if (
                !subjectInput ||
                subjectInput.value.trim() === ""
            ) {

                showError(
                    subjectInput,
                    "subject-error"
                );

                isFormValid = false;

            } else {

                removeError(
                    subjectInput,
                    "subject-error"
                );

            }


            /* Message */

            if (
                !messageInput ||
                messageInput.value.trim() === ""
            ) {

                showError(
                    messageInput,
                    "message-error"
                );

                isFormValid = false;

            } else {

                removeError(
                    messageInput,
                    "message-error"
                );

            }


            /* Successful validation */

            if (isFormValid) {

                if (successBox) {

                    successBox.style.display =
                        "flex";

                }


                console.log(
                    "Form Submitted Successfully:",
                    {
                        name:
                            nameInput.value.trim(),

                        email:
                            emailInput.value.trim(),

                        subject:
                            subjectInput.value.trim(),

                        message:
                            messageInput.value.trim()
                    }
                );


                contactForm.reset();

            }

        }
    );


    /* ======================================================================
       11. PREVENT ANCHOR JUMP WHEN MENU IS OPEN
       ====================================================================== */

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(() => {

                updateActiveNavigation();

            }, 300);

        }
    );

});