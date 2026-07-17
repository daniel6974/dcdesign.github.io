const contactForm = document.querySelector(".contact-form");
const formAlert = document.querySelector(".form-alert");
const yearTarget = document.querySelector("#currentYear");
const revealElements = document.querySelectorAll(".reveal-up");
const tiltSurfaces = document.querySelectorAll(".tilt-surface");
const navLinks = document.querySelectorAll(".site-nav .nav-link");
const sections = document.querySelectorAll("main section[id]");
const metricCounts = document.querySelectorAll(".metric-count");
const preloader = document.querySelector(".site-preloader");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

const hidePreloader = () => {
  if (!preloader) {
    return;
  }

  preloader.classList.add("is-hidden");

  window.setTimeout(() => {
    preloader.remove();
  }, 750);
};

if (document.readyState === "complete") {
  hidePreloader();
} else {
  window.addEventListener("load", hidePreloader, { once: true });
}

if (revealElements.length) {
  if (prefersReducedMotion.matches) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }
}

if (tiltSurfaces.length && !prefersReducedMotion.matches) {
  tiltSurfaces.forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      const rect = surface.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width;
      const offsetY = (event.clientY - rect.top) / rect.height;
      const rotateY = (offsetX - 0.5) * 8;
      const rotateX = (0.5 - offsetY) * 8;

      surface.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    surface.addEventListener("pointerleave", () => {
      surface.style.transform = "";
    });
  });
}

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${activeId}`;
          link.classList.toggle("is-active", isActive);
        });
      });
    },
    {
      threshold: 0.45
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (metricCounts.length) {
  const animateCounter = (element) => {
    const target = Number(element.dataset.target || "0");
    const suffix = element.dataset.suffix || "";
    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      element.textContent = `${value}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${target}${suffix}`;
      }
    };

    window.requestAnimationFrame(updateCounter);
  };

  if (prefersReducedMotion.matches) {
    metricCounts.forEach((element) => {
      const suffix = element.dataset.suffix || "";
      element.textContent = `${element.dataset.target || "0"}${suffix}`;
    });
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.55
      }
    );

    metricCounts.forEach((element) => counterObserver.observe(element));
  }
}

if (contactForm) {
  const fields = contactForm.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    field.addEventListener("focus", () => {
      field.classList.add("form-field-active");
    });

    field.addEventListener("blur", () => {
      field.classList.remove("form-field-active");
    });

    field.addEventListener("input", () => {
      if (formAlert) {
        formAlert.hidden = true;
        formAlert.textContent = "";
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const whatsapp = contactForm.dataset.whatsapp;

    if (!name || !email || !service || !message) {
      if (formAlert) {
        formAlert.hidden = false;
        formAlert.textContent = "Completá todos los campos para enviar la consulta por WhatsApp.";
      }
      return;
    }

    const whatsappMessage = [
      "Hola DC Graphics & Web Design, quiero hacer una consulta.",
      "",
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Servicio: ${service}`,
      `Mensaje: ${message}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    if (formAlert) {
      formAlert.hidden = true;
      formAlert.textContent = "";
    }

    window.open(whatsappUrl, "_blank", "noopener");
  });
}
