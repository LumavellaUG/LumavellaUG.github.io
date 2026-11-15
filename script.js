document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ========================================
     1. LANGUAGE SWITCHER — German / Persian
  ======================================== */

  const languageToggle = document.querySelector(".language-toggle");
  const html = document.documentElement;

  let currentLanguage = localStorage.getItem("sauberei-language") || "de";

  const translations = {
    de: {
      // Header
      "nav-home": "Startseite",
      "nav-services": "Leistungen",
      "nav-about": "Über uns",
      "nav-contact": "Kontakt",
      "header-cta": "Angebot anfragen",

      // Hero
      "hero-eyebrow": "Professionelle Gebäudereinigung",
      "hero-title": "Sauberkeit, die Vertrauen schafft.",
      "hero-description":
        "Zuverlässige Reinigungslösungen für Unternehmen, Büros und Immobilien. Gründlich, flexibel und professionell.",
      "hero-button": "Kostenloses Angebot",
      "hero-secondary": "Unsere Leistungen",

      // Trust strip
      "trust-one": "Zuverlässiger Service",
      "trust-two": "Gründliche Reinigung",
      "trust-three": "Flexible Termine",

      // Services
      "services-eyebrow": "Unsere Leistungen",
      "services-title": "Saubere Lösungen für jeden Bedarf",
      "services-description":
        "Von der regelmäßigen Unterhaltsreinigung bis zur gründlichen Gebäudepflege – wir kümmern uns darum.",
      "service-one-title": "Büroreinigung",
      "service-one-text":
        "Saubere und gepflegte Arbeitsplätze für eine angenehme Arbeitsatmosphäre.",
      "service-two-title": "Gebäudereinigung",
      "service-two-text":
        "Professionelle Reinigung von Gebäuden und gewerblichen Immobilien.",
      "service-three-title": "Glas- und Fensterreinigung",
      "service-three-text":
        "Klare Sicht und streifenfreie Fenster für einen gepflegten Eindruck.",
      "service-four-title": "Treppenhausreinigung",
      "service-four-text":
        "Saubere Eingangsbereiche, Treppen und gemeinschaftlich genutzte Flächen.",

      // About
      "about-eyebrow": "Über Sauberei",
      "about-title": "Ihr zuverlässiger Partner für Sauberkeit",
      "about-description":
        "Wir legen Wert auf sorgfältige Arbeit, Zuverlässigkeit und eine vertrauensvolle Zusammenarbeit. Unser Ziel ist es, Ihre Räumlichkeiten sauber und einladend zu halten.",
      "about-button": "Kontakt aufnehmen",

      // Process
      "process-eyebrow": "So funktioniert es",
      "process-title": "In drei Schritten zu mehr Sauberkeit",
      "process-one-title": "Anfrage senden",
      "process-one-text": "Erzählen Sie uns, welche Reinigung Sie benötigen.",
      "process-two-title": "Angebot erhalten",
      "process-two-text": "Wir besprechen gemeinsam die passende Lösung.",
      "process-three-title": "Reinigung starten",
      "process-three-text": "Wir kümmern uns zuverlässig um Ihre Räumlichkeiten.",

      // Quote band
      "quote-title": "Bereit für ein sauberes Ergebnis?",
      "quote-button": "Jetzt anfragen",

      // Contact
      "contact-eyebrow": "Kontakt",
      "contact-title": "Lassen Sie uns sprechen",
      "contact-description":
        "Sie haben Fragen oder möchten ein unverbindliches Angebot? Schreiben Sie uns.",
      "form-name": "Ihr Name",
      "form-email": "Ihre E-Mail-Adresse",
      "form-phone": "Telefonnummer",
      "form-service": "Gewünschte Leistung",
      "form-message": "Ihre Nachricht",
      "form-submit": "Anfrage senden",
      "form-success":
        "Vielen Dank! Ihre Angaben wurden geprüft. Bitte senden Sie die Anfrage über Ihre E-Mail-App.",
      "form-error": "Bitte überprüfen Sie Ihre Eingaben.",

      // Footer
      "footer-description":
        "Professionelle Reinigung mit Sorgfalt und Zuverlässigkeit.",
      "footer-links": "Schnellzugriff",
      "footer-contact": "Kontakt",
      "footer-rights": "Alle Rechte vorbehalten."
    },

    fa: {
      // Header
      "nav-home": "صفحه اصلی",
      "nav-services": "خدمات",
      "nav-about": "درباره ما",
      "nav-contact": "تماس با ما",
      "header-cta": "درخواست قیمت",

      // Hero
      "hero-eyebrow": "خدمات حرفه‌ای نظافت ساختمان",
      "hero-title": "تمیزی، پایه اعتماد است.",
      "hero-description":
        "ارائه خدمات نظافت قابل اعتماد برای شرکت‌ها، دفاتر و ساختمان‌ها؛ با دقت، انعطاف‌پذیری و کیفیت حرفه‌ای.",
      "hero-button": "دریافت پیشنهاد رایگان",
      "hero-secondary": "مشاهده خدمات",

      // Trust strip
      "trust-one": "خدمات قابل اعتماد",
      "trust-two": "نظافت دقیق",
      "trust-three": "زمان‌بندی منعطف",

      // Services
      "services-eyebrow": "خدمات ما",
      "services-title": "راهکارهای نظافت برای هر نیاز",
      "services-description":
        "از نظافت منظم محیط کار تا مراقبت کامل از ساختمان؛ ما همراه شما هستیم.",
      "service-one-title": "نظافت دفاتر",
      "service-one-text":
        "محیط کاری تمیز و مرتب برای ایجاد فضایی دلپذیر و حرفه‌ای.",
      "service-two-title": "نظافت ساختمان",
      "service-two-text":
        "نظافت حرفه‌ای ساختمان‌ها و فضاهای تجاری.",
      "service-three-title": "نظافت شیشه و پنجره",
      "service-three-text":
        "پنجره‌هایی شفاف و بدون لکه برای ظاهری زیبا و مرتب.",
      "service-four-title": "نظافت راه‌پله",
      "service-four-text":
        "نظافت ورودی ساختمان، راه‌پله‌ها و فضاهای مشترک.",

      // About
      "about-eyebrow": "درباره Sauberei",
      "about-title": "همراه قابل اعتماد شما در نظافت",
      "about-description":
        "ما به کیفیت کار، مسئولیت‌پذیری و همکاری قابل اعتماد اهمیت می‌دهیم. هدف ما حفظ پاکیزگی و زیبایی محیط شماست.",
      "about-button": "ارتباط با ما",

      // Process
      "process-eyebrow": "مراحل همکاری",
      "process-title": "نظافتی بهتر در سه مرحله",
      "process-one-title": "ارسال درخواست",
      "process-one-text": "نیاز خود به خدمات نظافت را با ما در میان بگذارید.",
      "process-two-title": "دریافت پیشنهاد",
      "process-two-text": "با هم بهترین راهکار را انتخاب می‌کنیم.",
      "process-three-title": "شروع نظافت",
      "process-three-text": "با اطمینان، نظافت محیط شما را به ما بسپارید.",

      // Quote band
      "quote-title": "برای داشتن محیطی تمیز آماده‌اید؟",
      "quote-button": "درخواست خدمات",

      // Contact
      "contact-eyebrow": "تماس با ما",
      "contact-title": "با ما در ارتباط باشید",
      "contact-description":
        "سؤالی دارید یا می‌خواهید پیشنهاد قیمت دریافت کنید؟ برای ما پیام بفرستید.",
      "form-name": "نام شما",
      "form-email": "آدرس ایمیل شما",
      "form-phone": "شماره تلفن",
      "form-service": "خدمات مورد نیاز",
      "form-message": "پیام شما",
      "form-submit": "ارسال درخواست",
      "form-success":
        "ممنون از شما! اطلاعات بررسی شد. لطفاً درخواست را از طریق برنامه ایمیل خود ارسال کنید.",
      "form-error": "لطفاً اطلاعات واردشده را بررسی کنید.",

      // Footer
      "footer-description":
        "خدمات نظافت حرفه‌ای با دقت و مسئولیت‌پذیری.",
      "footer-links": "دسترسی سریع",
      "footer-contact": "اطلاعات تماس",
      "footer-rights": "تمامی حقوق محفوظ است."
    }
  };

  function changeLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;

    html.lang = language;
    html.dir = language === "fa" ? "rtl" : "ltr";

    document.body.classList.toggle("is-persian", language === "fa");

    // Translate all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const translatedText = translations[language][key];

      if (translatedText) {
        element.textContent = translatedText;
      }
    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      const translatedText = translations[language][key];

      if (translatedText) {
        element.placeholder = translatedText;
      }
    });

    // Update button label
    if (languageToggle) {
      languageToggle.textContent = language === "de" ? "FA" : "DE";
      languageToggle.setAttribute(
        "aria-label",
        language === "de" ? "Switch to Persian" : "تغییر زبان به آلمانی"
      );
    }

    // Update document title
    document.title =
      language === "fa"
        ? "Sauberei | خدمات حرفه‌ای نظافت ساختمان"
        : "Sauberei | Professionelle Gebäudereinigung";

    localStorage.setItem("sauberei-language", language);
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      const nextLanguage = currentLanguage === "de" ? "fa" : "de";
      changeLanguage(nextLanguage);
    });
  }

  changeLanguage(currentLanguage);


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
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    // Close menu after clicking a navigation link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    // Close menu when switching to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }


  /* ========================================
     3. SCROLL REVEAL ANIMATIONS
  ======================================== */

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
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  /* ========================================
     4. CONTACT FORM VALIDATION
  ======================================== */

  const quoteForm = document.querySelector("#quoteForm");

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(quoteForm);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !emailPattern.test(email) || !service || !message) {
        showFormMessage(
          translations[currentLanguage]["form-error"],
          "error"
        );
        return;
      }

      /*
       * This form currently validates the information only.
       * It does not send anything to a server.
       * Connect a backend or email service before using it live.
       */

      const successMessage =
        translations[currentLanguage]["form-success"];

      showFormMessage(successMessage, "success");

      // Prepare an email draft only if a real business email is configured.
      const businessEmail = quoteForm.dataset.email;

      if (businessEmail) {
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

        window.location.href =
          `mailto:${businessEmail}?subject=${subject}&body=${body}`;
      }
    });
  }

  function showFormMessage(message, type) {
    let messageElement = document.querySelector(".form-message");

    if (!messageElement) {
      messageElement = document.createElement("p");
      messageElement.className = "form-message";

      if (quoteForm) {
        quoteForm.appendChild(messageElement);
      }
    }

    messageElement.textContent = message;
    messageElement.classList.remove("success", "error");
    messageElement.classList.add(type);
    messageElement.setAttribute("role", "status");
  }


  /* ========================================
     5. CURRENT YEAR IN FOOTER
  ======================================== */

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* ========================================
     6. SMOOTH SCROLL FOR INTERNAL LINKS
  ======================================== */

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

});
