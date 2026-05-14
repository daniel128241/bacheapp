/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { reports } from '../modules/reports/reports-data.js';
import { ROLES, roleState } from '../modules/reports/roles-data.js';
import { showToast } from './toast.js';
import { openDetail } from './detail-modal.js';

/* ═══════════════════════════════════════════
   COMENTAR
══════════════════════════════════════════ */
export function addComment(id) {
    if (!ROLES[roleState.currentRole].canComment) {
        showToast('⚠ Necesitas ser usuario para comentar', 'warning');
        return;
    }
    const inp  = document.getElementById('newCommentInput');
    const text = inp.value.trim(); if (!text) return;

    const colors = ['#3A86FF', '#E63946', '#2EC4B6', '#1E3A5F'];
    const name   = roleState.currentRole === 'admin' ? 'Admin JP' : 'Juan D.';

    reports.find(x => x.id === id).comments.push({
        author: name,
        color:  colors[Math.floor(Math.random() * colors.length)],
        text,
        date: 'Ahora'
    });

    inp.value = '';
    showToast('💬 Comentario enviado', 'success');
    openDetail(id);
}