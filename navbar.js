document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");

  if (!toggle || !menu) return; // Bezpečnostní pojistka

  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-active");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Zavření menu po kliknutí na odkaz
  menu.querySelectorAll(".navbar__link").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
