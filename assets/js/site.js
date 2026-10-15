// Theme toggle, mobile navbar, and publication Abs/Bib toggles (behavior modeled on al-folio).
// Loaded synchronously in <head> so the saved theme applies before first paint.
(function () {
  var root = document.documentElement;

  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem("theme");
  } catch (e) {}
  if (storedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  function setTheme(theme) {
    root.classList.add("transition");
    window.setTimeout(function () {
      root.classList.remove("transition");
    }, 500);
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var themeToggle = document.getElementById("light-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }

    var navToggle = document.querySelector(".navbar-toggler");
    var navMenu = document.getElementById("navbarNav");
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", function () {
        var open = navMenu.classList.toggle("show");
        navToggle.classList.toggle("collapsed", !open);
        navToggle.setAttribute("aria-expanded", String(open));
      });
    }

    // Each entry shows at most one of its abstract / BibTeX panels at a time.
    document.querySelectorAll("ol.bibliography .btn.abstract, ol.bibliography .btn.bibtex").forEach(function (button) {
      button.addEventListener("click", function () {
        var entry = button.closest("li");
        var kind = button.classList.contains("abstract") ? "abstract" : "bibtex";
        var other = kind === "abstract" ? "bibtex" : "abstract";
        var panel = entry.querySelector("div." + kind + ".hidden");
        var otherPanel = entry.querySelector("div." + other + ".hidden");
        var otherButton = entry.querySelector(".btn." + other);

        var open = panel.classList.toggle("open");
        button.setAttribute("aria-expanded", String(open));
        if (otherPanel) otherPanel.classList.remove("open");
        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
      });
    });
  });
})();
