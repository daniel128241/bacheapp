/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { leafletMap } from './leaflet-map.js';
import { filterState } from '../modules/reports/reports-data.js';

export let leafletMarkers = [];

export function createIcon(level) {
    const labels = { danger: '!', medium: '~', repaired: '✓' };
    return L.divIcon({
        className: 'lf-icon',
        html: `<div class="lf-wrap"><div class="lf-pulse lf-pulse-${level}"></div><div class="lf-pin lf-pin-${level}"><span>${labels[level]}</span></div></div>`,
        iconSize: [30, 38], iconAnchor: [15, 38], tooltipAnchor: [0, -38]
    });
}
/* ═══════════════════════════════════════════
   RENDER MARCADORES
══════════════════════════════════════════ */
export function renderMapMarkers(filteredReports = []) {
    leafletMarkers.forEach(m => leafletMap.removeLayer(m));
    leafletMarkers = [];
    document.getElementById('totalCount').textContent = filteredReports.length;
    document.getElementById('dangerCount').textContent = filteredReports.filter(r => r.level === 'danger').length;
    document.getElementById('repairedCount').textContent = filteredReports.filter(r => r.level === 'repaired').length;
    filteredReports.forEach(r => {
        const marker = L.marker([r.lat, r.lng], { icon: createIcon(r.level) })
            .addTo(leafletMap)
            .bindTooltip(r.title.length > 28 ? r.title.slice(0, 28) + '…' : r.title, { direction: 'top', offset: [0, -4] })
            .on('click', () => openDetail(r.id));
        leafletMarkers.push(marker);
    });
}
