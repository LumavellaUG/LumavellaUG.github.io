/* =========================================
   SAUBEREI — WEBSITE INTERACTIONS
   German Only • No Translation • No RTL
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ========================================
     1. FORCE GERMAN / LEFT-TO-RIGHT
  ======================================== */

  document.documentElement.lang = "de";
  document.documentElement.dir = "ltr";

  document.body.classList.remove(
    "is-persian",
    "rtl",
    "persian"
  );

  // Remove any old language switcher from the page
  document.querySelectorAll(".language-toggle").forEach((button) => {
    button.remove();
  });


  /* ========================================
     2. MOBILE NAVIGATION
  ======================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      document.body.classList.toggle("menu-open", isOpen);
    });

    // Close menu when clicking a navigation link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close menu when returning to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }


  /* ========================================
     3. SCROLL REVEAL ANIMATIONS
  ======================================== */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
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
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  /* ========================================
     4. CONTACT FORM
  ======================================== */

  const quoteForm = document.querySelector("#quoteForm");

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(quoteForm);

      const name = String(
        formData.get("name") || ""
      ).trim();

      const email = String(
        formData.get("email") || ""
      ).trim();

      const phone = String(
        formData.get("phone") || ""
      ).trim();

      const service = String(
        formData.get("service") || ""
      ).trim();

      const message = String(
        formData.get("message") || ""
      ).trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate required fields
      if (
        !name ||
        !emailPattern.test(email) ||
        !service ||
        !message
      ) {
        showFormMessage(
          "Bitte überprüfen Sie Ihre Eingaben. Füllen Sie alle Pflichtfelder korrekt aus.",
          "error"
        );

        return;
      }

      // Business email must be configured in the HTML:
      // <form id="quoteForm" data-email="info@example.de">
      const businessEmail = quoteForm.dataset.email;

      if (!businessEmail) {
        showFormMessage(
          "Das Formular wurde geprüft. Für den tatsächlichen Versand muss noch die geschäftliche E-Mail-Adresse eingerichtet werden.",
          "success"
        );

        return;
      }

      const subject = encodeURIComponent(
        `Reinigungsanfrage von ${name}`
      );

      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `E-Mail: ${email}\n` +
        `Telefon: ${phone}\n` +
        `Gewünschte Leistung: ${service}\n\n` +
        `Nachricht:\n${message}`
      );

      const mailtoLink =
        `mailto:${businessEmail}` +
        `?subject=${subject}&body=${body}`;

      showFormMessage(
        "Ihre Anfrage wurde vorbereitet. Ihre E-Mail-App wird geöffnet.",
        "success"
      );

      window.location.href = mailtoLink;
    });
  }

  function showFormMessage(message, type) {
    if (!quoteForm) return;

    let messageElement = quoteForm.querySelector(
      ".form-message"
    );

    if (!messageElement) {
      messageElement = document.createElement("p");
      messageElement.className = "form-message";
      quoteForm.appendChild(messageElement);
    }

    messageElement.textContent = message;

    messageElement.classList.remove(
      "success",
      "error"
    );

    messageElement.classList.add(type);
    messageElement.setAttribute("role", "status");
    messageElement.setAttribute("aria-live", "polite");
  }


  /* ========================================
     5. AUTOMATIC FOOTER YEAR
  ======================================== */

  document.querySelectorAll("[data-current-year]").forEach(
    (element) => {
      element.textContent = new Date().getFullYear();
    }
  );


  /* ========================================
     6. SMOOTH SCROLL
  ======================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });


  /* ========================================
     7. CLOSE MENU WHEN CLICKING OUTSIDE
  ======================================== */

  document.addEventListener("click", (event) => {
    if (!menuToggle || !mainNav) return;

    const clickedInsideMenu =
      mainNav.contains(event.target) ||
      menuToggle.contains(event.target);

    if (!clickedInsideMenu) {
      closeMenu();
    }
  });

});
