const SERVICES = [
  // STREAMING Y TV
  { name: "Netflix", cost: 10.00, price: 15.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "🎬",
    templates: {
      "🎬 Ficha de Venta": `¡Excelente elección! En *KazuStore* cuidamos tu acceso para que disfrutes sin interrupciones.

🎬 *Netflix Ultra HD 4K (30 Días):*
• Perfil 100% privado con PIN exclusivo para 1 dispositivo.
• Calidad máxima 4K HDR + audio espacial.
• Garantía directa y soporte continuo durante tus 30 días.

🔒 *Para tu máxima estabilidad:* Mantener tu PIN asignado y disfrutar en 1 pantalla a la vez.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 15.00~ ➔ *Tu primer mes a solo S/ 13.00*.

¿Prefieres activarlo vía Yape o Plin para enviarte tus accesos de inmediato?`,

      "🎁 Programa Referidos": `🎁 *PROGRAMA DE CLIENTES VIP: RECOMIENDA Y AHORRA*

Comparte tu buena experiencia con amigos o familiares y paga menos en tu siguiente mes:
✅ Por cada persona que compre con nosotros gracias a ti, recibes *S/ 1.00 de saldo a favor*.
💰 Acumula tus descuentos y paga solo *S/ 12.00* por tu siguiente renovación.

🎉 ¡Invita a tus conocidos y ahorra mes a mes!`
    }
  },
  { name: "Disney+ Estándar", cost: 3.50, price: 10.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "✨",
    templates: {
      "✨ Ficha de Venta": `¡Hola! Disfruta de todo el universo de Disney, Pixar, Marvel y Star en un solo lugar.

✨ *Disney+ Estándar (30 Días):*
• Perfil privado con PIN en resolución Full HD sin anuncios.
• Descargas habilitadas para ver tus series sin conexión.
• Cobertura y garantía activa por 30 días.

🔒 *Para tu máxima estabilidad:* Uso exclusivo en 1 pantalla a la vez.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 10.00~ ➔ *Tu primer mes a solo S/ 7.00*.

¿Te paso los datos para cancelarlo por Yape o Plin?`
    }
  },
  { name: "Disney+ Premium (con ESPN)", cost: 5.50, price: 13.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "🏆",
    templates: {
      "🏆 Ficha de Venta": `Si buscas deportes en vivo y máxima definición, esta es la mejor opción.

🏆 *Disney+ Premium con ESPN (30 Días):*
• Catálogo completo + todos los canales y eventos exclusivos de *ESPN en vivo* (Champions League, F1, UFC, Premier).
• Audio envolvente Dolby Atmos y video 4K UHD.
• Soporte y garantía completa por 30 días.

🔒 *Para tu máxima estabilidad:* Perfil propio con PIN para 1 conexión simultánea.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 13.00~ ➔ *Tu primer mes a solo S/ 10.00*.

¿Deseas activarlo en este momento por Yape o Plin?`
    }
  },
  { name: "Max Estándar", cost: 3.50, price: 10.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "🍿",
    templates: {
      "🍿 Ficha de Venta": `¡Hola! Las producciones más aclamadas de HBO, Warner y Discovery las tienes aquí.

🍿 *Max Estándar (30 Días):*
• Perfil personalizado con PIN para 1 pantalla en Full HD.
• Estrenos directos de cine a tu pantalla sin comerciales.
• Garantía de reposición activa durante todo tu período.

🔒 *Para tu máxima estabilidad:* Uso en 1 dispositivo conectado.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 10.00~ ➔ *Tu primer mes a solo S/ 7.00*.

¿Te brindo el número de Yape o Plin para tu entrega?`
    }
  },
  { name: "Amazon Prime Video (Cuenta)", cost: 15.00, price: 30.00, category: "Streaming y TV", mode: "cuenta_completa", duration: 30, icon: "📦",
    templates: {
      "📦 Ficha de Venta": `¡La opción ideal para disfrutar en familia con total libertad!

📦 *Prime Video (Cuenta Completa Familiar - 30 Días):*
• Cuenta totalmente privada (control total de hasta 3 pantallas en simultáneo).
• Calidad 4K Ultra HD + HDR.
• Posibilidad de activar con tu propio correo o cuenta nueva lista.
• Garantía directa por 30 días.

🔒 *Para tu tranquilidad:* Puedes personalizar todos tus perfiles familiares con total control.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 30.00~ ➔ *Tu primer mes a solo S/ 25.00*.

¿Te paso los datos para Yape o Plin y te genero la cuenta?`
    }
  },
  { name: "Paramount+", cost: 4.50, price: 11.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "⭐",
    templates: {
      "⭐ Ficha de Venta": `¡Hola! Accede a cine de estreno, series exclusivas y fútbol en vivo.

⭐ *Paramount+ Premium (30 Días):*
• Pantalla asignada con streaming fluido en Full HD / 4K.
• Todo Paramount, Showtime, Nickelodeon y Premier League en vivo.
• Soporte continuo y garantía de 30 días.

🔒 *Para tu máxima estabilidad:* Perfil de uso personal en 1 pantalla.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 11.00~ ➔ *Tu primer mes por solo S/ 8.00*.

¿Prefieres hacer el abono por Yape o Plin?`
    }
  },
  { name: "Crunchyroll Fan", cost: 3.50, price: 10.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "⛩️",
    templates: {
      "⛩️ Ficha de Venta": `¡Hola! Todo el anime en simulcast con Japón sin pausas comerciales.

⛩️ *Crunchyroll Fan (30 Días):*
• Pantalla privada en Full HD 1080p sin ningún anuncio.
• Capítulos estreno 1 hora después de su emisión en Japón.
• 30 días con respaldo y soporte total de KazuStore.

🔒 *Para tu máxima estabilidad:* Conexión en 1 dispositivo a la vez.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 10.00~ ➔ *Tu primer mes a solo S/ 7.00*.

¿Lo dejamos activo hoy por Yape o Plin?`
    }
  },
  { name: "Oleada TV", cost: 5.00, price: 12.00, category: "Streaming y TV", mode: "perfil", duration: 30, icon: "📺",
    templates: {
      "📺 Ficha de Venta": `¡Hola! Accede a televisión en vivo nacional e internacional con servidores fluidos.

📺 *Oleada TV (30 Días):*
• Canales en directo, deportes, infantiles y películas.
• Compatible con Android TV, TV Box, Firestick y Celular.
• Soporte y garantía continua por 30 días.

🔒 *Para tu máxima estabilidad:* 1 dispositivo activo (conexión de 10 Mbps recomendada).
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 12.00~ ➔ *Tu primer mes a solo S/ 9.00*.

¿Te paso los datos para Yape o Plin?`
    }
  },
  { name: "IPTV (1 Mes)", cost: 10.00, price: 23.00, category: "Streaming y TV", mode: "iptv", duration: 30, icon: "📡",
    templates: {
      "📡 Ficha de Venta": `¡Dile adiós a los recibos caros de cable tradicional!

📡 *IPTV Latino & Internacional (30 Días):*
• Más de 2,500 canales en vivo (Fútbol Libre, Fox Sports, ESPN, Cine 24/7) + miles de películas y series VOD actualizadas.
• Compatible con Smart TV, TV Box, IPTV Smarters, Mag y PC.
• 30 días de señal continua y estable.

🔒 *Para tu máxima estabilidad:* 1 conexión activa simultánea.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 23.00~ ➔ *Tu primer mes por solo S/ 18.00*.

¿En qué dispositivo lo vas a ver para darte la app correcta, Smart TV o celular?`
    }
  },
  { name: "Xuper TV (Permanente)", cost: 20.00, price: 50.00, category: "Streaming y TV", mode: "permanente", duration: 0, icon: "💎",
    templates: {
      "💎 Ficha de Venta": `¡La solución definitiva sin preocuparte por mensualidades!

💎 *Xuper TV (Licencia Permanente):*
• Canales en vivo, series y películas sin pagar mensualidad nunca más.
• Servidores ultra estables de bajo consumo de ancho de banda.
• Soporte y guía paso a paso para instalación.

🔒 *Para tu tranquilidad:* Licencia permanente para 1 dispositivo Android.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 50.00~ ➔ *Acceso definitivo por solo S/ 35.00*.

¿Deseas la guía de instalación y los datos para Yape o Plin?`
    }
  },

  // MÚSICA
  { name: "Spotify Premium", cost: 5.00, price: 12.00, category: "Música", mode: "musica", duration: 30, icon: "🎧",
    templates: {
      "🎧 Ficha de Venta": `¡Música sin límites ni interrupciones comerciales!

🎧 *Spotify Premium Individual (30 Días):*
• Música en calidad Very High (320 kbps) y descargas sin conexión.
• Saltos ilimitados y compatible con Spotify Connect en parlantes y Smart TVs.
• Renovable mes a mes conservando tus playlists y recomendaciones.

🔒 *Para tu tranquilidad:* Cuenta individual de uso personal.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 12.00~ ➔ *Tu primer mes por solo S/ 9.00*.

¿Lo activamos a tu correo actual o prefieres una cuenta lista?`
    }
  },
  { name: "YouTube Premium", cost: 5.00, price: 13.00, category: "Música", mode: "musica", duration: 30, icon: "🔴",
    templates: {
      "🔴 Ficha de Venta": `¡Disfruta de YouTube como debe ser: sin un solo anuncio!

🔴 *YouTube Premium + YouTube Music (30 Días):*
• Cero publicidad en videos en Smart TV, celular y PC.
• Reproducción en segundo plano con pantalla apagada en tu celular.
• Descargas libres + biblioteca musical completa de YouTube Music.
• Activación oficial directa a tu propia cuenta de Gmail (sin pedir tu clave).

🔒 *Requisito de Google:* Tu cuenta no debe haber cambiado de grupo familiar más de 1 vez en los últimos 12 meses.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 13.00~ ➔ *Tu primer mes por solo S/ 9.00*.

¿A qué correo de Gmail te enviamos la invitación tras tu abono por Yape o Plin?`
    }
  },
  { name: "Tidal HiFi", cost: 5.00, price: 12.00, category: "Música", mode: "musica", duration: 30, icon: "🎵",
    templates: {
      "🎵 Ficha de Venta": `¡Lleva tu experiencia musical a nivel audiófilo de estudio!

🎵 *Tidal HiFi / Master (30 Días):*
• Calidad de audio Master / Lossless sin compresión (hasta 24-bit, 192 kHz).
• Sonido inmersivo Dolby Atmos y Sony 360 Reality Audio.
• Más de 100 millones de canciones sin anuncios.

🔒 *Para tu tranquilidad:* Perfil individual de uso personal.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 12.00~ ➔ *Tu primer mes a solo S/ 9.00*.

¿Prefieres hacer el pago por Yape o Plin?`
    }
  },
  { name: "Deezer Premium", cost: 5.00, price: 12.00, category: "Música", mode: "musica", duration: 30, icon: "💜",
    templates: {
      "💜 Ficha de Venta": `¡Música en alta fidelidad y recomendaciones inteligentes!

💜 *Deezer Premium (30 Días):*
• Sonido en formato FLAC de alta fidelidad (16 bits, 44.1 kHz).
• Función Flow para descubrir música según tus gustos y descargas ilimitadas.
• 30 días con respaldo total de KazuStore.

🔒 *Para tu tranquilidad:* Uso personal en tus dispositivos.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 12.00~ ➔ *Tu primer mes a solo S/ 9.00*.

¿Te paso los datos para Yape o Plin?`
    }
  },

  // SISTEMAS Y OFIMÁTICA
  { name: "Windows 11 Pro / Home", cost: 13.50, price: 35.00, category: "Sistemas y Ofimática", mode: "licencia", duration: 0, icon: "💻",
    templates: {
      "💻 Ficha de Venta": `¡Deja tu sistema operativo activado de forma original y segura!

💻 *Licencia Windows 11 Pro / Home (Vitalicia):*
• Clave genuina alfanumérica de 25 caracteres para 1 PC.
• Activación oficial en línea en servidores de Microsoft.
• Válida de por vida, permite todas las actualizaciones y elimina marcas de agua.

🔒 *Para tu tranquilidad:* Clave genuina vinculada al hardware de tu PC (100% libre de virus o activadores).
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 35.00~ ➔ *Precio especial: S/ 25.00*.

¿Tu equipo cuenta con Windows 11 Pro o Windows 11 Home para enviarte la clave exacta?`
    }
  },
  { name: "Windows 10 Pro / Home", cost: 13.50, price: 35.00, category: "Sistemas y Ofimática", mode: "licencia", duration: 0, icon: "🖥️",
    templates: {
      "🖥️ Ficha de Venta": `¡Activa tu sistema operativo de forma oficial, estable y permanente!

🖥️ *Licencia Windows 10 Pro / Home (Vitalicia):*
• Clave genuina de 25 dígitos para activación de por vida.
• Habilita Windows Update para máxima protección contra malware.
• Compatible con arquitecturas de 32 y 64 bits.

🔒 *Para tu tranquilidad:* Licencia original para 1 computadora personal o laptop.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 35.00~ ➔ *Precio especial: S/ 25.00*.

¿Requieres Windows 10 Pro o Home para enviarte las instrucciones y el QR de Yape/Plin?`
    }
  },
  { name: "Microsoft 365 (1 Año)", cost: 14.00, price: 40.00, category: "Sistemas y Ofimática", mode: "cuenta_anual", duration: 365, icon: "📊",
    templates: {
      "📊 Ficha de Venta": `¡La suite completa de productividad para estudiar o trabajar!

📊 *Microsoft 365 Anual + 1TB OneDrive (1 Año):*
• Word, Excel, PowerPoint, Outlook, OneNote y Access oficiales siempre actualizados.
• *1,000 GB (1 TB)* de almacenamiento seguro en la nube OneDrive.
• Uso simultáneo en hasta 5 dispositivos (PC, Mac, Tablet, iPad y Celular).
• Duración: 365 días garantizados.

🔒 *Para tu tranquilidad:* Cuenta privada asignada donde tú cambias la contraseña en el primer inicio.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 40.00~ ➔ *Tu primer año por solo S/ 30.00*.

¿Te paso el número de Yape o Plin para emitirte la cuenta de inmediato?`
    }
  },

  // IA Y HERRAMIENTAS
  { name: "Gemini Pro (18 Meses)", cost: 15.00, price: 45.00, category: "IA y Herramientas", mode: "cuenta_duracion", duration: 540, labelDur: "18 Meses", icon: "✨",
    templates: {
      "✨ Ficha de Venta": `¡La mayor ventana de contexto y potencia analítica de Google en tus manos!

✨ *Google Gemini Pro (Acceso 18 Meses):*
• Análisis profundo de documentos extensos, programación avanzada y multimodalidad.
• Cobertura extendida de *18 meses continuos (540 días)*.
• Soporte y garantía activa durante todo el período.

🔒 *Para tu tranquilidad:* Acceso individual asignado con respaldo oficial.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 45.00~ ➔ *Acceso por los 18 meses a solo S/ 35.00*.

¿Prefieres cancelarlo por Yape o Plin para entregarte el usuario?`
    }
  },
  { name: "ChatGPT Go (1 Mes)", cost: 6.00, price: 15.00, category: "IA y Herramientas", mode: "perfil", duration: 30, icon: "🤖",
    templates: {
      "🤖 Ficha de Venta": `¡Aumenta tu productividad diaria con respuestas rápidas e inteligentes!

🤖 *ChatGPT Go (30 Días):*
• Redacción de informes, ideas, resúmenes y asistencia diaria sin saturación.
• Alta velocidad de respuesta y disponibilidad continua.
• 30 días garantizados con soporte KazuStore.

🔒 *Para tu tranquilidad:* Uso personal para tus proyectos y consultas.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 15.00~ ➔ *Tu primer mes a solo S/ 12.00*.

¿Deseas recibir tu acceso por Yape o Plin?`
    }
  },
  { name: "Lovable Pro (1 Mes)", cost: 12.00, price: 30.00, category: "IA y Herramientas", mode: "perfil", duration: 30, icon: "⚡",
    templates: {
      "⚡ Ficha de Venta": `¡Desarrolla aplicaciones y código con asistencia de IA a máxima velocidad!

⚡ *Lovable Pro (30 Días):*
• Cuota y herramientas Pro activas para generación y despliegue rápido de software funcional.
• 30 días de suscripción con respaldo y soporte.

🔒 *Para tu tranquilidad:* Cuenta asignada para proyectos de desarrollo.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 30.00~ ➔ *Tu primer mes por solo S/ 22.00*.

¿Te comparto los datos de pago por Yape o Plin para activarlo ahora?`
    }
  },
  { name: "iLovePDF (1 Año)", cost: 9.00, price: 25.00, category: "IA y Herramientas", mode: "cuenta_anual", duration: 365, icon: "📄",
    templates: {
      "📄 Ficha de Venta": `¡Edita y convierte tus archivos sin ninguna restricción!

📄 *iLovePDF Premium Anual (1 Año):*
• Reconocimiento óptico de caracteres (OCR) para digitalizar textos.
• Edición, unión, compresión pesada y firmas ilimitadas.
• Acceso web y aplicación de escritorio durante 365 días completos.

🔒 *Para tu tranquilidad:* Licencia personal para trabajo continuo y seguro.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 25.00~ ➔ *Suscripción anual por solo S/ 18.00*.

¿Confirmamos tu activación por Yape o Plin?`
    }
  },
  { name: "Miro Panel (100 Miembros)", cost: 45.00, price: 100.00, category: "IA y Herramientas", mode: "panel", duration: 0, icon: "📋",
    templates: {
      "📋 Ficha de Venta": `¡Gestiona proyectos y colabora con tu equipo en pizarras infinitas!

📋 *Panel Miro Enterprise (100 Miembros):*
• Pizarras colaborativas ilimitadas para gestión de proyectos y workshops.
• Capacidad para hasta 100 miembros administrables.
• Soporte para configuración y puesta en marcha.

🔒 *Para tu tranquilidad:* Panel administrativo empresarial con garantía directa.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 100.00~ ➔ *Activación promocional: S/ 80.00*.

¿Deseas los datos para abonar por Yape, Plin o Transferencia bancaria?`
    }
  },

  // DISEÑO Y EDICIÓN
  { name: "Canva Pro (1 Año)", cost: 5.00, price: 20.00, category: "Diseño y Edición", mode: "invitacion_anual", duration: 365, icon: "🎨",
    templates: {
      "🎨 Ficha de Venta": `¡Crea contenido visual impactante en cuestión de segundos!

🎨 *Canva Pro Anual (1 Año Completo):*
• Quita fondos de imágenes y videos en 1 solo clic.
• Millones de fotos, plantillas, fuentes y elementos prémium desbloqueados.
• Redimensionamiento mágico de diseños y kits de marca.
• Se activa directo a tu correo por *1 año completo (365 días)*.

🔒 *Para tu tranquilidad:* Activación limpia a tu cuenta actual (conservas todos tus diseños intactos).
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 20.00~ ➔ *Tu primer año por solo S/ 15.00*.

Paga por Yape o Plin, indícame tu correo de Canva y te vinculo en minutos. ¿Listo/a?`
    }
  },
  { name: "Adobe Express (6 Meses)", cost: 12.00, price: 35.00, category: "Diseño y Edición", mode: "cuenta_duracion", duration: 180, labelDur: "6 Meses", icon: "✨",
    templates: {
      "✨ Ficha de Venta": `¡Diseño rápido con la potencia y recursos del ecosistema Adobe!

✨ *Adobe Express Premium (6 Meses):*
• Acceso a tipografías de Adobe Fonts y miles de recursos gráficos oficiales.
• Acciones rápidas asistidas por IA generativa de Adobe Firefly.
• Duración: 6 meses de servicio garantizados (180 días).

🔒 *Para tu tranquilidad:* Licencia vinculada para uso personal sin complicaciones.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 35.00~ ➔ *Tu semestre por solo S/ 25.00*.

¿Deseas adquirirlo vía Yape o Plin?`
    }
  },
  { name: "CapCut Pro (1 Mes)", cost: 11.00, price: 25.00, category: "Diseño y Edición", mode: "perfil", duration: 30, icon: "🎬",
    templates: {
      "🎬 Ficha de Venta": `¡Edita tus videos con acabado profesional y sin marcas de agua!

🎬 *CapCut Pro (Móvil y PC - 30 Días):*
• Efectos, transiciones y animaciones Pro desbloqueadas.
• Generación de subtítulos automáticos y herramientas de IA visual.
• Exportación limpia en 4K a 60 FPS.
• Duración: 30 días garantizados.

🔒 *Para tu tranquilidad:* Sesión asignada de uso personal.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 25.00~ ➔ *Tu primer mes a solo S/ 18.00*.

¿Te paso el QR de Yape o prefieres número de Plin?`
    }
  },
  { name: "Autodesk AutoCAD (1 Año)", cost: 12.00, price: 35.00, category: "Diseño y Edición", mode: "invitacion_anual", duration: 365, icon: "📐",
    templates: {
      "📐 Ficha de Venta": `¡Dibuja, diseña y proyecta con la herramienta líder de arquitectura e ingeniería!

📐 *Licencia Autodesk AutoCAD (1 Año Completo):*
• Descarga e instalación directa desde la web oficial de Autodesk.
• Uso de herramientas completas 2D y modelado 3D.
• Licencia válida por *1 año completo (365 días)*.

🔒 *Para tu tranquilidad:* Se vincula a tu correo personal o institucional con garantía anual.
🎁 *Beneficio de Bienvenida:* Precio regular ~S/ 35.00~ ➔ *Tu licencia anual por solo S/ 25.00*.

¿A qué correo te enviamos el acceso tras tu confirmación por Yape o Plin?`
    }
  }
];

const GLOBAL_TEMPLATES = {
  "👋 Saludo / Catálogo Digital": `¡Hola! Qué gusto saludarte de parte de *KazuStore*. ⚡ Te comparto nuestro catálogo con activación inmediata y garantía directa:

🍿 *STREAMING Y TV (30 Días Garantizados):*
• Netflix Ultra HD: S/ 15.00 (Promo 1ra compra: S/ 13.00)
• Disney+ Estándar: S/ 10.00 (Promo: S/ 7.00) | Con ESPN: S/ 13.00 (Promo: S/ 10.00)
• Max Estándar: S/ 10.00 (Promo: S/ 7.00) | Prime Video: S/ 30.00 (Promo: S/ 25.00)
• Paramount+: S/ 11.00 (Promo: S/ 8.00) | Crunchyroll Fan: S/ 10.00 (Promo: S/ 7.00)
• IPTV: S/ 23.00 (Promo: S/ 18.00) | Xuper TV (Permanente): S/ 50.00 (Promo: S/ 35.00)

🎧 *MÚSICA (30 Días):*
• Spotify Premium: S/ 12.00 (Promo: S/ 9.00)
• YouTube Premium: S/ 13.00 (Promo: S/ 9.00)

💻 *SISTEMAS Y PRODUCTIVIDAD:*
• Windows 10 / 11 Pro: S/ 35.00 (Promo: S/ 25.00)
• Office 365 (1 Año): S/ 40.00 (Promo: S/ 30.00)
• Canva Pro (1 Año): S/ 20.00 (Promo: S/ 15.00)
• Gemini Pro (18M): S/ 45.00 (Promo: S/ 35.00)

💡 *Garantía asegurada:* Cuentas estables y soporte continuo en *KazuStore*. ¿Cuál te gustaría activar hoy?`,

  "🛡️ Manejo de Desconfianza / Seguridad": `Entiendo totalmente tu consulta, ¡es súper normal tener precaución al comprar digitalmente! 🙌

Te explico con total transparencia cómo trabajamos en *KazuStore*:
1. 💡 *¿Por qué el precio es tan accesible?* Administramos membresías multicuenta y planes familiares/mayoristas autorizados, asignándote un perfil privado y seguro sin sobrecostos.
2. ⚡ *Acompañamiento en vivo:* Te entrego las credenciales e instrucciones de inmediato y te acompaño paso a paso en tu pantalla hasta que compruebes que todo funciona perfecto.
3. 🛡️ *Garantía directa:* Si se presenta cualquier inconveniente técnico durante tu mes, te damos soporte prioritario o reposición sin vueltas.

¿Te gustaría probar con la promo de primer mes por Yape o Plin para que compruebes la calidad?`,

  "💬 Recuperación de Cliente (En Visto)": `¡Hola! Paso a saludarte brevemente por si te quedó alguna duda con la plataforma o los precios de *KazuStore*. 😊

Si prefieres ver otra opción de streaming, música o software de trabajo, avísame con total confianza y te busco la mejor alternativa para tu dispositivo. 

¿Pudiste revisar la información o te gustaría consultarme algo más?`,

  "✨ Postventa y Satisfacción (24 Horas)": `¡Hola! Te saludo del equipo de *KazuStore*. Paso a confirmar que todo esté fluyendo perfecto con tu servicio y que estés disfrutando de tu contenido al 100%. 🍿✨

Recuerda que ante cualquier duda técnica, estamos atentos por este mismo chat para ayudarte de inmediato.

⭐ *Dato extra:* Por tu compra ya sumaste tu primer sello en tu tarjeta digital *KazuCard*. ¡Muchas gracias por tu preferencia y que tengas un excelente día! 🙌`,

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
• *Disney+ Estándar:* solo *S/ 7.00* (Antes: S/ 10.00)
• *Spotify Premium:* solo *S/ 9.00* (Antes: S/ 12.00)
• *Netflix Premium 4K:* solo *S/ 13.00* (Antes: S/ 15.00)

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

❌ Precio individual: ~S/ 25.00~
💥 *PRECIO COMBO: S/ 20.00* (¡Ahorras S/ 5.00!)

• Perfiles privados con PIN y garantía por 30 días
• Entrega inmediata

📲 ¿Prefieres pagar por Yape o Plin para activarte de inmediato?`,

  "combo_pro": `💻 *PACK PRODUCTIVIDAD Y DISEÑO (1 AÑO COMPLETO)* 🚀

Las herramientas indispensables para tu trabajo o estudio:
✅ *Microsoft 365 (1 Año)*
   • Word, Excel, PPT oficiales + 1TB en OneDrive
✅ *Canva Pro (1 Año)*
   • Quitafondos en 1 clic, fotos y plantillas Pro en tu correo

❌ Precio individual: ~S/ 60.00~
💥 *PRECIO PACK ANUAL: S/ 45.00* (¡Ahorras S/ 15.00!)

• Activación permanente y soporte asegurado
📲 ¿Te paso los datos para Yape o Plin?`
};
