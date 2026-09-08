let selectedCombos = new Set();
let selectedProdCombos = new Set();

function init() {
  // 1. Inicializar Módulo Servicios
  const cContainer = document.getElementById('combo-chips');
  const entSelect = document.getElementById('ent-service');
  const msgSelect = document.getElementById('msg-service-select');

  SERVICES.forEach(s => {
    const div = document.createElement('div');
    div.className = 'chip';
    div.id = 'chip_' + s.name.replace(/[^a-zA-Z0-9]/g, '_');
    div.innerHTML = `${s.icon} ${s.name}<span>S/ ${s.price.toFixed(2)}</span>`;
    div.onclick = () => toggleCombo(s);
    cContainer.appendChild(div);

    const opt1 = new Option(`${s.icon} ${s.name}`, s.name);
    const opt2 = new Option(`${s.icon} ${s.name}`, s.name);
    entSelect.add(opt1);
    msgSelect.add(opt2);
  });

  onEntregaServiceChange();
  renderGlobalMessages();
  onServiceMsgChange();
  switchMsgType('globales');
  loadStrategy('gancho_confianza');

  // 2. Inicializar Módulo Productos
  const prodSelect = document.getElementById('prod-select');
  const prodComboContainer = document.getElementById('prod-combo-chips');

  PHYSICAL_PRODUCTS.forEach(p => {
    if (p.templates) {
      const opt = new Option(`${p.icon} ${p.name}`, p.id);
      prodSelect.add(opt);
    }

    const div = document.createElement('div');
    div.className = 'chip prod-chip';
    div.id = 'prod_chip_' + p.id;
    div.innerHTML = `${p.icon} ${p.name}<span>S/ ${p.price.toFixed(2)}</span>`;
    div.onclick = () => toggleProdCombo(p);
    prodComboContainer.appendChild(div);
  });

  onProductSelectChange();
  loadShippingTemplate('contraentrega');
}

function switchMainModule(mod) {
  document.querySelectorAll('.view-module').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.top-menu-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('module-' + mod).classList.add('active');
  document.getElementById('btn-mod-' + mod).classList.add('active');
}

function showSubSection(btn, sec) {
  document.querySelectorAll('#module-servicios .section-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('#module-servicios .nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + sec).classList.add('active');
  btn.classList.add('active');
}

function showProdSection(btn, sec) {
  document.querySelectorAll('#module-productos .section-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('#module-productos .nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + sec).classList.add('active');
  btn.classList.add('active');
}

/* ========================================================
   LÓGICA: SERVICIOS DIGITALES & LICENCIAS
======================================================== */
function toggleCombo(s) {
  if (selectedCombos.has(s.name)) selectedCombos.delete(s.name);
  else selectedCombos.add(s.name);
  
  const el = document.getElementById('chip_' + s.name.replace(/[^a-zA-Z0-9]/g, '_'));
  if (el) el.classList.toggle('active', selectedCombos.has(s.name));
  calcComboPrice();
}

function clearCombos() {
  selectedCombos.clear();
  document.querySelectorAll('#combo-chips .chip').forEach(c => c.classList.remove('active'));
  document.getElementById('combo-manual').value = '';
  calcComboPrice();
}

function calcComboPrice() {
  const items = SERVICES.filter(s => selectedCombos.has(s.name));
  const regular = items.reduce((acc, s) => acc + s.price, 0);
  const cost = items.reduce((acc, s) => acc + (s.cost || 0), 0);

  document.getElementById('combo-reg').innerText = `S/ ${regular.toFixed(2)}`;
  document.getElementById('combo-cost').innerText = `S/ ${cost.toFixed(2)}`;

  const disc = parseFloat(document.getElementById('combo-disc').value) || 0;
  let finalPrice = regular > 0 ? Math.round(regular * (1 - disc / 100)) : 0;
  
  const manual = parseFloat(document.getElementById('combo-manual').value);
  if (!isNaN(manual) && manual > 0) finalPrice = manual;

  const profit = finalPrice - cost;
  updateProfitDisplay(profit, finalPrice);
  renderComboMessage(items, regular, finalPrice);
}

function manualComboPrice() {
  const manual = parseFloat(document.getElementById('combo-manual').value);
  const items = SERVICES.filter(s => selectedCombos.has(s.name));
  const regular = items.reduce((acc, s) => acc + s.price, 0);
  const cost = items.reduce((acc, s) => acc + (s.cost || 0), 0);
  
  const finalPrice = (!isNaN(manual) && manual > 0) ? manual : regular;
  const profit = finalPrice - cost;

  updateProfitDisplay(profit, finalPrice);
  renderComboMessage(items, regular, finalPrice);
}

function updateProfitDisplay(profit, finalPrice) {
  document.getElementById('combo-final').innerText = `S/ ${finalPrice.toFixed(2)}`;
  const pBadge = document.getElementById('combo-profit');
  if (profit >= 0) {
    pBadge.className = "profit-badge profit-safe";
    pBadge.innerText = `+ S/ ${profit.toFixed(2)}`;
  } else {
    pBadge.className = "profit-badge profit-danger";
    pBadge.innerText = `- S/ ${Math.abs(profit).toFixed(2)} (¡Pérdida!)`;
  }
}

function renderComboMessage(items, regular, offer) {
  const txt = document.getElementById('combo-text');
  if (items.length === 0) {
    txt.value = 'Selecciona plataformas a la izquierda para armar el combo...';
    return;
  }

  const BENEFICIOS = {
    "Netflix": "Ultra HD 4K, series top y perfil privado con PIN",
    "Disney+ Estándar": "Marvel, Star Wars, Pixar y estrenos familiares",
    "Disney+ Premium (con ESPN)": "Deportes en vivo (Champions, F1, Premier) + Disney completo",
    "Max Estándar": "HBO, Warner Bros, DC y películas de cartelera",
    "Amazon Prime Video (Cuenta)": "Series exclusivas Prime + catálogo completo",
    "Paramount+": "Películas de estreno y series premium",
    "Crunchyroll Fan": "Anime sin anuncios a 1 hora de Japón",
    "Oleada TV": "Canales de TV en vivo estables para Smart TV y celular",
    "IPTV (1 Mes)": "Miles de canales nacionales, internacionales y eventos",
    "Xuper TV (Permanente)": "Televisión ilimitada permanente en tu pantalla",
    "Spotify Premium": "Música sin anuncios, descargas y saltos ilimitados",
    "YouTube Premium": "Videos sin comerciales y música en segundo plano",
    "Tidal HiFi": "Audio calidad máster de alta fidelidad",
    "Deezer Premium": "Catálogo musical completo en alta calidad",
    "Windows 11 Pro / Home": "Licencia permanente oficial para 1 PC",
    "Windows 10 Pro / Home": "Activación oficial de por vida",
    "Microsoft 365 (1 Año)": "Word, Excel, PowerPoint + 1TB en OneDrive",
    "Canva Pro (1 Año)": "Herramientas Pro, quitafondos y fotos ilimitadas",
    "Gemini Pro (18 Meses)": "IA avanzada de Google para productividad y análisis",
    "ChatGPT Go (1 Mes)": "Generación de texto rápida e inteligente",
    "Lovable Pro (1 Mes)": "Creación rápida de software con IA",
    "iLovePDF (1 Año)": "Edición y conversión de documentos ilimitada",
    "Miro Panel (100 Miembros)": "Panel colaborativo para hasta 100 usuarios",
    "CapCut Pro (1 Mes)": "Efectos y herramientas Pro para edición de video",
    "Autodesk AutoCAD (1 Año)": "Software líder de diseño y arquitectura"
  };

  const ahorro = regular - offer;
  let msg = `🔥 *¡SUPER PACK DIGITAL EN OFERTA!* 🔥\n\n`;
  msg += `Disfruta del mejor entretenimiento con garantía total y activación inmediata:\n\n`;

  items.forEach(s => {
    const b = BENEFICIOS[s.name] || "Acceso 100% garantizado y privado";
    msg += `✅ ${s.icon} *${s.name}*\n   • ${b}\n\n`;
  });

  msg += `❌ *Precio individual:* ~S/ ${regular.toFixed(2)}~\n`;
  msg += `💥 *PRECIO OFERTA PACK: S/ ${offer.toFixed(2)}*`;
  if (ahorro > 0) {
    msg += ` 🔥 _(¡Te ahorras S/ ${ahorro.toFixed(2)}!)_`;
  }

  msg += `\n\n🛡️ *Beneficios incluidos:*
• Cuentas 100% estables, privadas y seguras.
• Soporte técnico continuo durante todo tu periodo.
• Activación rápida tras confirmar tu pago.

📲 *¿Deseas activarlo hoy?* Escríbeme y te paso los datos de pago al instante (Yape / Plin / Transferencia). ¡Será un gusto atenderte!`;

  txt.value = msg;
}

function onEntregaServiceChange() {
  const sName = document.getElementById('ent-service').value;
  const s = SERVICES.find(item => item.name === sName);
  if (!s) return;

  const d = new Date();
  if (s.duration > 0) {
    d.setDate(d.getDate() + s.duration);
    document.getElementById('ent-date').value = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  } else {
    document.getElementById('ent-date').value = "Permanente";
  }

  const isLic = s.mode === "licencia";
  document.getElementById('fields-account').style.display = isLic ? 'none' : 'block';
  document.getElementById('fields-license').style.display = isLic ? 'block' : 'none';

  const isPerfil = s.mode === "perfil";
  document.getElementById('ent-profile').parentElement.style.display = isPerfil ? 'block' : 'none';
  document.getElementById('ent-pin').parentElement.style.display = isPerfil ? 'block' : 'none';

  buildEntrega();
}

function buildEntrega() {
  const sName = document.getElementById('ent-service').value;
  const s = SERVICES.find(item => item.name === sName);
  const clientName = document.getElementById('ent-client-name').value.trim();
  const withUpsell = document.getElementById('chk-upselling').checked;
  if (!s) return;

  const saludo = clientName ? `¡Hola *${clientName}*! ` : `¡Hola! `;
  let txt = '';

  if (s.mode === "licencia") {
    const key = document.getElementById('ent-license-key').value || "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX";
    const link = document.getElementById('ent-license-link').value || "Configuración > Sistema > Activación > Cambiar clave";

    txt = `${saludo}Tu clave de activación oficial está lista:

${s.icon} *${sName.toUpperCase()} - ENTREGA OFICIAL*

🔑 *Clave de Producto:* \`${key}\`
📌 *Ruta de Activación:* ${link}

*Garantía y Seguridad:*
- Licencia permanente y original para 1 equipo.
- Soporte y asesoría personalizada durante la activación.`;

  } else {
    const d = document.getElementById('ent-date').value;
    const email = document.getElementById('ent-email').value || "correo@ejemplo.com";
    const pass = document.getElementById('ent-pass').value || "Solicitar acceso al proveedor.";
    const prof = document.getElementById('ent-profile').value || "Perfil 1";
    const pin = document.getElementById('ent-pin').value || "2021";

    txt = `${saludo}Aquí tienes los datos de tu acceso privado:

${s.icon} *${sName.toUpperCase()} - ACCESO PRIVADO*

📅 *Vencimiento:* ${d}
📧 *Correo:* ${email}
🔑 *Contraseña:* ${pass}
${s.mode === 'perfil' ? `👤 *Perfil:* ${prof}\n🔒 *PIN:* ${pin}\n` : ''}
⚠️ *Recomendaciones para proteger tu servicio:*
• Modalidad: 1 dispositivo a la vez para mantener la estabilidad de la cuenta.
• No modifiques los datos principales ni perfiles ajenos para conservar tu garantía.
• Para no perder tu perfil ni historial, solicita tu renovación 1 día antes del vencimiento.`;
  }

  // UPSELLING CONTEXTUAL
  if (withUpsell) {
    if (s.category === "Streaming y TV") {
      txt += `\n\n🎁 *OFERTA COMPLEMENTARIA POR TU COMPRA HOY:*
¿Deseas acompañar tus series con música? Llévate *Spotify Premium (30 Días)* a solo *S/ 7.00* (Normal: S/ 9.00) o *Disney+ ESPN* a *S/ 8.00* activándolo hoy mismo.`;
    } else if (s.category === "Música") {
      txt += `\n\n🎁 *OFERTA COMPLEMENTARIA POR TU COMPRA HOY:*
Para tus películas y series: llévate *Netflix Premium* a solo *S/ 12.00* o *Max Estándar* a *S/ 5.50* por ser cliente activo hoy.`;
    } else if (s.category === "Sistemas y Ofimática" || s.category === "Diseño y Edición") {
      txt += `\n\n🎁 *OFERTA COMPLEMENTARIA DE PRODUCTIVIDAD:*
Completa tus herramientas de trabajo: llévate *Canva Pro (1 Año)* a solo *S/ 12.00* o *Microsoft 365* a *S/ 25.00* activándolo hoy.`;
    } else if (s.category === "IA y Herramientas") {
      txt += `\n\n🎁 *OFERTA COMPLEMENTARIA DE PRODUCTIVIDAD:*
Potencia tus proyectos: llévate *Canva Pro (1 Año)* o *iLovePDF* con *S/ 3.00 de descuento* directo hoy.`;
    }
  }

  txt += `\n\n🤝 Ante cualquier consulta o detalle técnico, escríbeme con total confianza para ayudarte.`;
  document.getElementById('ent-text').value = txt;
}

function sendEntregaWhatsApp() {
  const phone = document.getElementById('ent-client-phone').value.replace(/[^0-9]/g, '');
  const msg = document.getElementById('ent-text').value;

  if (!msg) {
    alert("No hay mensaje generado para enviar.");
    return;
  }

  // Copia automática de respaldo al portapapeles
  navigator.clipboard.writeText(msg);

  let url = '';
  if (phone) {
    const fullPhone = phone.length === 9 ? `51${phone}` : phone;
    url = `https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(msg)}`;
  } else {
    url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  }

  window.open(url, '_blank');
}

function switchMsgType(type) {
  document.getElementById('tab-btn-globales').classList.toggle('active', type === 'globales');
  document.getElementById('tab-btn-servicio').classList.toggle('active', type === 'servicio');
  document.getElementById('sub-msg-globales').style.display = type === 'globales' ? 'block' : 'none';
  document.getElementById('sub-msg-servicio').style.display = type === 'servicio' ? 'block' : 'none';

  if (type === 'globales') {
    const firstKey = Object.keys(GLOBAL_TEMPLATES)[0];
    document.getElementById('msg-text').value = GLOBAL_TEMPLATES[firstKey];
    document.querySelectorAll('#msg-global-tabs .sub-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  } else {
    onServiceMsgChange();
  }
}

function renderGlobalMessages() {
  const container = document.getElementById('msg-global-tabs');
  container.innerHTML = '';
  Object.keys(GLOBAL_TEMPLATES).forEach((key, idx) => {
    const btn = document.createElement('button');
    btn.className = `sub-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerText = key;
    btn.onclick = (e) => {
      document.querySelectorAll('#msg-global-tabs .sub-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      if (key === "💳 Medios de Pago") {
        document.getElementById('msg-text').value = getProcessedPaymentTemplate();
      } else {
        document.getElementById('msg-text').value = GLOBAL_TEMPLATES[key];
      }
    };
    container.appendChild(btn);
  });
  document.getElementById('msg-text').value = GLOBAL_TEMPLATES[Object.keys(GLOBAL_TEMPLATES)[0]];
}

function onServiceMsgChange() {
  const sName = document.getElementById('msg-service-select').value;
  const s = SERVICES.find(item => item.name === sName);
  const container = document.getElementById('msg-service-tabs');
  container.innerHTML = '';

  if (s && s.templates) {
    const keys = Object.keys(s.templates);
    keys.forEach((k, idx) => {
      const btn = document.createElement('button');
      btn.className = `sub-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerText = k;
      btn.onclick = (e) => {
        document.querySelectorAll('#msg-service-tabs .sub-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById('msg-text').value = s.templates[k];
      };
      container.appendChild(btn);
    });
    document.getElementById('msg-text').value = s.templates[keys[0]];
  } else {
    const durLabel = s.duration > 0 ? (s.labelDur || (s.duration === 365 ? "1 Año" : `${s.duration} Días`)) : "Permanente";
    container.innerHTML = `<span style="font-size:0.8rem; color:var(--muted); padding:4px 0;">Mensaje directo:</span>`;
    document.getElementById('msg-text').value = `${s.icon} *${sName.toUpperCase()} (${durLabel.toUpperCase()})*\n\n• Servicio con garantía directa y entrega rápida\n• Precio: S/ ${s.price.toFixed(2)}\n\n📲 Escríbeme si deseas activarlo.`;
  }
}

function loadStrategy(key, btn) {
  document.querySelectorAll('#strat-tabs .sub-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const defaultBtn = document.querySelector('#strat-tabs .sub-btn');
    if (defaultBtn) defaultBtn.classList.add('active');
  }
  document.getElementById('strat-text').value = STRATEGIES[key];
}

/* ========================================================
   LÓGICA: PRODUCTOS FÍSICOS & TECH
======================================================== */
function onProductSelectChange() {
  const prodId = document.getElementById('prod-select').value;
  const p = PHYSICAL_PRODUCTS.find(item => item.id === prodId);
  const subtabs = document.getElementById('prod-subtabs');
  subtabs.innerHTML = '';

  if (p && p.templates) {
    const keys = Object.keys(p.templates);
    keys.forEach((k, idx) => {
      const btn = document.createElement('button');
      btn.className = `sub-btn prod-sub ${idx === 0 ? 'active' : ''}`;
      btn.innerText = k;
      btn.onclick = (e) => {
        document.querySelectorAll('#prod-subtabs .sub-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById('prod-text').value = p.templates[k];
      };
      subtabs.appendChild(btn);
    });
    document.getElementById('prod-text').value = p.templates[keys[0]];
  }
}

function toggleProdCombo(p) {
  if (selectedProdCombos.has(p.id)) selectedProdCombos.delete(p.id);
  else selectedProdCombos.add(p.id);

  const el = document.getElementById('prod_chip_' + p.id);
  if (el) el.classList.toggle('active', selectedProdCombos.has(p.id));
  calcProdComboPrice();
}

function calcProdComboPrice() {
  const items = PHYSICAL_PRODUCTS.filter(p => selectedProdCombos.has(p.id));
  const regular = items.reduce((acc, p) => acc + p.price, 0);
  const cost = items.reduce((acc, p) => acc + (p.cost || 0), 0);

  document.getElementById('prod-combo-reg').innerText = `S/ ${regular.toFixed(2)}`;
  const disc = parseFloat(document.getElementById('prod-combo-disc').value) || 0;
  let finalPrice = regular > 0 ? Math.round(regular * (1 - disc / 100)) : 0;

  const manual = parseFloat(document.getElementById('prod-combo-manual').value);
  if (!isNaN(manual) && manual > 0) finalPrice = manual;

  const ahorro = regular - finalPrice;
  const profit = finalPrice - cost;

  document.getElementById('prod-combo-final').innerText = `S/ ${finalPrice.toFixed(2)}`;
  document.getElementById('prod-combo-saving').innerText = `Ganancia: +S/ ${profit >= 0 ? profit.toFixed(2) : '0.00'}`;

  renderProdComboMessage(items, regular, finalPrice);
}

function manualProdComboPrice() {
  const manual = parseFloat(document.getElementById('prod-combo-manual').value);
  const items = PHYSICAL_PRODUCTS.filter(p => selectedProdCombos.has(p.id));
  const regular = items.reduce((acc, p) => acc + p.price, 0);
  const cost = items.reduce((acc, p) => acc + (p.cost || 0), 0);

  const finalPrice = (!isNaN(manual) && manual > 0) ? manual : regular;
  const ahorro = regular - finalPrice;
  const profit = finalPrice - cost;

  document.getElementById('prod-combo-final').innerText = `S/ ${finalPrice.toFixed(2)}`;
  document.getElementById('prod-combo-saving').innerText = `Ganancia: +S/ ${profit >= 0 ? profit.toFixed(2) : '0.00'}`;
  renderProdComboMessage(items, regular, finalPrice);
}

function renderProdComboMessage(items, regular, offer) {
  const txt = document.getElementById('prod-combo-text');
  if (items.length === 0) {
    txt.value = 'Selecciona productos a la izquierda para armar el Pack Tech...';
    return;
  }

  const ahorro = regular - offer;
  let msg = `🔥 *¡SUPER PACK TECH EN OFERTA EXCLUSIVA!* 🚀\n\n`;
  msg += `Lleva la mejor tecnología y accesorios al mejor precio del mercado:\n\n`;

  items.forEach(p => {
    msg += `✅ ${p.icon} *${p.name}*\n   • ${p.desc}\n\n`;
  });

  msg += `❌ *Precio regular:* ~S/ ${regular.toFixed(2)}~\n`;
  msg += `💥 *PRECIO OFERTA PACK: S/ ${offer.toFixed(2)}*`;
  if (ahorro > 0) {
    msg += ` 🔥 _(¡Te estás ahorrando S/ ${ahorro.toFixed(2)}!)_`;
  }

  msg += `\n\n🛵 *Beneficios de Compra:*
• Productos 100% nuevos en caja sellada con garantía.
• Modalidad *Contraentrega* en Lima (pagas al recibir).
• Entrega *GRATIS en Chorrillos*.
• Envíos diarios a todo el Perú por Shalom / Olva.

📲 *¿Deseas agendar tu entrega hoy mismo?* Escríbenos tu distrito o ubicación para coordinar el despacho.`;

  txt.value = msg;
}

function loadShippingTemplate(key, btn) {
  document.querySelectorAll('#prod-shipping-tabs .sub-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const defaultBtn = document.querySelector('#prod-shipping-tabs .sub-btn');
    if (defaultBtn) defaultBtn.classList.add('active');
  }
  document.getElementById('prod-shipping-text').value = SHIPPING_TEMPLATES[key];
}

function togglePaymentSettings() {
  const box = document.getElementById('payment-settings-box');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function savePaymentSettings() {
  const data = {
    yapeName: document.getElementById('cfg-yape-name').value,
    yapeNum: document.getElementById('cfg-yape-num').value,
    plinName: document.getElementById('cfg-plin-name').value,
    plinNum: document.getElementById('cfg-plin-num').value,
    bcp: document.getElementById('cfg-bcp').value,
    bbva: document.getElementById('cfg-bbva').value,
    interbank: document.getElementById('cfg-interbank').value
  };
  localStorage.setItem('my_payment_accounts', JSON.stringify(data));
  renderGlobalMessages();
}

function loadPaymentSettings() {
  const raw = localStorage.getItem('my_payment_accounts');
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (document.getElementById('cfg-yape-name')) document.getElementById('cfg-yape-name').value = data.yapeName || '';
      if (document.getElementById('cfg-yape-num')) document.getElementById('cfg-yape-num').value = data.yapeNum || '';
      if (document.getElementById('cfg-plin-name')) document.getElementById('cfg-plin-name').value = data.plinName || '';
      if (document.getElementById('cfg-plin-num')) document.getElementById('cfg-plin-num').value = data.plinNum || '';
      if (document.getElementById('cfg-bcp')) document.getElementById('cfg-bcp').value = data.bcp || '';
      if (document.getElementById('cfg-bbva')) document.getElementById('cfg-bbva').value = data.bbva || '';
      if (document.getElementById('cfg-interbank')) document.getElementById('cfg-interbank').value = data.interbank || '';
    } catch(e) {}
  }
}

function getProcessedPaymentTemplate() {
  const raw = localStorage.getItem('my_payment_accounts');
  let base = GLOBAL_TEMPLATES["💳 Medios de Pago"];
  if (raw) {
    try {
      const d = JSON.parse(raw);
      if (d.yapeName) base = base.replace('(Nombre del titular)', d.yapeName);
      if (d.yapeNum) base = base.replace('(Número de Yape)', d.yapeNum);
      if (d.plinName) base = base.replace('(Nombre del titular)', d.plinName);
      if (d.plinNum) base = base.replace('(Número de Plin)', d.plinNum);
      if (d.bcp) base = base.replace('(Número de cuenta BCP)', d.bcp);
      if (d.bbva) base = base.replace('(Número de cuenta BBVA)', d.bbva);
      if (d.interbank) base = base.replace('(Número de cuenta Interbank)', d.interbank);
    } catch(e) {}
  }
  return base;
}

function copy(id) {
  const el = document.getElementById(id);
  if (!el.value) return;
  el.select();
  navigator.clipboard.writeText(el.value);
  alert("¡Copiado al portapapeles listo para enviar!");
}

window.onload = () => {
  loadPaymentSettings();
  init();
};
