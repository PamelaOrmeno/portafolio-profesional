// Navegacion one-page y utilidades compartidas.

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("site-nav");
    const navLinks = Array.from(document.querySelectorAll("#mainNav .nav-link"));

    if (nav && navLinks.length) {
        const sections = Array.from(document.querySelectorAll("main section[id]"));
        const navbarCollapseEl = document.getElementById("mainNav");
        const bsCollapse = navbarCollapseEl ? bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl, { toggle: false }) : null;
        const toggler = document.querySelector(".navbar-toggler");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const navHeight = () => (nav ? nav.offsetHeight : 0);

        const setActiveLink = (id) => {
            navLinks.forEach((link) => {
                const href = link.getAttribute("href") || "";
                const isHashLink = href.startsWith("#");
                const isActive = isHashLink && href === `#${id}`;

                link.classList.toggle("active", isActive);
                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else if (isHashLink) {
                    link.removeAttribute("aria-current");
                }
            });
        };

        const smoothScrollTo = (targetId) => {
            const target = document.getElementById(targetId);
            if (!target) return;

            const y = target.getBoundingClientRect().top + window.scrollY - navHeight() + 1;
            window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
        };

        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href") || "";
                if (!href.startsWith("#")) return;

                event.preventDefault();
                const targetId = href.slice(1);
                smoothScrollTo(targetId);
                setActiveLink(targetId);
                history.replaceState(null, "", href);

                if (toggler && window.getComputedStyle(toggler).display !== "none" && bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });

        if (sections.length && "IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveLink(entry.target.id);
                        }
                    });
                },
                {
                    root: null,
                    threshold: 0.45,
                    rootMargin: `-${navHeight()}px 0px -35% 0px`
                }
            );

            sections.forEach((section) => observer.observe(section));
        }

        if (window.location.hash) {
            const initialId = window.location.hash.slice(1);
            if (document.getElementById(initialId)) {
                setTimeout(() => smoothScrollTo(initialId), 120);
                setActiveLink(initialId);
            }
        } else if (document.getElementById("inicio")) {
            setActiveLink("inicio");
        }
    }

    const contactRoot = document.querySelector(".contact-standalone");
    const linkedinLink = document.getElementById("contact-linkedin");
    const githubLink = document.getElementById("contact-github");

    if (contactRoot) {
        const linkedin = (contactRoot.dataset.linkedin || "https://linkedin.com/in/tuusuario").trim();
        const github = (contactRoot.dataset.github || "https://github.com/tuusuario").trim();

        if (linkedinLink) {
            linkedinLink.href = linkedin;
        }

        if (githubLink) {
            githubLink.href = github;
        }
    }

    // === Botón volver arriba ===
    (function () {
        const btn = document.getElementById("back-to-top");
        if (!btn) return;

        const SCROLL_THRESHOLD = 400;

        const toggleVisibility = () => {
            if (window.scrollY > SCROLL_THRESHOLD) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });

        btn.addEventListener("click", () => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });

        toggleVisibility();
    })();
});
