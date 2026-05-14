/* ═══════════════════════════════════════════
   DATOS — con lat/lng reales de Ciudad Juárez
══════════════════════════════════════════ */

export let reports = [
    { id: 1, lat: 31.6946, lng: -106.4290, title: "Bache profundo sobre Av. Juárez", location: "Av. Juárez 345, Centro", description: "Bache de aproximadamente 40 cm de diámetro y 15 cm de profundidad. Ubicado en el carril central. Ha causado daños a vehículos y representa riesgo alto para motociclistas.", level: "danger", image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80", comments: [{ author: "María G.", color: "#3A86FF", text: "El bache sigue igual, hace 2 semanas lo reporté y nada.", date: "Hace 2 días" }, { author: "Carlos M.", color: "#E63946", text: "Mi llanta se ponchó aquí. Es urgente.", date: "Ayer" }], date: "Hace 3 días", views: 142, priority: true, shares: 8 },
    { id: 2, lat: 31.6921, lng: -106.4269, title: "Grieta extensa en C. Morelos", location: "Calle Morelos 78, Col. Reforma", description: "Grieta de 2 metros de largo que cruza el carril derecho. Empeora con la lluvia y ya generó varios accidentes menores.", level: "medium", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", comments: [{ author: "Sofía R.", color: "#2EC4B6", text: "Ya mandé fotos al municipio, esperemos respuesta.", date: "Hace 1 día" }], date: "Hace 5 días", views: 89, priority: false, shares: 4 },
    { id: 3, lat: 31.6878, lng: -106.4201, title: "Bacheo fallido en Insurgentes", location: "Av. Insurgentes 512, Col. Norte", description: "El parche anterior se levantó y quedó peor que antes. Material de baja calidad, ya generó nuevos hoyos.", level: "danger", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", comments: [], date: "Hace 1 día", views: 67, priority: false, shares: 2 },
    { id: 4, lat: 31.6936, lng: -106.4252, title: "Hoyo en cruce peatonal", location: "Hidalgo y 5 de Mayo, Centro", description: "Bache en zona de cruce peatonal. Riesgo alto para adultos mayores. El agua se acumula y no hay señalización.", level: "medium", image: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=600&q=80", comments: [{ author: "Roberto K.", color: "#1E3A5F", text: "Confirmado, lo vi ayer todavía igual.", date: "Hace 4 horas" }], date: "Hace 6 días", views: 204, priority: true, shares: 15 },
    { id: 5, lat: 31.6869, lng: -106.4315, title: "Bache reparado — Blvd. Díaz Ordaz", location: "Blvd. Díaz Ordaz 890", description: "El bache fue reparado correctamente por la cuadrilla municipal. Bacheo en frío con material bituminoso. Resultado satisfactorio.", level: "repaired", image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=600&q=80", comments: [{ author: "Ana L.", color: "#2EC4B6", text: "¡Excelente! Tardaron pero lo hicieron bien 👏", date: "Hace 2 horas" }], date: "Hace 8 días", views: 310, priority: false, shares: 22 },
    { id: 6, lat: 31.6902, lng: -106.4221, title: "Depresión vial peligrosa", location: "Calle Libertad 120, Col. Sur", description: "Depresión de más de 60 cm de diámetro. El asfalto se hundió por fuga de agua subterránea. Con conos pero sin reparar.", level: "danger", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80", comments: [], date: "Hoy", views: 28, priority: false, shares: 1 }
];

export const levelLabel = {
    danger: '🔴 Alto',
    medium: '🟡 Medio',
    repaired: '🟢 Reparado'
};

// Estado compartido de filtros
export const filterState = {
    currentFilter: 'all',
    currentSort: 'recent',
    filteredReports: []
};