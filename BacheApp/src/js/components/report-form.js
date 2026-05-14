/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { reports } from '../modules/reports/reports-data.js';
import { showToast } from './toast.js';
import { closeModal } from './modal.js';
import { applyFiltersAndSort } from './feed.js';
import { pendingLatLng, pendingMarker, cancelPendingMarker } from '../map/map-controller.js';
import { leafletMap } from '../map/leaflet-map.js';
import { pendingImageDataURL, _resetUploadZone } from './upload.js';
import { handleReportClick } from '../map/map-controller.js';

/* ═══════════════════════════════════════════
   FORMULARIO REPORTE
══════════════════════════════════════════ */
let selectedDangerLevel = 'medium';

export function selectDanger(el, level) {
    document.querySelectorAll('.danger-option').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    selectedDangerLevel = level === 'high' ? 'danger' : level === 'low' ? 'repaired' : 'medium';
}

export function submitReport() {
    const street  = document.getElementById('formStreet').value.trim();
    const colonia = document.getElementById('formColonia').value.trim();
    const desc    = document.getElementById('formDesc').value.trim();

    if (!street || !desc) { 
        showToast('⚠ Completa los campos obligatorios', 'warning'); 
        return; 
    }

    if (!pendingLatLng) {
        showToast('⚠ Primero selecciona la ubicación en el mapa', 'warning');
        closeModal('reportModal');
        handleReportClick();
        return;
    }

    const lat = pendingLatLng.lat;
    const lng = pendingLatLng.lng;
    const fallbackImgs = [
        'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
    ];

    reports.unshift({
        id: Date.now(), lat, lng,
        title:       `Bache en ${street}`,
        location:    `${street}${colonia ? ', ' + colonia : ''}`,
        description: desc,
        level:       selectedDangerLevel,
        image:       pendingImageDataURL || fallbackImgs[Math.floor(Math.random() * fallbackImgs.length)],
        comments: [], date: 'Hace un momento', views: 1, priority: false, shares: 0
    });

    cancelPendingMarker();
    document.getElementById('coordsHint').style.display = 'none';
    document.getElementById('formStreet').value  = '';
    document.getElementById('formColonia').value = '';
    document.getElementById('formDesc').value    = '';
    _resetUploadZone();

    applyFiltersAndSort();
    closeModal('reportModal');
    showToast('📍 ¡Reporte enviado! Gracias.', 'success');
    setTimeout(() => leafletMap.flyTo([lat, lng], 16, { duration: 1.2 }), 400);
}

/* ═══════════════════════════════════════════
   EXPONER AL WINDOW
══════════════════════════════════════════ */
window.selectDanger  = selectDanger;
window.submitReport  = submitReport;