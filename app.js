import { initCalculator } from "./modules/calculator.js";
import { initDelivery } from "./modules/delivery.js";
import { initTemplates } from "./modules/templates.js";
import { initShipping } from "./modules/shipping.js";
import { initSettings } from "./modules/settings.js";
import { initKazuCard } from "./modules/kazucard.js";

document.addEventListener("DOMContentLoaded", () => {
  // Manejo de Toast
  const toast = document.getElementById("hub-toast");
  function showToast(msg = "¡Copiado al portapapeles con éxito! 📋") {
    toast.textContent = msg;
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 2400);
  }

  // Copia segura al portapapeles con microinteracción visual
  function copyToClipboard(text, successMsg, triggerBtn = null) {
    if (!text || text.trim() === "") return;
    const triggerVisualFeedback = () => {
      if (triggerBtn) {
        triggerBtn.classList.add("copied");
        setTimeout(() => triggerBtn.classList.remove("copied"), 600);
      }
      showToast(successMsg);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        triggerVisualFeedback();
      }).catch(err => {
        console.error("Fallo al copiar con Clipboard API:", err);
        fallbackCopy(text, triggerVisualFeedback);
      });
    } else {
      fallbackCopy(text, triggerVisualFeedback);
    }
  }

  function fallbackCopy(text, callback) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      if (callback) callback();
    } catch (e) {
      console.error("Fallo execCommand:", e);
    }
    document.body.removeChild(ta);
  }

  // Apertura directa de WhatsApp
  function openWhatsApp(text) {
    if (!text || text.trim() === "") return;
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank", "noopener,noreferrer");
  }

  // Sistema de Pestañas / Tabs accesible (WAI-ARIA Tabs pattern)
  const tabButtons = Array.from(document.querySelectorAll(".nav-tab"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

  function activateTab(tabBtn, setFocus = true) {
    const targetId = tabBtn.getAttribute("data-tab");

    tabButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
      b.setAttribute("tabindex", "-1");
    });
    tabPanels.forEach(p => p.classList.remove("active"));

    tabBtn.classList.add("active");
    tabBtn.setAttribute("aria-selected", "true");
    tabBtn.setAttribute("tabindex", "0");
    if (setFocus) tabBtn.focus();

    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  }

  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => activateTab(btn, false));

    btn.addEventListener("keydown", (e) => {
      let targetIndex = null;
      if (e.key === "ArrowRight") {
        targetIndex = (index + 1) % tabButtons.length;
      } else if (e.key === "ArrowLeft") {
        targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      } else if (e.key === "Home") {
        targetIndex = 0;
      } else if (e.key === "End") {
        targetIndex = tabButtons.length - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        activateTab(tabButtons[targetIndex], true);
      }
    });
  });

  // Inicialización de submódulos
  initCalculator();
  initDelivery(showToast);
  initTemplates();
  initShipping();
  initSettings(showToast);
  initKazuCard(showToast);

  // Bindings de botones de Acción Global
  const copyComboBtn = document.getElementById("copy-combo-msg");
  copyComboBtn?.addEventListener("click", () => {
    const text = document.getElementById("combo-message-textarea").value;
    copyToClipboard(text, "¡Cotización copiada al portapapeles! 📋", copyComboBtn);
  });

  document.getElementById("send-combo-wa")?.addEventListener("click", () => {
    const text = document.getElementById("combo-message-textarea").value;
    openWhatsApp(text);
  });

  const copyDeliveryBtn = document.getElementById("copy-delivery-msg");
  copyDeliveryBtn?.addEventListener("click", () => {
    const text = document.getElementById("delivery-message-textarea").value;
    copyToClipboard(text, "¡Mensaje de entrega copiado! 🔑", copyDeliveryBtn);
  });

  document.getElementById("send-delivery-wa")?.addEventListener("click", () => {
    const text = document.getElementById("delivery-message-textarea").value;
    openWhatsApp(text);
  });

  const copyTemplateBtn = document.getElementById("copy-template-btn");
  copyTemplateBtn?.addEventListener("click", () => {
    const text = document.getElementById("template-editor-textarea").value;
    copyToClipboard(text, "¡Plantilla copiada al portapapeles! 💬", copyTemplateBtn);
  });

  document.getElementById("send-template-wa")?.addEventListener("click", () => {
    const text = document.getElementById("template-editor-textarea").value;
    openWhatsApp(text);
  });

  const copyShippingBtn = document.getElementById("copy-shipping-msg");
  copyShippingBtn?.addEventListener("click", () => {
    const text = document.getElementById("shipping-message-textarea").value;
    copyToClipboard(text, "¡Coordinación de despacho copiada! 🛵", copyShippingBtn);
  });

  document.getElementById("send-shipping-wa")?.addEventListener("click", () => {
    const text = document.getElementById("shipping-message-textarea").value;
    openWhatsApp(text);
  });
});
