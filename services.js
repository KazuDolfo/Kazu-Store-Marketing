const SERVICES = [
  // STREAMING Y TV
  { name: "Netflix", cost: 10.00, price: 15.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "🎬",
    templates: {
      "🎬 Promo S/13 (1ra Compra)": `🎬 *NETFLIX PREMIUM ULTRA HD 4K (30 DÍAS)*

Precio regular: S/ 15.00
🎉 *Oferta de Bienvenida:* solo *S/ 13.00*

• Perfil privado con PIN exclusivo (cero interrupciones)
• Máxima calidad 4K en Smart TV, TV Box, Celular o PC
• Activación inmediata con garantía directa por 30 días

📲 ¿Deseas activarlo ahora? Escríbeme y te paso los datos de pago al instante.`,

      "🎁 Programa de Referidos (Ahorra S/1)": `🎁 *PROGRAMA DE CLIENTES VIP: RECOMIENDA Y AHORRA*

Comparte tu buena experiencia con amigos o familiares y paga menos en tu siguiente mes:

✅ Por cada persona que compre con nosotros gracias a ti, recibes *S/ 1.00 de saldo a favor*.
💰 Acumula tus descuentos y paga solo *S/ 12.00* por tu siguiente renovación.

🎉 ¡Invita a tus conocidos y ahorra mes a mes!`
    }
  },
  { name: "Disney+ Estándar", cost: 3.50, price: 7.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "✨",
    templates: {
      "✨ Info Disney Estándar": `✨ *DISNEY+ ESTÁNDAR (30 DÍAS)*

Todo el contenido familiar y estrenos exclusivos en un solo lugar.

• Películas y series completas de Disney, Pixar, Marvel y Star Wars
• Perfil privado con PIN de seguridad
• Inversión: *S/ 7.00* por 30 días (Garantía activa)

📲 Escríbeme para enviarte los datos de pago y darte acceso inmediato.`
    }
  },
  { name: "Disney+ Premium (con ESPN)", cost: 5.50, price: 10.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "🏆",
    templates: {
      "🏆 Pack Deportes en Vivo + Disney": `🏆 *DISNEY+ PREMIUM CON ESPN EN VIVO (30 DÍAS)*

Vive la emoción de los eventos deportivos más importantes + todo el catálogo de Disney y Marvel.

⚽ *Deportes en directo:* Champions League, Premier League, F1, UFC y NBA
📺 *Beneficios:* Transmisión fluida en HD, perfil privado con PIN y soporte continuo
💳 *Inversión:* *S/ 10.00* por 30 días

📲 Escríbeme para activártelo al instante.`
    }
  },
  { name: "Max Estándar", cost: 3.50, price: 7.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "🍿",
    templates: {
      "🍿 Info Max Estándar": `🍿 *MAX ESTÁNDAR (30 DÍAS)*

Disfruta de las producciones más aclamadas del cine y la televisión.

• Catálogo completo de HBO, Warner Bros, DC y Discovery
• Perfil privado con PIN y reproducción en Full HD
• Inversión: *S/ 7.00* por 30 días

📲 ¿Deseas activarlo hoy? Escríbeme y te paso los accesos.`
    }
  },
  { name: "Amazon Prime Video (Cuenta)", cost: 15.00, price: 25.00, category: "Streaming y TV", mode: "cuenta_completa", duration: 30, icon: "📦",
    templates: {
      "📦 Cuenta Completa Prime": `📦 *AMAZON PRIME VIDEO (CUENTA COMPLETA - 30 DÍAS)*

Acceso total y exclusivo para ti y tu familia sin compartir con extraños.

• Todos los perfiles disponibles para tus dispositivos
• Series originales exclusivas de Prime y películas de estreno
• Inversión: *S/ 25.00* por 30 días completos

📲 Escríbeme para crearte tu cuenta personalizada al instante.`
    }
  },
  { name: "Paramount+", cost: 4.50, price: 8.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "⭐",
    templates: {
      "⭐ Info Paramount+": `⭐ *PARAMOUNT+ (30 DÍAS)*

Grandes éxitos de taquilla, series exclusivas y torneos deportivos.

• Perfil privado con PIN y garantía por 30 días
• Inversión: *S/ 8.00*

📲 Escríbeme para pasarte los datos de activación.`
    }
  },
  { name: "Crunchyroll Fan", cost: 3.50, price: 7.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "⛩️",
    templates: {
      "⛩️ Anime Sin Publicidad": `⛩️ *CRUNCHYROLL FAN (30 DÍAS)*

La mayor biblioteca de anime del mundo sin interrupciones.

• Estrenos simultáneos con Japón (simulcast)
• Sin anuncios y en calidad HD 1080p
• Inversión: *S/ 7.00* por 30 días

📲 Escríbeme si deseas activar tu perfil hoy mismo.`
    }
  },
  { name: "Oleada TV", cost: 5.00, price: 9.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "📺",
    templates: {
      "📺 Info Oleada TV": `📺 *OLEADA TV (30 DÍAS)*

Televisión en vivo premium para Smart TV, TV Box y smartphones.

• Canales nacionales, internacionales, películas y deportes
• Servidores ultra estables con soporte continuo
• Inversión: *S/ 9.00* por 30 días

📲 Escríbeme para darte acceso de inmediato.`
    }
  },
  { name: "IPTV (1 Mes)", cost: 10.00, price: 18.00, category: "Streaming y TV", mode: "iptv", duration: 30, icon: "📡",
    templates: {
      "📡 Pack Completo IPTV": `📡 *SERVICIO IPTV PRIVADO (30 DÍAS)*

Más de 1,000 canales en vivo, eventos deportivos PPV, películas y series bajo demanda.

• Compatible con Smart TV, Magis, Firestick, TV Box y Celular
• Señal en alta definición sin cortes
• Inversión: *S/ 18.00* por 30 días

📲 Solicita tu activación escribiéndome por este chat.`
    }
  },
  { name: "Xuper TV (Permanente)", cost: 20.00, price: 35.00, category: "Streaming y TV", mode: "permanente", duration: 0, icon: "⚡",
    templates: {
      "⚡ Acceso Permanente Xuper TV": `⚡ *XUPER TV (ACCESO PERMANENTE)*

Olvídate de pagar mensualidades. Televisión ilimitada en un solo pago.

• Cientos de canales en vivo y contenido actualizado
• Pago único de por vida: *S/ 35.00* (Sin mensualidades)
• Instalación guiada paso a paso

📲 Escríbeme para enviarte tu usuario y enlace de descarga.`
    }
  },

  // MÚSICA
  { name: "Spotify Premium", cost: 5.00, price: 9.00, category: "Música", mode: "musica", duration: 30, icon: "🎧",
    templates: {
      "🎧 Spotify Sin Anuncios": `🎧 *SPOTIFY PREMIUM INDIVIDUAL (30 DÍAS)*

Música continua sin anuncios, saltos ilimitados y descargas offline en máxima calidad de audio.

• Activación en tu propia cuenta o perfil nuevo garantizado
• Inversión: *S/ 9.00* por 30 días

📲 ¿Deseas activarlo hoy? Escríbeme para coordinar.`
    }
  },
  { name: "YouTube Premium", cost: 5.00, price: 9.00, category: "Música", mode: "musica", duration: 30, icon: "▶️",
    templates: {
      "▶️ YouTube Sin Cortes": `▶️ *YOUTUBE PREMIUM + YT MUSIC (30 DÍAS)*

Disfruta de todos los videos de YouTube sin anuncios molestos y con pantalla apagada.

• Incluye YouTube Music Premium para tus canciones
• Reproducción en segundo plano y descargas offline
• Activación directa a tu correo: *S/ 9.00* por 30 días

📲 Escríbeme tu correo de YouTube para activarte.`
    }
  },
  { name: "Tidal HiFi", cost: 5.00, price: 9.00, category: "Música", mode: "musica", duration: 30, icon: "🎵",
    templates: {
      "🎵 Audio Master Tidal": `🎵 *TIDAL HIFI (30 DÍAS)*

La mejor calidad de sonido del mercado (Audio Master / Hi-Res Lossless).

• Ideal para audiófilos y parlantes/auriculares de alta gama
• Inversión: *S/ 9.00* por 30 días

📲 Escríbeme para darte acceso al instante.`
    }
  },
  { name: "Deezer Premium", cost: 5.00, price: 9.00, category: "Música", mode: "musica", duration: 30, icon: "🎶",
    templates: {
      "🎶 Info Deezer Premium": `🎶 *DEEZER PREMIUM (30 DÍAS)*

Catálogo de más de 90 millones de canciones sin publicidad y con letra sincronizada.

• Calidad FLAC y modo sin conexión
• Inversión: *S/ 9.00* por 30 días

📲 Escríbeme para activarte hoy mismo.`
    }
  },

  // SISTEMAS Y OFIMÁTICA
  { name: "Windows 11 Pro / Home", cost: 13.50, price: 25.00, category: "Sistemas y Ofimática", mode: "licencia", duration: 0, icon: "💻",
    templates: {
      "💻 Licencia Oficial Windows 11": `💻 *LICENCIA ORIGINAL WINDOWS 11 PRO / HOME*

Protege y optimiza tu equipo con una clave genuina y permanente.

• Activación oficial de por vida para 1 PC (libre de virus o cracks)
• Actualizaciones de seguridad directas de Microsoft
• Inversión única: *S/ 25.00* (Pago único)

📲 Te entrego la clave con guía paso a paso y soporte en la activación.`
    }
  },
  { name: "Windows 10 Pro / Home", cost: 13.50, price: 25.00, category: "Sistemas y Ofimática", mode: "licencia", duration: 0, icon: "🖥️",
    templates: {
      "🖥️ Licencia Oficial Windows 10": `🖥️ *LICENCIA ORIGINAL WINDOWS 10 PRO / HOME*

Activa tu sistema operativo de forma oficial, estable y permanente.

• Clave genuina de por vida para 1 PC
• Soporte y garantía directa
• Inversión única: *S/ 25.00*

📲 Escríbeme para pasarte tu clave de activación.`
    }
  },
  { name: "Microsoft 365 (1 Año)", cost: 14.00, price: 30.00, category: "Sistemas y Ofimática", mode: "cuenta_anual", duration: 365, icon: "📑",
    templates: {
      "📑 Office 365 + 1TB OneDrive": `📑 *MICROSOFT 365 (1 AÑO COMPLETO)*

Word, Excel, PowerPoint, Outlook oficiales + 1TB de almacenamiento en la nube OneDrive.

• Válido para hasta 5 dispositivos (PC, Mac, Tablet y Celular)
• 1 TB de espacio seguro para tus fotos, copias y documentos
• Inversión: *S/ 30.00* por todo el año

📲 Escríbeme para entregarte tu cuenta personalizada.`
    }
  },

  // IA Y HERRAMIENTAS
  { name: "Gemini Pro (18 Meses)", cost: 15.00, price: 35.00, category: "IA y Herramientas", mode: "cuenta_duracion", duration: 540, labelDur: "18 Meses", icon: "🤖",
    templates: {
      "🤖 Acceso Gemini Pro 18M": `🤖 *GEMINI PRO DE GOOGLE (ACCESO 18 MESES)*

La inteligencia artificial más avanzada de Google para estudio, programación y trabajo.

• Análisis avanzado de textos, imágenes, PDFs y generación de código
• Acceso garantizado durante 18 meses continuos
• Inversión: *S/ 35.00* (Pago único por 18 meses)

📲 Escríbeme para pasarte tu acceso de inmediato.`
    }
  },
  { name: "ChatGPT Go (1 Mes)", cost: 6.00, price: 12.00, category: "IA y Herramientas", mode: "perfil", duration: 30, icon: "💬",
    templates: {
      "💬 Info ChatGPT": `💬 *CHATGPT GO (30 DÍAS)*

Respuestas rápidas, redacción profesional, resolución de dudas y asistencia 24/7 con IA.

• Sin límites y con alta velocidad de respuesta
• Inversión: *S/ 12.00* por 30 días

📲 Escríbeme para darte acceso.`
    }
  },
  { name: "Lovable Pro (1 Mes)", cost: 12.00, price: 22.00, category: "IA y Herramientas", mode: "perfil", duration: 30, icon: "💖",
    templates: {
      "💖 Info Lovable Pro": `💖 *LOVABLE PRO (30 DÍAS)*

Crea aplicaciones web y software funcional a partir de texto en minutos.

• Herramienta líder para desarrolladores y creadores digitales
• Inversión: *S/ 22.00* por 30 días

📲 Escríbeme para solicitar tu acceso.`
    }
  },
  { name: "iLovePDF (1 Año)", cost: 9.00, price: 18.00, category: "IA y Herramientas", mode: "cuenta_anual", duration: 365, icon: "📄",
    templates: {
      "📄 iLovePDF Premium 1 Año": `📄 *iLOVEPDF PREMIUM (1 AÑO COMPLETO)*

Edita, une, divide, comprime, firma y convierte PDFs sin límites de tamaño ni anuncios.

• Herramienta esencial para oficina, trámites y estudiantes
• Inversión: *S/ 18.00* por todo el año

📲 Escríbeme para entregarte tu cuenta Premium.`
    }
  },
  { name: "Miro Panel (100 Miembros)", cost: 45.00, price: 80.00, category: "IA y Herramientas", mode: "panel", duration: 0, icon: "📋",
    templates: {
      "📋 Panel Miro 100 Miembros": `📋 *PANEL MIRO ENTERPRISE (100 MIEMBROS)*

Pizarras interactivas ilimitadas para gestión de proyectos y equipos de trabajo.

• Capacidad para hasta 100 miembros administrables
• Inversión: *S/ 80.00*

📲 Escríbeme para coordinar la activación de tu panel.`
    }
  },

  // DISEÑO Y EDICIÓN
  { name: "Canva Pro (1 Año)", cost: 5.00, price: 15.00, category: "Diseño y Edición", mode: "invitacion_anual", duration: 365, icon: "🎨",
    templates: {
      "🎨 Canva Pro 1 Año": `🎨 *CANVA PRO (1 AÑO COMPLETO)*

Lleva tus diseños al siguiente nivel con acceso total a todas las herramientas Pro.

• Millones de plantillas, fotos premium, videos y quitafondos con 1 clic
• Activación directa a tu propio correo (conservas tus proyectos)
• Inversión: *S/ 15.00* por todo el año

📲 Pásame tu correo de Canva para enviarte el acceso Pro al instante.`
    }
  },
  { name: "Adobe Express (6 Meses)", cost: 12.00, price: 25.00, category: "Diseño y Edición", mode: "cuenta_duracion", duration: 180, labelDur: "6 Meses", icon: "🖌️",
    templates: {
      "🖌️ Adobe Express 6 Meses": `🖌️ *ADOBE EXPRESS PREMIUM (6 MESES)*

Crea contenido visual de alto impacto con herramientas de inteligencia artificial de Adobe Firefly.

• Plantillas profesionales, fuentes premium y edición rápida
• Inversión: *S/ 25.00* por 6 meses

📲 Escríbeme para darte acceso.`
    }
  },
  { name: "CapCut Pro (1 Mes)", cost: 11.00, price: 18.00, category: "Diseño y Edición", mode: "perfil", duration: 30, icon: "✂️",
    templates: {
      "✂️ CapCut Pro 30 Días": `✂️ *CAPCUT PRO (30 DÍAS)*

Edita videos profesionales para TikTok, Reels y YouTube sin marcas de agua.

• Efectos, transiciones, subtítulos automáticos y herramientas con IA
• Inversión: *S/ 18.00* por 30 días

📲 Escríbeme para activarte hoy mismo.`
    }
  },
  { name: "Autodesk AutoCAD (1 Año)", cost: 12.00, price: 25.00, category: "Diseño y Edición", mode: "invitacion_anual", duration: 365, icon: "📐",
    templates: {
      "📐 AutoCAD Original 1 Año": `📐 *AUTODESK AUTOCAD (1 AÑO COMPLETO)*

Software líder de diseño 2D y 3D para arquitectura e ingeniería.

• Activación original vinculada a tu correo institucional o personal
• Acceso oficial y descargas directas de Autodesk
• Inversión: *S/ 25.00* por 1 año

📲 Pásame tu correo para habilitar tu licencia.`
    }
  }
];

const GLOBAL_TEMPLATES = {
  "👋 Saludo / Catálogo Digital": `¡Hola! Qué gusto saludarte de parte de *KazuStore*. ⚡ Te comparto nuestro catálogo con activación inmediata y garantía directa:

🍿 *STREAMING Y TV (30 Días Garantizados):*
• Netflix Ultra HD: S/ 15.00 (Promo 1ra compra: S/ 13.00)
• Disney+ Estándar: S/ 7.00 | Con ESPN: S/ 10.00
• Max Estándar: S/ 7.00 | Prime Video: S/ 25.00
• Paramount+: S/ 8.00 | Crunchyroll Fan: S/ 7.00
• IPTV: S/ 18.00 | Xuper TV (Permanente): S/ 35.00

🎧 *MÚSICA (30 Días):*
• Spotify: S/ 9.00 | YouTube Premium: S/ 9.00

💻 *SISTEMAS Y PRODUCTIVIDAD:*
• Windows 10 / 11 Pro: S/ 25.00 | Office 365 (1 Año): S/ 30.00
• Canva Pro (1 Año): S/ 15.00 | Gemini Pro (18M): S/ 35.00

💡 *Garantía asegurada:* Cuentas estables y soporte continuo en *KazuStore*. ¿Cuál te gustaría activar hoy?`,

  "🛠️ Soporte y Respaldo Inmediato": `Hola, qué tal. Te saluda el equipo de *KazuStore*. Lamento la molestia, no te preocupes que tu servicio cuenta con *garantía activa* y lo resolvemos juntos ahora mismo.

Para solucionarlo de una vez, compárteme por favor:
1. Captura del error en tu pantalla.
2. El correo o usuario del servicio.

Lo verifico de inmediato para restablecer tu acceso.`,

  "✅ Problema Solucionado": `✅ *¡SERVICIO RESTABLECIDO CON ÉXITO!*

¡Hola! Tu cuenta ya quedó lista y 100% operativa.

🍿 *Por favor ingresa a tu perfil y reproduce cualquier película, serie o contenido para verificar que todo fluya perfecto.*

Disculpa el inconveniente presentado. ¡Muchas gracias por tu confianza en *KazuStore* y que disfrutes al máximo de tu servicio! 🙌`,

  "⏰ Recordatorio de Renovación VIP": `¡Hola! Te saludamos de *KazuStore*. Paso a avisarte que tu servicio de 30 días está próximo a vencer en las siguientes 24 horas.

📌 *Beneficios de renovar con anticipación:*
• Conservas tu mismo perfil, historial y listas sin cortes.
• Aseguras tu cupo prioritario.

¿Deseas mantener tu cuenta activa? Confírmame por aquí para pasarte los datos de pago (Yape / Plin). ¡Gracias por tu confianza! 🙌`,

  "💳 Medios de Pago": `💳 *MEDIOS DE PAGO OFICIALES - KAZUSTORE*

Puedes realizar tu pago de manera rápida y segura por:

📱 *BILLETERAS DIGITALES:*

💜 *Yape:*
Nombre: (Nombre del titular)
Número: (Número de Yape)

💙 *Plin:*
Nombre: (Nombre del titular)
Número: (Número de Plin)

🏦 *TRANSFERENCIAS BANCARIAS:*

🟠 *BCP:*
Cuenta / CCI: (Número de cuenta BCP)
Titular: (Nombre del titular)

🔵 *BBVA:*
Cuenta / CCI: (Número de cuenta BBVA)
Titular: (Nombre del titular)

🟢 *Interbank:*
Cuenta / CCI: (Número de cuenta Interbank)
Titular: (Nombre del titular)

📌 *Nota:* Me envías la captura del comprobante por este chat para entregarte el acceso de inmediato. 🙌`,
};

const STRATEGIES = {
  "gancho_confianza": `🔥 *¡OFERTA DE BIENVENIDA KAZUSTORE!* 🔥

¿Primera vez que compras con nosotros? En *KazuStore* queremos que pruebes la calidad y estabilidad de nuestro servicio con total seguridad.

🎁 *Precios especiales de primer mes:*
• *Disney+ Estándar:* solo *S/ 5.00* (Antes: S/ 7.00)
• *Spotify Premium:* solo *S/ 7.00* (Antes: S/ 9.00)
• *Netflix Premium HD:* solo *S/ 13.00* (Antes: S/ 15.00)

✅ Activación rápida y soporte directo
✅ Sin cortes ni riesgos

📲 Escríbeme y solicita tu acceso de bienvenida antes de que se agoten los cupos.`,

  "retencion_anticipada": `⏰ *¡PREMIO POR FIDELIDAD Y RENOVACIÓN ANTICIPADA!*

¡Hola! Tu servicio vence pronto y queremos premiar tu preferencia.

🎁 Si aseguras tu renovación hoy (antes de las últimas 24 horas), recibes un *descuento especial de S/ 2.00* en tu siguiente mes.

• Mantienes tu perfil, favoritos e historial sin interrupciones.
• Disfrutas del mejor precio garantizado.

📲 Respóndeme este mensaje para aplicar tu descuento en Yape/Plin. 🙌`,

  "combo_cine": `🍿 *PACK CINE EN CASA (30 DÍAS DE STREAMING TOTAL)* 🎬

Disfruta de las mejores películas y estrenos en alta definición:
✅ *Netflix Premium Ultra HD 4K*
   • Series top, películas y perfil privado con PIN
✅ *Max Estándar (HBO, DC y Warner)*
   • Estrenos de cine, series exclusivas y producciones HBO

❌ Precio individual: ~S/ 22.00~
💥 *PRECIO COMBO: S/ 19.00* (¡Ahorras S/ 3.00!)

• Perfiles privados con PIN y garantía por 30 días
• Entrega inmediata

📲 Escríbeme para enviarte los datos de pago.`,

  "combo_pro": `💻 *PACK PRODUCTIVIDAD Y DISEÑO (1 AÑO COMPLETO)* 🚀

Las herramientas indispensables para tu trabajo o estudio:
✅ *Microsoft 365 (1 Año)*
   • Word, Excel, PPT oficiales + 1TB en OneDrive
✅ *Canva Pro (1 Año)*
   • Quitafondos en 1 clic, fotos y plantillas Pro en tu correo

❌ Precio individual: ~S/ 45.00~
💥 *PRECIO PACK ANUAL: S/ 38.00* (¡Ahorras S/ 7.00!)

• Activación permanente y soporte asegurado
📲 Escríbeme para activarte hoy mismo.`
};
