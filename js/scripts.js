// Navegación one-page y botón volver arriba

document.addEventListener("DOMContentLoaded", () => {

    const nav = document.getElementById("site-nav");
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const navHeight = () => nav ? nav.offsetHeight : 0;

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const isActive = href === `#${id}`;
            link.classList.toggle("active", isActive);
            if (isActive) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });
    };

    const smoothScrollTo = (targetId) => {
        const target = document.getElementById(targetId);
        if (!target) return;
        if (targetId === "inicio") {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
            return;
        }
        const offset = navHeight() - 1;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href") || "";
            if (!href.startsWith("#")) return;
            e.preventDefault();
            const targetId = href.slice(1);
            smoothScrollTo(targetId);
            setActiveLink(targetId);
            history.replaceState(null, "", href);
            document.getElementById("mainNav")?.classList.remove("open");
            document.getElementById("navToggler")?.setAttribute("aria-expanded", "false");
        });
    });

    if (sections.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveLink(entry.target.id);
                });
            },
            { root: null, threshold: 0.35, rootMargin: `-${navHeight()}px 0px -35% 0px` }
        );
        sections.forEach((s) => observer.observe(s));
    }

    if (window.location.hash) {
        const id = window.location.hash.slice(1);
        if (document.getElementById(id)) {
            setTimeout(() => smoothScrollTo(id), 120);
            setActiveLink(id);
        }
    }

    const toggler = document.getElementById("navToggler");
    const mobileMenu = document.getElementById("mainNav");

    if (toggler && mobileMenu) {
        toggler.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("open");
            toggler.setAttribute("aria-expanded", String(isOpen));
        });
    }

    document.querySelectorAll(".acc-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const body = document.getElementById(targetId);
            const isOpen = btn.classList.contains("open");

            document.querySelectorAll(".acc-btn").forEach((b) => {
                b.classList.remove("open");
                b.setAttribute("aria-expanded", "false");
                const id = b.getAttribute("data-target");
                document.getElementById(id)?.classList.add("hidden");
            });

            if (!isOpen && body) {
                btn.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
                body.classList.remove("hidden");
            }
        });
    });

    const backBtn = document.getElementById("back-to-top");
    if (backBtn) {
        const toggle = () => {
            backBtn.classList.toggle("visible", window.scrollY > 400);
        };
        window.addEventListener("scroll", toggle, { passive: true });
        toggle();

        backBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        });
    }
});
