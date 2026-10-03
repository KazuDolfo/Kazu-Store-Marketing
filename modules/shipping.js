import { CATALOG_PRODUCTS } from "../data/catalog.js";

export function initShipping() {
  const typeBtns = document.querySelectorAll(".shipping-type-selector .btn-pill");
  const productSelect = document.getElementById("ship-product-select");
  const priceInput = document.getElementById("ship-price");
  const zoneSelect = document.getElementById("ship-zone-select");
  const shippingCostInput = document.getElementById("ship-shipping-cost");
  const nameInput = document.getElementById("ship-name");
  const phoneInput = document.getElementById("ship-phone");
  const addressInput = document.getElementById("ship-address");
  const dniInput = document.getElementById("ship-dni");
  const agencySelect = document.getElementById("ship-agency");

  const groupLima = document.getElementById("group-lima-address");
  const groupProv = document.getElementById("group-provincia-details");
  const messageTextarea = document.getElementById("shipping-message-textarea");
  const totalChargeDisplay = document.getElementById("ship-total-charge");

  let currentType = "contraentrega";

  // Llenar productos tech
  CATALOG_PRODUCTS.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = `${p.icon} ${p.name} (S/ ${p.price.toFixed(2)})`;
    opt.setAttribute("data-price", p.price);
    productSelect.appendChild(opt);
  });

  productSelect.addEventListener("change", () => {
    const sel = productSelect.options[productSelect.selectedIndex];
    priceInput.value = sel.getAttribute("data-price") || 49.00;
    updateShippingCalculations();
  });

  if (zoneSelect) {
    zoneSelect.addEventListener("change", () => {
      const cost = parseFloat(zoneSelect.value || 0);
      shippingCostInput.value = cost.toFixed(2);
      updateShippingCalculations();
    });
  }

  typeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      typeBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      currentType = btn.getAttribute("data-shipping");

      if (currentType === "contraentrega") {
        groupLima.classList.remove("hidden");
        groupProv.classList.add("hidden");
        if (zoneSelect) zoneSelect.parentElement.classList.remove("hidden");
      } else {
        groupLima.classList.remove("hidden");
        groupProv.classList.remove("hidden");
        if (zoneSelect) zoneSelect.parentElement.classList.add("hidden");
        shippingCostInput.value = "15.00"; // Costo agencia provincia promedio
      }
      updateShippingCalculations();
    });
  });

  function updateShippingCalculations() {
    const productPrice = parseFloat(priceInput.value || 0);
    const shippingFee = parseFloat(shippingCostInput.value || 0);
    const totalToPay = productPrice + shippingFee;

    if (totalChargeDisplay) {
      totalChargeDisplay.textContent = `S/ ${totalToPay.toFixed(2)}`;
    }

    updateShippingMessage(totalToPay, productPrice, shippingFee);
  }

  function updateShippingMessage(totalToPay, productPrice, shippingFee) {
    const product = productSelect.value;
    const name = nameInput.value.trim() || "Cliente";
    const phone = phoneInput.value.trim() || "Por coordinar";
    const address = addressInput.value.trim() || "Por confirmar";

    let message = "";

    if (currentType === "contraentrega") {
      const zoneText = zoneSelect ? zoneSelect.options[zoneSelect.selectedIndex].text : "Lima";

      message = `🛵 *KAZUSTORE - CONFIRMACIÓN CONTRAENTREGA LIMA* 📦

¡Hola ${name}! Tu pedido ha sido agendado para despacho con motorizado directo:

📦 *Producto:* *${product}* (S/ ${productPrice.toFixed(2)})
🛵 *Flete de Envío:* ${shippingFee === 0 ? "¡GRATIS! (Cobertura Chorrillos)" : `S/ ${shippingFee.toFixed(2)} (${zoneText})`}
💰 *MONTO TOTAL AL RECIBIR:* *S/ ${totalToPay.toFixed(2)}*

📍 *Dirección de Entrega:* ${address}
📱 *Teléfono de Contacto:* ${phone}

🛵 *Condiciones de Entrega:*
• El motorizado se comunica 30 minutos antes de llegar a tu destino.
• Puedes pagar en efectivo con importe exacto o vía Yape/Plin al momento de recibir tu producto nuevo y sellado.

¿Nos confirmas si todos los datos están correctos para dar salida a ruta? 👍`;
    } else {
      const dni = dniInput.value.trim() || "Por coordinar";
      const agency = agencySelect.value;

      message = `🚚 *KAZUSTORE - DESPACHO A PROVINCIA (AGENCIA)* 📦

¡Hola ${name}! Tenemos listos tus datos para el envío de tu paquete a provincia:

📦 *Producto:* *${product}* (S/ ${productPrice.toFixed(2)})
🚚 *Costo de Envío:* S/ ${shippingFee.toFixed(2)}
💰 *Total Liquidado:* *S/ ${totalToPay.toFixed(2)}*

👤 *Titular Receptor:* ${name}
🆔 *DNI / CE:* ${dni}
📍 *Destino / Dirección:* ${address}
🏢 *Modalidad:* *${agency}*

⏰ *Seguimiento & Envío:*
• Te enviaremos fotografía del paquete rotulado y el voucher/clave de seguimiento apenas ingrese a la agencia.
• Tiempo estimado de tránsito: 24 a 48 horas hábiles.

¡Muchas gracias por elegir a KazuStore Perú! ⭐`;
    }

    messageTextarea.value = message;
  }

  [priceInput, shippingCostInput, nameInput, phoneInput, addressInput, dniInput, agencySelect].forEach(el => {
    el.addEventListener("input", updateShippingCalculations);
    el.addEventListener("change", updateShippingCalculations);
  });

  updateShippingCalculations();
}
