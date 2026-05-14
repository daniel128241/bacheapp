/* ═══════════════════════════════════════════
   MAPA LEAFLET
══════════════════════════════════════════ */
export const leafletMap = L.map('map', { zoomControl: false, attributionControl: true }).setView([31.6904, -106.4245], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  maxZoom: 19
}).addTo(leafletMap);

function createIcon(level) {
  const labels = { danger: '!', medium: '~', repaired: '✓' };
  return L.divIcon({
    className: 'lf-icon',
    html: `<div class="lf-wrap"><div class="lf-pulse lf-pulse-${level}"></div><div class="lf-pin lf-pin-${level}"><span>${labels[level]}</span></div></div>`,
    iconSize: [30, 38], iconAnchor: [15, 38], tooltipAnchor: [0, -38]
  });
}

let leafletMarkers = [];
let pendingLatLng = null;
let pendingMarker = null;
let pickingMode = false;

/* ── Estilos: marcador pendiente + banner de selección ── */
const _pendingStyle = document.createElement('style');
_pendingStyle.textContent = `
  .lf-pending-pin {
    width:26px; height:26px; background:#3A86FF;
    border:3px solid #fff; border-radius:50%;
    box-shadow:0 0 0 4px rgba(58,134,255,.35);
    animation:pulse-pending 1.2s infinite;
  }
  @keyframes pulse-pending {
    0%,100%{ box-shadow:0 0 0 4px rgba(58,134,255,.35); }
    50%    { box-shadow:0 0 0 12px rgba(58,134,255,.07); }
  }
  #mapPickBanner {
    position:absolute; bottom:80px; left:50%; transform:translateX(-50%);
    background:#3A86FF; color:#fff; padding:10px 22px; border-radius:50px;
    font-size:.84rem; font-weight:600; z-index:1000; pointer-events:none;
    box-shadow:0 4px 18px rgba(58,134,255,.45); white-space:nowrap;
    animation:fadeInUpBanner .25s ease;
  }
  @keyframes fadeInUpBanner {
    from{ opacity:0; transform:translateX(-50%) translateY(10px); }
    to  { opacity:1; transform:translateX(-50%) translateY(0); }
  }
  .map-panel{ position:relative; }
`;
document.head.appendChild(_pendingStyle);