/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { leafletMap } from './leaflet-map.js';
import { ROLES, roleState } from '../modules/reports/roles-data.js';
import { showToast } from '../components/toast.js';

/* ── Variables de estado ── */
export let pendingLatLng = null;
export let pendingMarker = null;
export let pickingMode   = false;

/* ── Estilos del marcador pendiente y banner ── */
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

/* ── Cancelar marcador pendiente ── */
export function cancelPendingMarker() {
    if (pendingMarker) { leafletMap.removeLayer(pendingMarker); pendingMarker = null; }
    pendingLatLng = null;
    pickingMode   = false;
    leafletMap.getContainer().style.cursor = '';
    const banner = document.getElementById('mapPickBanner');
    if (banner) banner.remove();
    document.getElementById('coordsHint').style.display = 'none';
}

/* ── Activar modo selección ── */
export function handleReportClick() {
    if (!ROLES[roleState.currentRole].canReport) {
        showToast('⚠ Solo usuarios registrados pueden reportar', 'warning');
        return;
    }
    pickingMode = true;
    leafletMap.getContainer().style.cursor = 'crosshair';
    if (!document.getElementById('mapPickBanner')) {
        const b = document.createElement('div');
        b.id          = 'mapPickBanner';
        b.textContent = '📍 Toca el punto exacto del bache en el mapa';
        document.querySelector('.map-panel').appendChild(b);
    }
    showToast('📍 Selecciona la ubicación del bache en el mapa', 'success');
}

/* ═══════════════════════════════════════════
   EXPONER AL WINDOW
══════════════════════════════════════════ */
window.handleReportClick = handleReportClick;