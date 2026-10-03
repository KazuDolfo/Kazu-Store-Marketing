import { CATALOG_SERVICES, CATALOG_PRODUCTS, CATEGORIES_LIST } from "../data/catalog.js";

export function initCalculator() {
  const allItems = [...CATALOG_SERVICES, ...CATALOG_PRODUCTS];
  let selectedItems = new Map();
  let currentDiscount = 0;
  let customPrice = null;
  let activeCategory = "Todos";

  const catalogGrid = document.getElementById("catalog-selector-grid");
  const catalogSearch = document.getElementById("catalog-search");
  const categoryFilterBar = document.getElementById("category-filter-bar");
  const selectedContainer = document.getElementById("combo-selected-container");
  const clearBtn = document.getElementById("clear-combo-btn");

  const metricCost = document.getElementById("metric-cost");
  const metricRegular = document.getElementById("metric-regular");
  const metricOffer = document.getElementById("metric-offer");
  const metricGain = document.getElementById("metric-gain");
  const metricSavings = document.getElementById("metric-savings");

  const discountButtons = document.querySelectorAll(".btn-discount");
  const customPriceInput = document.getElementById("custom-offer-input");
  const messageTextarea = document.getElementById("combo-message-textarea");

  // Render Barra de Categorías
  function renderCategoryFilters() {
    if (!categoryFilterBar) return;
    categoryFilterBar.innerHTML = "";
    CATEGORIES_LIST.forEach(cat => {
      const isSelected = cat === activeCategory;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-cat-filter ${isSelected ? "active" : ""}`;
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
      btn.addEventListener("click", () => {
        activeCategory = cat;
        renderCategoryFilters();
        renderCatalog(catalogSearch.value);
      });
      categoryFilterBar.appendChild(btn);
    });
  }

  // Render Catálogo con Filtro y Búsqueda
  function renderCatalog(filter = "") {
    catalogGrid.innerHTML = "";
    const filtered = allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(filter.toLowerCase()) ||
                            item.category.toLowerCase().includes(filter.toLowerCase()) ||
                            (item.tag && item.tag.toLowerCase().includes(filter.toLowerCase()));
      const matchesCat = activeCategory === "Todos" || item.category === activeCategory;
      return matchesSearch && matchesCat;
    });

    if (filtered.length === 0) {
      catalogGrid.innerHTML = '<div class="catalog-empty">No se encontraron productos en esta categoría o búsqueda.</div>';
      return;
    }

    filtered.forEach(item => {
      const isSelected = selectedItems.has(item.id);
      const card = document.createElement("button");
      card.type = "button";
      card.className = `catalog-item-btn ${isSelected ? "selected" : ""}`;
      card.setAttribute("aria-pressed", isSelected ? "true" : "false");
      const iconHtml = item.iconImg 
        ? `<img src="${item.iconImg}" alt="${item.name}" class="item-icon-img" style="width: 24px; height: 24px; object-fit: contain;">`
        : `<span class="item-icon">${item.icon}</span>`;

      card.innerHTML = `
        <div class="item-top">
          <div class="item-icon-wrapper">${iconHtml}</div>
          <div class="item-info">
            <h4>${item.name}</h4>
            <span>${item.category} • <strong class="badge-tag">${item.tag || "Disponible"}</strong></span>
          </div>
        </div>
        <div class="item-bottom">
          <span class="item-price">S/ ${item.price.toFixed(2)}</span>
          <span class="item-cost">Costo: S/ ${item.cost.toFixed(2)}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        if (selectedItems.has(item.id)) {
          selectedItems.delete(item.id);
        } else {
          selectedItems.set(item.id, item);
        }
        renderCatalog(catalogSearch.value);
        updateCalculations();
      });

      catalogGrid.appendChild(card);
    });
  }

  // Actualizar Cálculos y Generar Mensaje
  function updateCalculations() {
    renderSelectedList();

    let totalCost = 0;
    let totalRegular = 0;

    selectedItems.forEach(item => {
      totalCost += item.cost;
      totalRegular += item.price;
    });

    let finalPrice = totalRegular;
    if (customPrice !== null && !isNaN(customPrice) && customPrice > 0) {
      finalPrice = customPrice;
    } else if (currentDiscount > 0) {
      finalPrice = totalRegular * (1 - currentDiscount / 100);
      finalPrice = Math.round(finalPrice); // Redondeo comercial
    }

    const netGain = finalPrice - totalCost;
    const clientSavings = totalRegular - finalPrice;
    const savingsPercent = totalRegular > 0 ? Math.round((clientSavings / totalRegular) * 100) : 0;

    metricCost.textContent = `S/ ${totalCost.toFixed(2)}`;
    metricRegular.textContent = `S/ ${totalRegular.toFixed(2)}`;
    metricOffer.textContent = `S/ ${finalPrice.toFixed(2)}`;
    metricGain.textContent = `S/ ${netGain.toFixed(2)}`;

    if (metricSavings) {
      metricSavings.textContent = clientSavings > 0 ? `S/ ${clientSavings.toFixed(2)} (-${savingsPercent}%)` : `S/ 0.00`;
    }

    generateComboMessage(totalRegular, finalPrice, clientSavings, savingsPercent);
  }

  function renderSelectedList() {
    selectedContainer.innerHTML = "";
    if (selectedItems.size === 0) {
      selectedContainer.innerHTML = '<p class="empty-state-text">Selecciona productos del catálogo para calcular tu combo y margen en tiempo real.</p>';
      return;
    }

    selectedItems.forEach(item => {
      const pill = document.createElement("div");
      pill.className = "combo-pill";
      pill.innerHTML = `
        <div class="pill-info">
          <span>${item.icon}</span>
          <strong>${item.name}</strong>
          <span class="pill-tag">${item.category}</span>
        </div>
        <div class="pill-actions">
          <span class="pill-price">S/ ${item.price.toFixed(2)}</span>
          <button class="combo-pill-remove" data-id="${item.id}" title="Quitar">✕</button>
        </div>
      `;
      selectedContainer.appendChild(pill);
    });

    selectedContainer.querySelectorAll(".combo-pill-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        selectedItems.delete(id);
        renderCatalog(catalogSearch.value);
        updateCalculations();
      });
    });
  }

  function generateComboMessage(regularTotal, offerTotal, savings, savingsPercent) {
    if (selectedItems.size === 0) {
      messageTextarea.value = "Selecciona productos arriba para generar tu mensaje de oferta automática listo para WhatsApp.";
      return;
    }

    const itemsArray = Array.from(selectedItems.values());
    let itemsListText = itemsArray.map(item => `• *${item.name}* (Precio regular: ~S/ ${item.price.toFixed(2)}~)`).join("\n");

    const message = `⚡ *KAZUSTORE - COTIZACIÓN ESPECIAL EN COMBO* ⚡

¡Excelente elección! Te preparé un precio exclusivo combinando tus productos:

📦 *Tus servicios seleccionados:*
${itemsListText}

💰 *Precio Regular Total:* ~S/ ${regularTotal.toFixed(2)}~
🎁 *PRECIO COMBO KAZU:* *S/ ${offerTotal.toFixed(2)}*
${savings > 0 ? `✨ *¡Te ahorras S/ ${savings.toFixed(2)} de inmediato (${savingsPercent}% OFF)!*` : ""}

🔒 *Incluye:* Garantía total, soporte continuo y entrega inmediata con activación guiada.
💳 *Medios de Pago:* Yape, Plin o Transferencia bancaria (BCP/BBVA/Interbank).

¿Te paso los accesos y datos de pago para activarlo ahora mismo? 😊`;

    messageTextarea.value = message;
  }

  // Event Listeners
  catalogSearch.addEventListener("input", (e) => {
    renderCatalog(e.target.value);
  });

  clearBtn.addEventListener("click", () => {
    selectedItems.clear();
    currentDiscount = 0;
    customPrice = null;
    customPriceInput.value = "";
    discountButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    const defaultBtn = document.querySelector('.btn-discount[data-discount="0"]');
    if (defaultBtn) {
      defaultBtn.classList.add("active");
      defaultBtn.setAttribute("aria-pressed", "true");
    }
    renderCatalog();
    updateCalculations();
  });

  discountButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      discountButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      currentDiscount = parseInt(btn.getAttribute("data-discount"), 10);
      customPrice = null;
      customPriceInput.value = "";
      updateCalculations();
    });
  });

  customPriceInput.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
      customPrice = val;
      discountButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
    } else {
      customPrice = null;
    }
    updateCalculations();
  });

  // Init
  renderCategoryFilters();
  renderCatalog();
  updateCalculations();
}
