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
    const emailLink = document.getElementById("contact-email");
    const linkedinLink = document.getElementById("contact-linkedin");
    const githubLink = document.getElementById("contact-github");
    const isIconOnly = (link) => link?.dataset.iconOnly === "true";

    if (contactRoot) {
        const email = (contactRoot.dataset.email || "tuemail@dominio.com").trim();
        const linkedin = (contactRoot.dataset.linkedin || "https://linkedin.com/in/tuusuario").trim();
        const github = (contactRoot.dataset.github || "https://github.com/tuusuario").trim();

        if (emailLink) {
            emailLink.href = `mailto:${email}`;
            emailLink.dataset.email = email;
            if (isIconOnly(emailLink)) {
                emailLink.title = email;
            } else {
                emailLink.textContent = email;
            }
        }

        if (linkedinLink) {
            linkedinLink.href = linkedin;
            const linkedinLabel = linkedin.replace(/^https?:\/\//, "");
            if (isIconOnly(linkedinLink)) {
                linkedinLink.title = linkedinLabel;
            } else {
                linkedinLink.textContent = linkedinLabel;
            }
        }

        if (githubLink) {
            githubLink.href = github;
            const githubLabel = github.replace(/^https?:\/\//, "");
            if (isIconOnly(githubLink)) {
                githubLink.title = githubLabel;
            } else {
                githubLink.textContent = githubLabel;
            }
        }
    }

    const copyButton = document.getElementById("copy-email");
    const feedback = document.getElementById("copy-feedback");

    if (copyButton && emailLink) {
        const defaultLabel = copyButton.textContent.trim();

        copyButton.addEventListener("click", async () => {
            const email = (emailLink.dataset.email || emailLink.textContent || "").trim();
            if (!email) return;

            try {
                await navigator.clipboard.writeText(email);
                copyButton.textContent = "Copiado";
                if (feedback) feedback.textContent = "Correo copiado al portapapeles.";

                setTimeout(() => {
                    copyButton.textContent = defaultLabel;
                }, 2000);
            } catch (error) {
                if (feedback) feedback.textContent = "No se pudo copiar automáticamente. Puedes copiarlo manualmente.";
            }
        });
    }

    const quickForm = document.getElementById("quickContactForm");
    const quickFormFeedback = document.getElementById("quick-form-feedback");

    if (quickForm && emailLink) {
        quickForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = document.getElementById("quick-name");
            const emailInput = document.getElementById("quick-email");
            const messageInput = document.getElementById("quick-message");

            const name = (nameInput?.value || "").trim();
            const senderEmail = (emailInput?.value || "").trim();
            const message = (messageInput?.value || "").trim();
            const emailIsValid = Boolean(senderEmail) && Boolean(emailInput?.checkValidity());

            if (!emailIsValid || !message) {
                if (quickFormFeedback) {
                    quickFormFeedback.textContent = "Completa un email válido y el mensaje para continuar.";
                }
                return;
            }

            const destination = (emailLink.dataset.email || "tuemail@dominio.com").trim();
            const subject = "Consulta sobre colaboración";
            const bodyLines = [
                `Nombre: ${name || "No informado"}`,
                `Email: ${senderEmail}`,
                "",
                "Mensaje:",
                message
            ];

            const mailto = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
            window.location.href = mailto;

            if (quickFormFeedback) {
                quickFormFeedback.textContent = "Se abrió tu cliente de correo para continuar con el envío.";
            }
        });
    }
});
