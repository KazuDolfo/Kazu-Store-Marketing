export const CATALOG_SERVICES = [
  // STREAMING & TV
  { id: "netflix", name: "Netflix UHD 4K", category: "Streaming & TV", icon: "🎬", iconImg: "assets/icons/netflix.svg", cost: 10.00, regularPrice: 15.00, price: 15.00, promoPrice: 13.50, mode: "pin", duration: 30, tag: "Top Ventas", instruction: "Perfil Privado con PIN exclusivo (1 dispositivo)" },
  { id: "disney_std", name: "Disney+ Estándar", category: "Streaming & TV", icon: "✨", iconImg: "assets/icons/disneyplus.svg", cost: 3.50, regularPrice: 6.90, price: 6.90, promoPrice: 5.90, mode: "pin", duration: 30, tag: "Popular", instruction: "1 Perfil privado en Full HD" },
  { id: "disney_prem", name: "Disney+ Premium (ESPN)", category: "Streaming & TV", icon: "🏆", iconImg: "assets/icons/disney.svg", cost: 5.50, regularPrice: 9.90, price: 9.90, promoPrice: 8.50, mode: "pin", duration: 30, tag: "Deportes", instruction: "Perfil Privado con PIN + ESPN en vivo 4K" },
  { id: "max_std", name: "Max Estándar (HBO)", category: "Streaming & TV", icon: "🍿", iconImg: "assets/icons/max.svg", cost: 3.50, regularPrice: 6.90, price: 6.90, promoPrice: 5.90, mode: "pin", duration: 30, tag: "Cine", instruction: "Perfil Privado en resolución Full HD" },
  { id: "prime_video", name: "Amazon Prime Video (Cuenta Completa)", category: "Streaming & TV", icon: "📦", iconImg: "assets/icons/prime.svg", cost: 14.00, regularPrice: 23.90, price: 23.90, promoPrice: 20.90, mode: "pin", duration: 30, tag: "Familiar", instruction: "Cuenta Privada Completa (3 perfiles simultáneos)" },
  { id: "crunchyroll", name: "Crunchyroll Fan", category: "Streaming & TV", icon: "⚡", iconImg: "assets/icons/crunchyroll.svg", cost: 3.00, regularPrice: 6.90, price: 6.90, promoPrice: 5.90, mode: "pin", duration: 30, tag: "Anime", instruction: "Perfil sin publicidad" },
  { id: "paramount", name: "Paramount+ / Oleada TV", category: "Streaming & TV", icon: "⭐", iconImg: "assets/icons/paramount.svg", cost: 3.00, regularPrice: 7.90, price: 7.90, promoPrice: 6.90, mode: "pin", duration: 30, tag: "Series & Fútbol", instruction: "1 Pantalla privada asignada" },
  { id: "iptv_vip", name: "IPTV Canales en Vivo + VOD", category: "Streaming & TV", icon: "📡", iconImg: "assets/icons/iptv.svg", cost: 8.00, regularPrice: 15.90, price: 15.90, promoPrice: 13.90, mode: "pin", duration: 30, tag: "+1500 Canales", instruction: "Usuario y Contraseña APK" },
  { id: "xuper_tv", name: "Xuper TV (Permanente)", category: "Streaming & TV", icon: "📺", iconImg: "assets/icons/xuper.png", cost: 15.00, regularPrice: 29.90, price: 29.90, promoPrice: 26.90, mode: "pin", duration: 9999, tag: "De por vida", instruction: "Activación permanente con garantía" },

  // MÚSICA & AUDIO
  { id: "spotify_ind", name: "Spotify Premium Individual", category: "Música & Audio", icon: "🟢", iconImg: "assets/icons/spotify.svg", cost: 4.50, regularPrice: 8.90, price: 8.90, promoPrice: 7.50, mode: "invite", duration: 30, tag: "Sin Anuncios", instruction: "Activado directamente en tu cuenta" },
  { id: "youtube_prem", name: "YouTube Premium + Music", category: "Música & Audio", icon: "▶️", iconImg: "assets/icons/youtube.svg", cost: 4.50, regularPrice: 9.90, price: 9.90, promoPrice: 8.50, mode: "invite", duration: 30, tag: "Video & Music", instruction: "Invitación familiar a tu correo Gmail" },
  { id: "tidal_prem", name: "Tidal HiFi / Deezer", category: "Música & Audio", icon: "🎧", iconImg: "assets/icons/tidal.svg", cost: 4.00, regularPrice: 8.90, price: 8.90, promoPrice: 7.50, mode: "invite", duration: 30, tag: "HiFi Lossless", instruction: "Activación privada" },

  // IA, PRODUCTIVIDAD & DISEÑO
  { id: "chatgpt_go", name: "ChatGPT Go (1 Mes)", category: "IA & Software", icon: "🤖", iconImg: "assets/icons/chatgpt.svg", cost: 5.50, regularPrice: 10.90, price: 10.90, promoPrice: 9.50, mode: "full", duration: 30, tag: "IA Líder", instruction: "Cuenta privada con acceso GPT" },
  { id: "gemini_pro", name: "Gemini Pro (18 Meses)", category: "IA & Software", icon: "✨", iconImg: "assets/icons/gemini.svg", cost: 12.00, regularPrice: 25.90, price: 25.90, promoPrice: 21.90, mode: "full", duration: 540, tag: "18 Meses", instruction: "Cuenta o acceso habilitado" },
  { id: "canva_pro_1y", name: "Canva Pro (1 Año)", category: "Diseño & Herramientas", icon: "🎨", iconImg: "assets/icons/canva.svg", cost: 4.50, regularPrice: 9.90, price: 9.90, promoPrice: 8.50, mode: "invite", duration: 365, tag: "1 Año Completo", instruction: "Invitación de equipo a tu correo personal" },
  { id: "capcut_pro", name: "CapCut Pro (1 Mes)", category: "Diseño & Herramientas", icon: "✂️", iconImg: "assets/icons/capcut.svg", cost: 7.00, regularPrice: 16.90, price: 16.90, promoPrice: 14.50, mode: "full", duration: 30, tag: "Videos Reels", instruction: "Acceso a funciones Pro PC/Móvil" },
  { id: "ilovepdf", name: "iLovePDF Premium (1 Año)", category: "Diseño & Herramientas", icon: "📑", iconImg: "assets/icons/ilovepdf.svg", cost: 6.00, regularPrice: 13.90, price: 13.90, promoPrice: 11.90, mode: "full", duration: 365, tag: "1 Año", instruction: "Cuenta privada" },

  // SISTEMAS & LICENCIAS
  { id: "win11_pro", name: "Windows 10 / 11 Pro OEM Key", category: "Sistemas & Licencias", icon: "🪟", iconImg: "assets/icons/windows.svg", cost: 8.00, regularPrice: 20.90, price: 20.90, promoPrice: 17.90, mode: "license", duration: 9999, tag: "Permanente", instruction: "Clave de 25 caracteres para activación limpia" },
  { id: "m365_1y", name: "Microsoft 365 + 1TB OneDrive", category: "Sistemas & Licencias", icon: "☁️", iconImg: "assets/icons/m365.svg", cost: 10.00, regularPrice: 22.90, price: 22.90, promoPrice: 19.90, mode: "full", duration: 365, tag: "1 Año", instruction: "Cuenta institucional privada + 1TB" },
  { id: "autocad_1y", name: "Autodesk AutoCAD (1 Año)", category: "Sistemas & Licencias", icon: "📐", iconImg: "assets/icons/autocad.svg", cost: 8.00, regularPrice: 18.90, price: 18.90, promoPrice: 15.90, mode: "license", duration: 365, tag: "1 Año", instruction: "Licencia vinculada a tu correo" }
];

export const CATALOG_PRODUCTS = [
  { id: "smartwatch_ultra", name: "Smartwatch Ultra 2 Edition (Serie 9)", category: "Tecnología Física", icon: "⌚", iconImg: "assets/icons/smartwatch.svg", cost: 45.00, regularPrice: 90.00, price: 90.00, promoPrice: 69.00, stock: 12, tag: "Envío Gratis Lima", instruction: "Caja sellada + cargador inalámbrico + 2 correas" },
  { id: "airpods_pro2", name: "AirPods Pro 2da Gen (High-End ANC)", category: "Tecnología Física", icon: "🎧", iconImg: "assets/icons/airpods.svg", cost: 50.00, regularPrice: 109.00, price: 109.00, promoPrice: 79.00, stock: 8, tag: "Cancelación Activa", instruction: "Audio espacial + estuche MagSafe USB-C" },
  { id: "combo_watch_pods", name: "Pack Dúo: Smartwatch Ultra 2 + AirPods Pro 2", category: "Tecnología Física", icon: "⚡", iconImg: "assets/icons/kazustore-iso.svg", cost: 95.00, regularPrice: 199.00, price: 199.00, promoPrice: 135.00, stock: 5, tag: "Pack Ahorro Máximo", instruction: "Reloj Ultra 2 + Audífonos ANC en pack promocional" }
];

export const CATEGORIES_LIST = [
  "Todos",
  "Streaming & TV",
  "Música & Audio",
  "IA & Software",
  "Diseño & Herramientas",
  "Sistemas & Licencias",
  "Tecnología Física"
];
