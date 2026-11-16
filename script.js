/* =========================================
   SAUBEREI - WEBSITE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------
     MOBILE NAVIGATION
  --------------------------------------- */

  const menuToggle = document.getElementById("menuToggle");
  const mainNavigation = document.getElementById("mainNavigation");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

  function openMenu() {
    if (!menuToggle || !mainNavigation) return;

    mainNavigation.classList.add("open");
    menuToggle.classList.add("active");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Menü schließen");
  }

  function closeMenu() {
    if (!menuToggle || !mainNavigation) return;

    mainNavigation.classList.remove("open");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menü öffnen");
  }

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNavigation.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMenu();
      }
    });
  }


  /* ---------------------------------------
     REVEAL ANIMATIONS
  --------------------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  /* ---------------------------------------
     CURRENT YEAR
  --------------------------------------- */

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ---------------------------------------
     CONTACT FORM
     GitHub Pages has no server-side form handler.
     This creates an email draft in the visitor's
     default email application.
  --------------------------------------- */

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  const companyEmail = "info@sauberei-berlin.de";

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();
      const privacyConsent = document.getElementById("privacyConsent");

      if (!privacyConsent.checked) {
        showFormMessage(
          "Bitte bestätigen Sie, dass Sie die Datenschutzhinweise zur Kenntnis genommen haben.",
          "error"
        );
        privacyConsent.focus();
        return;
      }

      if (!name || !email || !service || !message) {
        showFormMessage(
          "Bitte füllen Sie alle Pflichtfelder aus.",
          "error"
        );
        return;
      }

      const subject = "Reinigungsanfrage über die Website";

      const body = [
        "Guten Tag Sauberei-Team,",
        "",
        "ich möchte eine unverbindliche Anfrage stellen.",
        "",
        "Name: " + name,
        "E-Mail: " + email,
        "Telefon: " + (phone || "Nicht angegeben"),
        "Gewünschte Leistung: " + service,
        "",
        "Nachricht:",
        message,
        "",
        "Mit freundlichen Grüßen",
        name
      ].join("\n");

      const mailtoLink =
        "mailto:" + companyEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      showFormMessage(
        "Ihr E-Mail-Programm wird geöffnet. Bitte prüfen Sie Ihre Nachricht und senden Sie die E-Mail dort ab.",
        "success"
      );

      window.location.href = mailtoLink;
    });
  }

  function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.classList.remove("error", "success");
    formMessage.classList.add(type);
  }


  /* ---------------------------------------
     SMOOTH SCROLL FOR INTERNAL LINKS
  --------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });


  /* ---------------------------------------
     CLOSE MOBILE MENU AFTER OUTSIDE CLICK
  --------------------------------------- */

  document.addEventListener("click", (event) => {
    if (!mainNavigation || !menuToggle) return;

    const clickedInsideMenu = mainNavigation.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (
      mainNavigation.classList.contains("open") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {
      closeMenu();
    }
  });

});
