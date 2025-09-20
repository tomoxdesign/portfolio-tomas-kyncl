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
    case "de":
      dict = lang_de;
      break;
    default:
      dict = lang_cs;
  }

  document.querySelectorAll("[data-key]").forEach((el) => {
    // pokud nemá potomky s data-key, přelož
    if (!el.querySelector("[data-key]")) {
      const key = el.getAttribute("data-key");
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
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
