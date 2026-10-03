import { QUICK_TEMPLATES } from "../data/templates-data.js";
import { getSettings } from "./settings.js";

export function initTemplates() {
  const categoryPillsContainer = document.getElementById("template-categories-pills");
  const navContainer = document.getElementById("templates-list-nav");
  const titleDisplay = document.getElementById("template-active-title");
  const editorTextarea = document.getElementById("template-editor-textarea");

  const templateEntries = Object.entries(QUICK_TEMPLATES);
  const categoriesList = ["Todos", "Ventas", "Pagos", "Soporte", "Renovaciones", "Envíos"];
  let activeCategory = "Ventas";
  let activeKey = "saludo_catalogo";

  function renderCategoryPills() {
    if (!categoryPillsContainer) return;
    categoryPillsContainer.innerHTML = "";

    categoriesList.forEach(cat => {
      const isSelected = cat === activeCategory;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-template-cat ${isSelected ? "active" : ""}`;
      btn.textContent = cat;
      btn.setAttribute("aria-selected", isSelected ? "true" : "false");

      btn.addEventListener("click", () => {
        activeCategory = cat;
        renderCategoryPills();
        renderNav();
      });

      categoryPillsContainer.appendChild(btn);
    });
  }

  function renderNav() {
    navContainer.innerHTML = "";
    
    const filtered = templateEntries.filter(([key, t]) => {
      return activeCategory === "Todos" || t.category === activeCategory;
    });

    if (filtered.length === 0) {
      navContainer.innerHTML = '<span style="color:var(--text-dim); font-size:0.8rem; padding:0.5rem;">No hay respuestas en esta categoría.</span>';
      return;
    }

    filtered.forEach(([key, t]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `template-nav-btn ${key === activeKey ? "active" : ""}`;
      btn.textContent = t.title;

      btn.addEventListener("click", () => {
        activeKey = key;
        renderNav();
        loadTemplate(key);
      });

      navContainer.appendChild(btn);
    });

    // Si la plantilla activa no está en la categoría actual, cargar la primera
    if (!filtered.some(([key]) => key === activeKey) && filtered.length > 0) {
      activeKey = filtered[0][0];
      loadTemplate(activeKey);
    }
  }

  function loadTemplate(key) {
    const t = QUICK_TEMPLATES[key];
    if (!t) return;
    const settings = getSettings();
    titleDisplay.textContent = t.title;

    let processedText = t.text
      .replace(/{{YAPE_NUMBER}}/g, settings.yapeNum)
      .replace(/{{YAPE_TITULAR}}/g, settings.yapeName)
      .replace(/{{PLIN_NUMBER}}/g, settings.plinNum)
      .replace(/{{PLIN_TITULAR}}/g, settings.plinName)
      .replace(/{{BCP_ACCOUNT}}/g, settings.bcp)
      .replace(/{{BBVA_ACCOUNT}}/g, settings.bbva)
      .replace(/{{INTERBANK_ACCOUNT}}/g, settings.interbank)
      .replace(/{{SERVICIO}}/g, "Netflix UHD 4K")
      .replace(/{{FECHA_VENCE}}/g, "Mañana")
      .replace(/{{PRECIO_RENO}}/g, "13.00");

    editorTextarea.value = processedText;
  }

  renderCategoryPills();
  renderNav();
  loadTemplate(activeKey);
}
