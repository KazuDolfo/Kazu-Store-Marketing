import { dbService } from "./supabase-client.js";

export function initKazuCard(showToast) {
  const phoneInput = document.getElementById("kc-phone-input");
  const amountInput = document.getElementById("kc-amount-input");
  const actionSelect = document.getElementById("kc-action-select");
  const reasonInput = document.getElementById("kc-reason-input");
  const registerBtn = document.getElementById("kc-register-btn");
  const statusEl = document.getElementById("kc-status-feedback");
  const messageResult = document.getElementById("kc-message-result");
  const copyBtn = document.getElementById("kc-copy-msg-btn");

  const statGross = document.getElementById("cloud-metric-gross");
  const statProfit = document.getElementById("cloud-metric-profit");
  const statClients = document.getElementById("cloud-metric-clients");
  const expiringListEl = document.getElementById("cloud-expiring-list");
  const refreshCloudBtn = document.getElementById("refresh-cloud-btn");

  async function loadMetrics() {
    if (statGross) statGross.textContent = "Cargando...";
    const metrics = await dbService.getDashboardMetrics();
    if (metrics) {
      if (statGross) statGross.textContent = `S/ ${parseFloat(metrics.total_gross_sales || 0).toFixed(2)}`;
      if (statProfit) statProfit.textContent = `S/ ${parseFloat(metrics.total_net_profit || 0).toFixed(2)}`;
      if (statClients) statClients.textContent = metrics.total_registered_clients || 0;
    } else {
      if (statGross) statGross.textContent = "S/ 0.00";
      if (statProfit) statProfit.textContent = "S/ 0.00";
      if (statClients) statClients.textContent = "0";
    }
  }

  const clientsListEl = document.getElementById("clients-list-container");
  const searchClientsInput = document.getElementById("kc-search-clients");
  const alertExpiringCount = document.getElementById("alert-expiring-count");
  const openExpiringModalBtn = document.getElementById("btn-open-expiring-modal");
  const closeExpiringModalBtn = document.getElementById("close-expiring-modal");
  const expiringModalOverlay = document.getElementById("expiring-modal-overlay");

  let allClientsData = [];

  function openExpiringModal() {
    if (!expiringModalOverlay) return;
    expiringModalOverlay.style.display = "grid";
    expiringModalOverlay.classList.remove("hidden");
  }

  function closeExpiringModal() {
    if (!expiringModalOverlay) return;
    expiringModalOverlay.style.display = "none";
    expiringModalOverlay.classList.add("hidden");
  }

  openExpiringModalBtn?.addEventListener("click", openExpiringModal);
  closeExpiringModalBtn?.addEventListener("click", closeExpiringModal);
  expiringModalOverlay?.addEventListener("click", (e) => {
    if (e.target === expiringModalOverlay) closeExpiringModal();
  });

  async function loadClients() {
    if (!clientsListEl) return;
    clientsListEl.innerHTML = '<span class="text-dim" style="font-size:0.8rem; padding:0.5rem;">Consultando clientes...</span>';
    allClientsData = await dbService.getAllClients();
    renderClients(allClientsData);
    if (statClients) statClients.textContent = allClientsData.length;
  }

  function renderClients(clients) {
    if (!clientsListEl) return;
    clientsListEl.replaceChildren();

    if (!clients || clients.length === 0) {
      const emptySpan = document.createElement("span");
      emptySpan.className = "text-dim";
      emptySpan.style.cssText = "font-size:0.8rem; padding:0.5rem;";
      emptySpan.textContent = "No se encontraron clientes registrados.";
      clientsListEl.appendChild(emptySpan);
      return;
    }

    clients.forEach(c => {
      const row = document.createElement("div");
      row.className = "client-item-row";
      row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.5rem 0.75rem; cursor:pointer; transition:all 0.15s ease;";

      const infoBox = document.createElement("div");
      infoBox.style.cssText = "display:flex; flex-direction:column; gap:2px;";

      const nameStrong = document.createElement("strong");
      nameStrong.style.cssText = "font-size:0.82rem; color:var(--text-main);";
      nameStrong.textContent = c.nickname || c.name || "Cliente KazuStore";

      const phoneSpan = document.createElement("small");
      phoneSpan.style.cssText = "font-size:0.75rem; color:var(--color-cyan);";
      phoneSpan.textContent = `📱 ${c.phone || "Sin tel"} · Ref: ${c.referral_code || 'KZ-VIP'}`;

      infoBox.appendChild(nameStrong);
      infoBox.appendChild(phoneSpan);

      const badgesBox = document.createElement("div");
      badgesBox.style.cssText = "display:flex; gap:6px; align-items:center;";

      const stampsBadge = document.createElement("span");
      const balance = c.stamps_balance || 0;
      stampsBadge.style.cssText = `background:${balance >= 5 ? 'rgba(5,150,105,0.2)' : 'rgba(2,132,199,0.15)'}; color:${balance >= 5 ? '#10b981' : '#38bdf8'}; border:1px solid ${balance >= 5 ? '#059669' : '#0284c7'}; font-size:0.74rem; font-weight:700; padding:2px 7px; border-radius:10px;`;
      stampsBadge.textContent = `${balance} Puntos`;

      const viewBtn = document.createElement("a");
      viewBtn.href = `https://kazudolfo.github.io/kazu-store/?tel=${encodeURIComponent(c.phone)}#kazupuntos`;
      viewBtn.target = "_blank";
      viewBtn.rel = "noopener noreferrer";
      viewBtn.title = "Abrir tarjeta digital del cliente";
      viewBtn.style.cssText = "font-size:0.85rem; text-decoration:none; padding:2px 4px;";
      viewBtn.textContent = "🔗";

      badgesBox.appendChild(stampsBadge);
      badgesBox.appendChild(viewBtn);

      row.appendChild(infoBox);
      row.appendChild(badgesBox);

      // Clic para cargar en el formulario
      row.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "a") return;
        if (phoneInput) phoneInput.value = c.phone;
        if (auditBtn) auditBtn.click();
        row.style.borderColor = "var(--color-cyan)";
        setTimeout(() => row.style.borderColor = "var(--border-subtle)", 400);
      });

      clientsListEl.appendChild(row);
    });
  }

  searchClientsInput?.addEventListener("input", () => {
    const q = (searchClientsInput.value || "").toLowerCase().trim();
    if (!q) {
      renderClients(allClientsData);
      return;
    }
    const filtered = allClientsData.filter(c => {
      return (c.phone && c.phone.includes(q)) ||
             (c.nickname && c.nickname.toLowerCase().includes(q)) ||
             (c.name && c.name.toLowerCase().includes(q)) ||
             (c.referral_code && c.referral_code.toLowerCase().includes(q));
    });
    renderClients(filtered);
  });

  async function loadExpiring() {
    if (!expiringListEl) return;
    expiringListEl.replaceChildren();
    const loadingSpan = document.createElement("span");
    loadingSpan.className = "text-dim";
    loadingSpan.textContent = "Consultando base de datos Supabase...";
    expiringListEl.appendChild(loadingSpan);

    const list = await dbService.getExpiringSubscriptions();
    expiringListEl.replaceChildren();

    const count = list ? list.length : 0;
    if (alertExpiringCount) alertExpiringCount.textContent = count;

    if (!list || list.length === 0) {
      const emptyDiv = document.createElement("div");
      emptyDiv.className = "empty-cloud";
      emptyDiv.textContent = "✅ ¡Excelente! No hay suscripciones en alerta crítica (< 3 días).";
      expiringListEl.appendChild(emptyDiv);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "expiring-items-grid";

    list.forEach(sub => {
      const card = document.createElement("div");
      card.className = "expiring-card";

      const header = document.createElement("div");
      header.className = "expiring-header";

      const strong = document.createElement("strong");
      strong.textContent = String(sub.product_name || "Servicio Digital");

      const badge = document.createElement("span");
      badge.className = "badge-alert";
      badge.textContent = `${Number(sub.days_remaining) || 0} días`;

      header.appendChild(strong);
      header.appendChild(badge);

      const details = document.createElement("div");
      details.className = "expiring-details";

      const phoneSpan = document.createElement("span");
      const phoneText = String(sub.client_phone || "Cliente");
      phoneSpan.textContent = `📱 ${phoneText}`;

      const dateSpan = document.createElement("span");
      dateSpan.textContent = `Vence: ${String(sub.end_date || "Próximamente")}`;

      details.appendChild(phoneSpan);
      details.appendChild(dateSpan);

      // Botón WhatsApp para avisar al cliente
      const waActionRow = document.createElement("div");
      waActionRow.style.cssText = "margin-top:8px; display:flex; justify-content:flex-end;";
      
      const cleanSubPhone = phoneText.replace(/[^\d+]/g, "");
      const waBtn = document.createElement("a");
      waBtn.className = "btn-action btn-wa";
      waBtn.style.cssText = "font-size:0.75rem; padding:4px 8px; text-decoration:none;";
      const renewMsg = `¡Hola! Tu servicio de *${sub.product_name || 'KazuStore'}* vence en ${sub.days_remaining || 'pocos'} días (${sub.end_date}). ¿Deseas renovarlo hoy para no perder tu acceso ni perfiles? Quedo atento. 😊`;
      waBtn.href = `https://wa.me/${cleanSubPhone}?text=${encodeURIComponent(renewMsg)}`;
      waBtn.target = "_blank";
      waBtn.rel = "noopener noreferrer";
      waBtn.textContent = "💬 Notificar Renovación";

      waActionRow.appendChild(waBtn);

      card.appendChild(header);
      card.appendChild(details);
      card.appendChild(waActionRow);
      grid.appendChild(card);
    });

    expiringListEl.appendChild(grid);
  }

  const auditBtn = document.getElementById("kc-audit-verify-btn");
  const auditBox = document.getElementById("kc-client-audit-box");
  const auditName = document.getElementById("audit-client-name");
  const auditPill = document.getElementById("audit-stamps-pill");
  const auditDetails = document.getElementById("audit-client-details");

  if (auditBtn) {
    auditBtn.addEventListener("click", async () => {
      const rawPhone = phoneInput.value.trim();
      const phone = rawPhone.replace(/[^\d+]/g, "");
      if (!phone || phone.length < 8) {
        showToast("⚠️ Ingresa un número de WhatsApp para verificar.");
        return;
      }

      auditBtn.disabled = true;
      auditBtn.textContent = "⏳ Verificando...";
      if (auditBox) auditBox.classList.remove("hidden");
      if (auditDetails) auditDetails.textContent = "Consultando base de datos Supabase y libro contable...";

      try {
        const audit = await dbService.getClientAudit(phone);
        if (!audit) {
          if (auditName) auditName.textContent = `Cliente No Registrado: ${phone}`;
          if (auditPill) {
            auditPill.textContent = "0 Sellos";
            auditPill.style.background = "#e11d48";
          }
          if (auditDetails) {
            auditDetails.innerHTML = `<span style="color:#f43f5e;">⚠️ Este cliente NO tiene registro previo ni compras validadas en el sistema.</span> Si dice tener sellos, no hay evidencia en la base de datos.`;
          }
        } else {
          const stamps = audit.stamps_balance;
          const credits = audit.referral_credits || 0;
          const qualFriends = audit.qualified_friends || 0;
          if (auditName) auditName.textContent = `Auditoría: ${audit.client.nickname || phone}`;
          if (auditPill) {
            auditPill.textContent = `${stamps} Sellos Reales`;
            auditPill.style.background = stamps >= 5 ? "#059669" : "#0284c7";
          }

          let lastTx = "Sin transacciones recientes";
          if (audit.ledger && audit.ledger.length > 0) {
            const first = audit.ledger[0];
            lastTx = `${first.action === 'earned' ? '+' : ''}${first.amount} sellos (${first.reason || 'Sin detalle'}) el ${new Date(first.created_at || Date.now()).toLocaleDateString()}`;
          }

          if (auditDetails) {
            auditDetails.innerHTML = `
              <div>📊 <strong>Sellos Confirmados:</strong> ${stamps} de 10 | <strong>Crédito por Referidos:</strong> S/ ${Number(credits).toFixed(2)} (${qualFriends} amigo(s) con compra)</div>
              <div>📜 <strong>Último movimiento auditado:</strong> ${lastTx}</div>
              <div style="font-size:0.75rem; color:#38bdf8; margin-top:4px;">🛡️ Fuente de datos: <strong>${audit.source === 'supabase' ? 'Supabase Cloud (Inviolable)' : 'Libro Contable Local'}</strong></div>
            `;
          }
        }
      } catch (err) {
        if (auditDetails) auditDetails.textContent = "Error al auditar: " + err.message;
      } finally {
        auditBtn.disabled = false;
        auditBtn.textContent = "🔍 Verificar Historial Real";
      }
    });
  }

  const btnAdd = document.getElementById("kc-btn-add");
  const btnRedeem = document.getElementById("kc-btn-redeem");
  const btnCredits = document.getElementById("kc-btn-credits");

  async function executeStampOperation(explicitAction) {
    const rawPhone = phoneInput.value.trim();
    const phone = rawPhone.replace(/[^\d+]/g, ""); // Solo dígitos y símbolo +
    const action = explicitAction || (actionSelect ? actionSelect.value : "earned");
    const rawAmount = parseInt(amountInput.value, 10);
    // Para canje de cupón o reinicio de tarjeta completa, la operación no depende del campo cantidad
    const amount = (action === "claim_coupon_3" || action === "reset_full_card_8" || action === "use_referral_credits")
      ? 1 
      : (isNaN(rawAmount) ? 1 : Math.max(1, Math.min(20, rawAmount)));

    let reason = reasonInput.value.trim().slice(0, 100);
    if (action === "claim_coupon_3" && (!reason || reason === "Compra KazuStore" || reason.includes("Netflix"))) {
      reason = "Cupón S/ 3.00 OFF Renovación";
    } else if (action === "reset_full_card_8" && (!reason || reason === "Compra KazuStore" || reason.includes("Netflix"))) {
      reason = "Canje Tarjeta Completa S/ 8.00 Crédito";
    } else if (action === "use_referral_credits" && (!reason || reason === "Compra KazuStore" || reason.includes("Netflix"))) {
      reason = "Canje Saldo Amigos Referidos";
    }

    const festivitySelect = document.getElementById("kc-festivity-select");
    const festivity = festivitySelect ? festivitySelect.value : "auto";

    if (!phone || phone.length < 8 || phone.length > 15) {
      statusEl.textContent = "⚠️ Ingresa un número de WhatsApp válido (8 a 15 dígitos).";
      statusEl.className = "status-feedback text-rose";
      return;
    }

    // Si la acción es canjear sellos, sincronizar el select
    if (actionSelect) actionSelect.value = action;

    statusEl.textContent = "⏳ Conectando con Supabase Cloud...";
    statusEl.className = "status-feedback text-cyan";

    const res = await dbService.registerStamp(phone, amount, action, reason, festivity);
    if (res.success) {
      const clientUrl = `https://kazudolfo.github.io/kazu-store/?tel=${encodeURIComponent(phone)}`;
      let opText = "";
      
      if (action === "earned") {
        opText = `➕ *+${amount} KazuPunto(s)* acumulado(s) por tu compra`;
        statusEl.textContent = `✅ ¡+${amount} KazuPuntos SUMADOS correctamente al cliente!`;
        statusEl.className = "status-feedback text-emerald";
        showToast(`¡+${amount} Puntos sumados!`);
      } else if (action === "claim_coupon_3") {
        opText = `🎟️ *Cupón de Descuento S/ 3.00 OFF* aplicado en tu servicio (¡Conservas tus 5 sellos para la meta de S/ 8!)`;
        statusEl.textContent = `✅ ¡Cupón de S/ 3.00 OFF aplicado! (Tus sellos no se descuentan)`;
        statusEl.className = "status-feedback text-cyan";
        showToast("¡Cupón S/ 3.00 OFF aplicado!");
      } else if (action === "reset_full_card_8") {
        opText = `🏆 *Premio Mayor de S/ 8.00 de Crédito* aplicado por tarjeta completa de 10 sellos. ¡Tarjeta reiniciada para acumular nuevamente!`;
        statusEl.textContent = `✅ ¡Premio de S/ 8.00 aplicado! Tarjeta completada y reiniciada a 0.`;
        statusEl.className = "status-feedback text-emerald";
        showToast("¡S/ 8.00 de Crédito aplicado y tarjeta reiniciada!");
      } else if (action === "redeemed") {
        opText = `🎁 *-${amount} KazuPunto(s)* canjeado(s) de tu tarjeta`;
        statusEl.textContent = `✅ ¡-${amount} KazuPuntos descontados de la tarjeta!`;
        statusEl.className = "status-feedback text-emerald";
        showToast(`¡-${amount} Puntos descontados!`);
      } else if (action === "use_referral_credits") {
        opText = `💰 *Canje de Saldo por Referidos* aplicado en tu pedido (Saldo de referidos descontado)`;
        statusEl.textContent = "✅ ¡Crédito por referidos canjeado y descontado!";
        statusEl.className = "status-feedback text-emerald";
        showToast("¡Créditos de referidos canjeados!");
      }

      if (res.offline) {
        statusEl.textContent += " (Modo Offline guardado)";
      }

      const message = `🎉 *¡KAZUSTORE - TUS KAZUPUNTOS ESTÁN ACTUALIZADOS!* 🎁

¡Hola! Hemos registrado tus beneficios en tu cuenta de fidelidad *KazuPuntos*:

✨ *Operación:* ${opText}
📌 *Detalle:* ${reason || "Atención KazuStore"}

📲 *Consulta tu Tarjeta Digital en vivo, Sellos y Código de Referido aquí:*
${clientUrl}

¡Gracias por tu preferencia! Recuerda que cada compra te acerca a descuentos y crédito exclusivo. ⭐`;

      messageResult.value = message;
      
      // Si la caja de auditoría estaba visible, refrescarla
      if (auditBtn && !auditBox?.classList.contains("hidden")) {
        auditBtn.click();
      }
      loadClients();
    } else {
      statusEl.textContent = `❌ Error: ${res.error}`;
      statusEl.className = "status-feedback text-rose";
    }
  }

  const btnCoupon3 = document.getElementById("kc-btn-coupon-3");
  const btnRedeem10 = document.getElementById("kc-btn-redeem-10");

  if (btnAdd) {
    btnAdd.addEventListener("click", () => executeStampOperation("earned"));
  }

  if (btnCoupon3) {
    btnCoupon3.addEventListener("click", () => executeStampOperation("claim_coupon_3"));
  }

  if (btnRedeem10) {
    btnRedeem10.addEventListener("click", () => executeStampOperation("reset_full_card_8"));
  }

  if (btnCredits) {
    btnCredits.addEventListener("click", () => executeStampOperation("use_referral_credits"));
  }

  if (actionSelect) {
    actionSelect.addEventListener("change", () => {
      if (actionSelect.value === "earned" && reasonInput.value.includes("Cupón")) {
        reasonInput.value = "Compra KazuStore";
      } else if (actionSelect.value === "claim_coupon_3") {
        reasonInput.value = "Cupón S/ 3.00 OFF Renovación";
      } else if (actionSelect.value === "reset_full_card_8") {
        reasonInput.value = "Canje Tarjeta Completa S/ 8.00 Crédito";
      } else if (actionSelect.value === "use_referral_credits") {
        reasonInput.value = "Canje Saldo Amigos Referidos";
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const text = messageResult.value;
      if (text) {
        copyBtn.classList.add("copied");
        setTimeout(() => copyBtn.classList.remove("copied"), 600);
        navigator.clipboard.writeText(text).then(() => {
          showToast("¡Mensaje KazuCard copiado!");
        }).catch(() => {
          showToast("¡Mensaje KazuCard copiado!");
        });
      }
    });
  }

  if (refreshCloudBtn) {
    refreshCloudBtn.addEventListener("click", () => {
      Promise.allSettled([loadMetrics(), loadExpiring(), loadClients()]).then(() => {
        showToast("Métricas y clientes actualizados.");
      });
    });
  }

  window.refreshKazuHubState = () => {
    return Promise.allSettled([loadMetrics(), loadExpiring(), loadClients()]);
  };

  // Carga paralela concurrente para respuesta instantánea (non-blocking)
  window.refreshKazuHubState();
}
