let currentLang = localStorage.getItem("lang") || "cs";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // vyber správný slovník
  let dict;
  switch (lang) {
    case "cs":
      dict = lang_cs;
      break;
    case "en":
      dict = lang_en;
      break;
    default:
      dict = lang_cs;
  }

  // projdi všechny prvky s data-key
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

// spustíme při načtení stránky
window.addEventListener("DOMContentLoaded", () => setLang(currentLang));

// dropdown pro výběr jazyka
const langSelect = document.getElementById("langSelect");

// Nastavení aktuálního jazyka při načtení
langSelect.value = localStorage.getItem("lang") || "cs";

// Přepínání jazyka
langSelect.addEventListener("change", () => {
setLang(langSelect.value);
});