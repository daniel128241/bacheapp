/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { reports } from '../modules/reports/reports-data.js';
import { showToast } from './toast.js';
import { openDetail } from './detail-modal.js';
import { closeModal } from './modal.js';
import { applyFiltersAndSort } from './feed.js';

/* ═══════════════════════════════════════════
   ACCIONES ADMIN
══════════════════════════════════════════ */
export function markPriority(id) {
    const r = reports.find(x => x.id === id);
    r.priority = !r.priority;
    showToast(r.priority ? '⚡ Marcado como prioritario' : 'Prioridad removida', r.priority ? 'warning' : '');
    openDetail(id);
    applyFiltersAndSort();
}

export function markRepaired(id) {
    reports.find(x => x.id === id).level = 'repaired';
    showToast('✔ Bache marcado como reparado', 'success');
    closeModal('detailModal');
    applyFiltersAndSort();
}

export function deleteReport(id) {
    const i = reports.findIndex(x => x.id === id);
    if (i > -1) reports.splice(i, 1);
    showToast('🗑 Reporte eliminado');
    closeModal('detailModal');
    applyFiltersAndSort();
}