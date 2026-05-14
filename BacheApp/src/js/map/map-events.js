/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { leafletMap } from './leaflet-map.js';
import { ROLES, roleState } from '../modules/reports/roles-data.js';
import { showToast } from '../components/toast.js';
import { openModal } from '../components/modal.js';
import { pendingLatLng, pendingMarker, pickingMode, cancelPendingMarker } from './map-controller.js';

/* ── Clic en el mapa — solo actúa en pickingMode ── */
leafletMap.on('click', function (e) {
    if (!pickingMode) return;
    if (!ROLES[roleState.currentRole].canReport) {
        showToast('⚠ Solo usuarios registrados pueden reportar', 'warning'); return;
    }

    pendingLatLng = e.latlng;
    pickingMode   = false;
    leafletMap.getContainer().style.cursor = '';
    const banner = document.getElementById('mapPickBanner');
    if (banner) banner.remove();

    if (pendingMarker) leafletMap.removeLayer(pendingMarker);
    pendingMarker = L.marker(e.latlng, {
        icon: L.divIcon({
            className: 'lf-icon',
            html: '<div class="lf-pending-pin"></div>',
            iconSize: [26, 26], iconAnchor: [13, 13]
        })
    }).addTo(leafletMap);

    const coordText = `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
    document.getElementById('coordsHintText').textContent = `Ubicación seleccionada: ${coordText}`;
    document.getElementById('coordsHint').style.display = 'flex';

    openModal('reportModal');
});

/* ── Localizar usuario ── */
export function locateUser() {
    leafletMap.locate({ setView: true, maxZoom: 16 });
    showToast('📡 Buscando tu ubicación…', '');
}
leafletMap.on('locationfound', () => showToast('📍 Ubicación encontrada', 'success'));
leafletMap.on('locationerror', () => showToast('⚠ No se pudo obtener la ubicación', 'warning'));

/* ═══════════════════════════════════════════
   EXPONER AL WINDOW
══════════════════════════════════════════ */
window.locateUser = locateUser;