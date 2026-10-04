import { CATALOG_SERVICES } from "../data/catalog.js";
import { dbService } from "./supabase-client.js";

export function initDelivery(showToast) {
  const serviceSelect = document.getElementById("delivery-service-select");
  const customerName = document.getElementById("delivery-customer-name");
  const customerPhone = document.getElementById("delivery-customer-phone");
  const accountUser = document.getElementById("delivery-account-user");
  const accountPass = document.getElementById("delivery-account-pass");
  const profileNumInput = document.getElementById("delivery-profile-num");
  const pinCodeInput = document.getElementById("delivery-pin-code");
  const togglePass = document.getElementById("delivery-toggle-pass");
  const toggleProfile = document.getElementById("delivery-toggle-profile");
  const togglePin = document.getElementById("delivery-toggle-pin");

  const daysInput = document.getElementById("delivery-days");
  const upsellSelect = document.getElementById("delivery-upsell-select");
  const saveSubBtn = document.getElementById("btn-save-subscription");
  const deliveryStatus = document.getElementById("delivery-status-feedback");

  const labelUser = document.getElementById("lbl-delivery-user");
  const labelPass = document.getElementById("lbl-delivery-pass");
  const groupPass = document.getElementById("group-delivery-pass");

  const expiryBadge = document.getElementById("expiry-date-display");
  const deliveryTextarea = document.getElementById("delivery-message-textarea");

  // Poblar select con catálogo de servicios
  CATALOG_SERVICES.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.icon} ${s.name} (${s.category})`;
    opt.setAttribute("data-mode", s.mode);
    opt.setAttribute("data-duration", s.duration);
    opt.setAttribute("data-inst", s.instruction || "");
    serviceSelect.appendChild(opt);
  });

  function onServiceSelectionChange() {
    const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
    if (!selectedOpt) return;

    const mode = selectedOpt.getAttribute("data-mode");
    const defaultDuration = selectedOpt.getAttribute("data-duration");

    if (defaultDuration && defaultDuration !== "9999") {
      daysInput.value = defaultDuration;
    } else if (defaultDuration === "9999") {
      daysInput.value = "365"; // Licencia permanente / largo plazo
    }

    if (mode === "license") {
      if (labelUser) labelUser.textContent = "Clave de Activación / Key (25 caracteres):";
      accountUser.placeholder = "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX";
      if (groupPass) groupPass.classList.add("hidden");
      if (toggleProfile) toggleProfile.checked = false;
      if (togglePin) togglePin.checked = false;
    } else if (mode === "invite") {
      if (labelUser) labelUser.textContent = "Correo del Cliente a Vincular:";
      accountUser.placeholder = "cliente@gmail.com";
      if (groupPass) groupPass.classList.add("hidden");
      if (toggleProfile) toggleProfile.checked = false;
      if (togglePin) togglePin.checked = false;
    } else {
      if (labelUser) labelUser.textContent = "Correo / Cuenta Principal:";
      accountUser.placeholder = "cuenta@kazustore.pe";
      if (groupPass) groupPass.classList.remove("hidden");
      if (toggleProfile) toggleProfile.checked = true;
      if (profileNumInput && !profileNumInput.value) profileNumInput.value = "Perfil 1";
    }

    updateDeliveryMessage();
  }

  function calculateExpiryDate(days) {
    const target = new Date();
    target.setDate(target.getDate() + parseInt(days || 30, 10));
    return target.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function getUpsellText(key) {
    const upsells = {
      combo_armar: "💡 BENEFICIO COMBO KAZUSTORE: Por ser cliente activo, puedes armar un combo y sumar cualquier segundo servicio de nuestro catálogo (Disney, Max, Spotify o YouTube) con S/ 2.00 de descuento inmediato sobre su precio normal. ¿Te gustaría armar tu combo hoy?",
      segunda_pantalla: "📺 COMBO 2DA PANTALLA: Añade una segunda pantalla para disfrutar en tu TV o celular en simultáneo por solo S/ 12.00 en combo.",
      disney_espn: "🏆 OFERTA COMBO: Suma Disney+ Premium con todo el fútbol y ESPN en vivo por solo S/ 7.50 adicionales (Precio regular S/ 8.50 - Ahorras S/ 1.00).",
      max_combo: "🍿 OFERTA COMBO: Suma Max Estándar (HBO) por solo S/ 4.90 adicionales (Precio regular S/ 5.90 - Ahorras S/ 1.00).",
      spotify: "🟢 OFERTA COMBO: Añade Spotify Premium Individual directo a tu cuenta por solo S/ 6.50 adicionales (Precio regular S/ 7.50 - Ahorras S/ 1.00).",
      youtube: "▶️ OFERTA COMBO: Activa YouTube Premium + Music sin anuncios por solo S/ 7.50 adicionales (Precio regular S/ 8.50 - Ahorras S/ 1.00).",
      canva: "🎨 OFERTA COMBO: Desbloquea Canva Pro por 1 Año Completo a tu correo por solo S/ 7.50 en combo (Precio regular S/ 8.50).",
      office: "☁️ OFERTA COMBO: Agrega Microsoft 365 original + 1TB OneDrive para 5 dispositivos (1 Año) por solo S/ 17.90 (Precio regular S/ 19.90 - Ahorras S/ 2.00).",
      windows: "🪟 OFERTA COMBO: Activa Windows 11 o 10 Pro con clave original de por vida por solo S/ 15.90 en combo (Precio regular S/ 17.90 - Ahorras S/ 2.00).",
      iptv_combo: "📡 OFERTA COMBO: Súmale IPTV con más de 1,500 canales en vivo y ligas del mundo por solo S/ 12.50 en combo (Precio regular S/ 13.90)."
    };
    return upsells[key] || "";
  }

  function updateDeliveryMessage() {
    const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
    const serviceName = selectedOpt ? selectedOpt.textContent.split(" (")[0] : "Servicio";
    const mode = selectedOpt ? selectedOpt.getAttribute("data-mode") : "pin";

    const days = parseInt(daysInput.value || 30, 10);
    const expiryDate = calculateExpiryDate(days);
    expiryBadge.textContent = mode === "license" ? "Licencia Permanente / De por vida" : expiryDate;

    const name = customerName.value.trim() || "Cliente";
    const user = accountUser.value.trim() || "correo@ejemplo.com";
    const hasPass = togglePass && togglePass.checked;
    const pass = accountPass.value.trim() || "••••••••";

    const hasProfile = toggleProfile && toggleProfile.checked;
    const profileVal = profileNumInput.value.trim() || "Perfil 1";

    const hasPin = togglePin && togglePin.checked;
    const pinVal = pinCodeInput.value.trim() || "Sin PIN";

    const upsell = getUpsellText(upsellSelect.value);

    let message = "";

    if (mode === "license") {
      message = `DATOS DE TU LICENCIA - KAZUSTORE 🪟

¡Hola ${name}! Tu clave de activación oficial se encuentra lista:

• Producto: ${serviceName}
• Licencia OEM: ${user}
• Vigencia: Permanente (De por vida)

PASOS DE ACTIVACIÓN:
1. Dirígete a Inicio > Configuración > Sistema > Activación en tu PC.
2. Presiona "Cambiar la clave de producto".
3. Ingresa la clave de 25 caracteres con conexión a internet y confirma.

${upsell ? `🎁 PROMOCIÓN EXCLUSIVA HOY:\n${upsell}\n` : ""}
Cualquier duda técnica me avisas por aquí para guiarte. ¡Muchas gracias por tu compra!`;
    } else if (mode === "invite") {
      message = `DATOS DE TU SERVICIO - KAZUSTORE ✨

¡Hola ${name}! Ya emitimos la vinculación a tu correo:

• Servicio: ${serviceName}
• Correo activado: ${user}
• Cobertura: ${expiryDate} (${days} Días)

INDICACIONES:
1. Revisa tu bandeja de entrada o correos no deseados (spam).
2. Abre la invitación oficial recibida y presiona "Aceptar invitación" o "Unirme".
3. Inicia sesión con tu cuenta habitual. Tus listas, datos o diseños se conservan intactos.

${upsell ? `🎁 PROMOCIÓN EXCLUSIVA HOY:\n${upsell}\n` : ""}
Cuentas con garantía activa durante todo tu ciclo. ¡Que lo disfrutes al máximo!`;
    } else {
      // Perfiles y Streaming
      let credencialesBloque = `• Usuario / Correo: ${user}\n`;

      if (hasPass) {
        credencialesBloque += `• Contraseña: ${pass}\n`;
      } else {
        credencialesBloque += `• Acceso: Solicitud por Enlace o Código en pantalla (nosotros lo validamos por ti sin requerir clave)\n`;
      }

      if (hasProfile) {
        credencialesBloque += `• Perfil asignado: ${profileVal}\n`;
      }

      if (hasPin) {
        credencialesBloque += `• PIN de seguridad: ${pinVal}\n`;
      } else {
        credencialesBloque += `• PIN: Sin PIN requerido (acceso libre a tu perfil)\n`;
      }

      message = `DATOS DE TU CUENTA - KAZUSTORE 🍿

¡Hola ${name}! Tu servicio ya está activo y configurado:

• Servicio: ${serviceName}
${credencialesBloque}• Fecha de caducidad: ${expiryDate} (${days} Días de Cobertura)

REGLAS DE USO Y GARANTÍA:
1. Ingresar únicamente a tu perfil asignado (${hasProfile ? profileVal : "Perfil indicado"}).
2. Uso exclusivo para 1 dispositivo a la vez (Smart TV, PC o móvil).
${hasPass ? "3. No modificar la contraseña ni datos generales de la cuenta.\n" : "3. Cuando la app te pida inicio por enlace o código, envíanos foto de tu pantalla y te autorizamos al instante.\n"}
${upsell ? `🎁 PROMOCIÓN EXCLUSIVA HOY:\n${upsell}\n` : ""}
Cualquier consulta técnica cuentas con nuestro soporte directo. ¡Que disfrutes tu contenido!`;
    }

    deliveryTextarea.value = message;
  }

  // Listeners
  serviceSelect.addEventListener("change", onServiceSelectionChange);
  [
    customerName, customerPhone, accountUser, accountPass, 
    profileNumInput, pinCodeInput, daysInput, upsellSelect,
    togglePass, toggleProfile, togglePin
  ].forEach(el => {
    if (el) {
      el.addEventListener("input", updateDeliveryMessage);
      el.addEventListener("change", updateDeliveryMessage);
    }
  });

  if (saveSubBtn) {
    saveSubBtn.addEventListener("click", async () => {
      const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
      const serviceName = selectedOpt ? selectedOpt.textContent.split(" (")[0] : "Servicio";
      const name = customerName.value.trim();
      const phone = customerPhone ? customerPhone.value.trim() : "";
      const days = parseInt(daysInput.value || 30, 10);
      const expiryDate = calculateExpiryDate(days);
      const user = accountUser ? accountUser.value.trim() : "";
      const pass = accountPass ? accountPass.value.trim() : "";
      const pin = pinCodeInput ? pinCodeInput.value.trim() : "";

      if (!name) {
        deliveryStatus.textContent = "⚠️ Ingresa el nombre del cliente.";
        deliveryStatus.className = "status-feedback text-rose";
        customerName.focus();
        return;
      }

      deliveryStatus.textContent = "⏳ Guardando cliente y agendando vencimiento...";
      deliveryStatus.className = "status-feedback text-cyan";

      const res = await dbService.registerSubscription({
        name,
        phone,
        serviceName,
        days,
        expiryDate,
        user,
        pin
      });

      if (res && res.success) {
        deliveryStatus.textContent = `✅ ¡Cliente y suscripción agendados con éxito! Vence: ${expiryDate}`;
        deliveryStatus.className = "status-feedback text-emerald";
        if (typeof showToast === "function") {
          showToast(`¡Suscripción agendada! Vence: ${expiryDate}`);
        }
        if (typeof window.refreshKazuHubState === "function") {
          window.refreshKazuHubState();
        }
      } else {
        deliveryStatus.textContent = "❌ No se pudo guardar la suscripción.";
        deliveryStatus.className = "status-feedback text-rose";
      }
    });
  }

  onServiceSelectionChange();
}
