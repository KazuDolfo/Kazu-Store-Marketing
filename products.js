const PHYSICAL_PRODUCTS = [
  {
    id: "smartwatch_t900",
    name: "Smartwatch T900 Pro Max L (Serie 11)",
    cost: 49.00,
    price: 65.00,
    icon: "⌚",
    desc: "Pantalla gigante 2.3'' Infinite Display, llamadas Bluetooth, salud y fitness",
    templates: {
      "🔥 Ficha de Venta (S/ 65.00)": `🔥 *SMARTWATCH T900 PRO MAX L (SERIE 11)* 🔥

🚀 ¡Lleva la mejor tecnología a tu muñeca con un diseño moderno, elegante y funcional! Pantalla gigante de *2.3" Infinite Display* con bordes ultradelgados.

❌ Precio regular: ~S/ 79.00~
💥 *PRECIO OFERTA: S/ 65.00*

🚀 *Funciones Principales:*
📞 *Llamadas y Conectividad:* Realiza y responde llamadas por Bluetooth, recibe notificaciones de WhatsApp, Facebook e Instagram.
❤️ *Monitoreo de Salud:* Ritmo cardíaco, presión arterial, oxígeno en sangre y monitoreo de sueño.
🏃 *Fitness y Deporte:* Podómetro, contador de calorías, distancia y modos multideporte.
🎵 *Herramientas:* Control de música Bluetooth, disparador remoto de cámara, clima, alarma, calculadora y juegos.
✋ Encendido automático de pantalla al levantar la mano.
📱 Compatible con Android e iOS (App Doufit Wear).

📦 *¿Qué incluye la caja?*
1️⃣ Smartwatch T900 Pro Max L (Cuerpo Negro)
2️⃣ Correa de silicona (Azul)
3️⃣ Cargador magnético inalámbrico USB
4️⃣ Manual de usuario

🛵 *¡SE REALIZA CONTRAENTREGA!* (Pagas al recibir)
📲 Escríbenos para agendar tu pedido hoy mismo.`,

      "⚡ Promo Cierre Rápido (S/ 59.90)": `⌚ *SMARTWATCH T900 PRO MAX L (SERIE 11)*

❌ Precio normal: ~S/ 79.00~
🔥 *PRECIO PROMOCIONAL HOY: S/ 59.90*

• Pantalla gigante 2.3" Infinite Display
• Llamadas Bluetooth y notificaciones de WhatsApp
• Medición de ritmo cardíaco, presión y oxígeno
• Modos deporte, podómetro y control de música
• Incluye: Reloj + Correa Azul + Cargador Magnético

🛵 *Modalidad Contraentrega disponible.*
📲 Escríbeme tu distrito para coordinar tu entrega.`
    }
  },
  {
    id: "airpods_pro_2",
    name: "AirPods Pro 2 (Sonido Premium)",
    cost: 35.00,
    price: 75.00,
    icon: "🎧",
    desc: "Cancelación Activa de Ruido (ANC), Modo Transparencia, USB-C y hasta 30h de batería",
    templates: {
      "🔥 Ficha de Venta (S/ 75.00)": `🎧 *AIRPODS PRO 2 - SONIDO PREMIUM SIN DISTRACCIONES* 🎧

Sumérgete en tu música con la máxima calidad y aislamiento total.

❌ Precio regular: ~S/ 90.00~
💥 *PRECIO: S/ 75.00* (Pago al recibir)
🛵 *Entrega GRATIS en Chorrillos* | Contraentrega disponible en Lima

🌟 *Por qué te encantarán:*
🔊 *Sonido de Alta Calidad:* Graves profundos y claridad máxima.
🛡️ *Cancelación Activa de Ruido (ANC):* Aísla el ruido exterior por completo.
👂 *Modo Transparencia:* Escucha tu entorno sin quitarte los auriculares.
⚡ *Conexión Rápida Bluetooth:* Emparejamiento instantáneo y conexión estable.
🎙️ *Micrófono HD:* Llamadas nítidas y sin interferencias.
🔋 *Batería de Larga Duración:* Hasta 30 horas de uso total con el estuche de carga.
📱 *100% Compatibles:* Funcionan perfecto en iPhone y Android.

📦 *Producto Nuevo en Caja Sellada:*
✅ Auriculares AirPods Pro 2
✅ Estuche de Carga USB-C
✅ Cable de Carga
✅ Almohadillas en varias tallas (S, M, L)

📲 *¡Resérvalo YA antes de agotar stock! Escríbeme tu ubicación.*`,

      "⚡ Promo Cierre Rápido (S/ 75.00)": `🎧 *AIRPODS PRO 2 (OFERTA ESPECIAL HOY)*

❌ Precio regular: ~S/ 90.00~
🔥 *PRECIO OFERTA: S/ 75.00* (¡Ahorras S/ 15.00!)
🛵 *Entrega GRATIS en Chorrillos* (Contraentrega en Lima)

• Cancelación Activa de Ruido (ANC) y Modo Transparencia
• Sonido envolvente con micrófono HD para llamadas
• Batería de hasta 30h con estuche USB-C
• Compatible con Android y iPhone

📲 Escríbeme para apartar el tuyo a precio promocional.`
    }
  },
  {
    id: "spotify_tech_bonus",
    name: "Spotify Premium (30 Días de Regalo/Pack)",
    cost: 5.00,
    price: 9.00,
    icon: "🎵",
    desc: "Música sin anuncios para estrenar tus AirPods o Smartwatch"
  },
  {
    id: "correa_extra",
    name: "Correa Extra de Silicona",
    cost: 5.00,
    price: 15.00,
    icon: "🎗️",
    desc: "Correa adicional intercambiable para Smartwatch"
  }
];

const SHIPPING_TEMPLATES = {
  "contraentrega": `🛵 *COORDINACIÓN DE CONTRAENTREGA - KAZUSTORE*
(Pagas al recibir tu producto en mano)

¡Excelente elección! Tu pedido se despacha con total seguridad por *KazuStore*:

📍 *Puntos de Entrega:*
• *Chorrillos:* Entrega *GRATIS* en puntos céntricos / estaciones.
• *Otros Distritos de Lima:* Envíos a domicilio o estación de Metropolitano / Tren con motorizado contraentrega.

💵 *Forma de Pago:* Pagas al recibir tu producto en mano (Efectivo, Yape o Plin).

📲 Por favor compárteme tu dirección exacta o referencia y distrito para cotizar tu envío y agendar el horario de entrega hoy mismo.`,

  "envio_nacional": `📦 *ENVÍOS A TODO EL PERÚ - KAZUSTORE*
(Despacho 100% Seguro y Garantizado)

En *KazuStore* hacemos envíos diarios a provincias mediante agencias líderes:

🚚 *Agencias disponibles:*
• *Shalom* (Pago de flete en destino)
• *Olva Courier* (Directo a tu domicilio o agencia)

🔒 *Proceso de Envío:*
1. Empaque seguro y protegido con burbujas.
2. Te enviamos foto de tu paquete y tu guía de remisión / tracking en tiempo real.

📲 Compártenos tu Departamento, Provincia y Agencia de preferencia para preparar tu despacho.`,

  "confirmacion_datos": `📝 *FORMULARIO DE PEDIDO - KAZUSTORE*

Por favor completa los siguientes datos para agendar tu despacho de inmediato:

👤 *Nombre y Apellidos:*
📱 *Teléfono de contacto:*
📦 *Producto(s) y cantidad:*
📍 *Dirección exacta y referencia:*
🏙️ *Distrito / Ciudad:*
🗓️ *Día y horario preferido de entrega:*

¡Muchas gracias! En breve te confirmamos la hora exacta de llegada. 🚀`
};
