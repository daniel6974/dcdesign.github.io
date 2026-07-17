const contactForm = document.querySelector(".contact-form");
const formAlert = document.querySelector(".form-alert");
const yearTarget = document.querySelector("#currentYear");

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

if (contactForm) {
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
