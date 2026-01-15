// Año dinámico
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Animaciones on scroll
  const animatedElements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach(el => observer.observe(el));

  // Detectar si el formulario fue enviado
  const params = new URLSearchParams(window.location.search);
  if (params.get("enviado") === "1") {
    mostrarAlerta("Tu mensaje fue enviado con éxito");
  }
});

// Función para mostrar alerta animada
function mostrarAlerta(mensaje = "Mensaje enviado correctamente") {
  const alerta = document.getElementById("alertaDC");
  const texto = document.getElementById("alertaMensaje");

  texto.textContent = mensaje;
  alerta.classList.add("mostrar");

  setTimeout(() => {
    alerta.classList.add("ocultar");

    setTimeout(() => {
      alerta.classList.remove("mostrar", "ocultar");
    }, 500);
  }, 3000);
}

// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Cargar tema guardado
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Cambiar tema
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  if (body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});