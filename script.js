/* Lightweight interactions for the portfolio */
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  // Mobile navigation toggle.
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuButton.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
      navLinks.classList.toggle("open", !expanded);
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-shell") && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  // Reveal content as it enters the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Highlight the navigation item for the section currently in view.
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", active);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Dynamic copyright year.
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Validate the form, then open WhatsApp with a prefilled message.
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.textContent = "";
    status.classList.remove("success");

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent =
        "Please complete your name, a valid email address, and your message.";
      return;
    }

    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const date = String(data.get("date") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      status.textContent = "Please complete all required fields.";
      return;
    }

    // Adinan's WhatsApp number (country code included, digits only)
    const whatsappNumber = "971509206998";

    // Build the enquiry message
    const whatsappMessage =
      `Hello Adinan,\n\n` +
      `I would like to make an enquiry through your portfolio website.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "Not provided"}\n` +
      `Preferred appointment date: ${date || "Not specified"}\n\n` +
      `Enquiry: ${message}`;

    // Encode the message for WhatsApp
    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    status.textContent =
      "Opening WhatsApp with your enquiry. Please review the message and press Send.";

    status.classList.add("success");

    // Open WhatsApp
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}
});

// Remove the character after 12 seconds
document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("floatingCharacter");

    if (character) {
        setTimeout(() => {
            character.remove();
        }, 12000);
    }
});