// ==============================
// 1. MOBILE NAVIGATION
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after clicking a navigation link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");

            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        });
    });
}


// ==============================
// 2. SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {
    revealElements.forEach(element => {
        element.classList.add("active");
    });
}



// ==============================
// 3. STAGGERED SKILL CARD REVEAL
// ==============================

const skillCards = document.querySelectorAll(".skill-card");

if (!reduceMotion) {

    skillCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 100}ms`;

    });

}


// ==============================
// 4. SCROLL PROGRESS BAR
// ==============================

let scrollTicking = false;

function updateScrollProgress() {

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? window.scrollY / scrollableHeight
        : 0;

    document.documentElement.style.setProperty(
        "--scroll-progress",
        Math.min(Math.max(progress, 0), 1)
    );

    scrollTicking = false;
}

window.addEventListener("scroll", () => {

    if (!scrollTicking) {

        window.requestAnimationFrame(updateScrollProgress);

        scrollTicking = true;
    }

}, { passive: true });

updateScrollProgress();


// ==============================
// 5. ACTIVE NAVIGATION LINK
// ==============================

const pageSections = document.querySelectorAll("main section[id]");

const sectionLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    sectionLinks.forEach(link => {

                        const isCurrent =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle(
                            "is-current",
                            isCurrent
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    pageSections.forEach(section => {
        sectionObserver.observe(section);
    });

}


// ==============================
// 6. AUTOMATIC FOOTER YEAR
// ==============================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}
