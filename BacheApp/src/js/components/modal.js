/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { cancelPendingMarker } from '../map/map-controller.js';

/* ═══════════════════════════════════════════
   MODALES
══════════════════════════════════════════ */
export function openModal(id)  { 
    document.getElementById(id).classList.add('open');    
    document.body.style.overflow = 'hidden'; 
}

export function closeModal(id) { 
    document.getElementById(id).classList.remove('open'); 
    document.body.style.overflow = ''; 
}

/* Cerrar al hacer clic fuera o presionar Escape */
document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => {
        if (e.target === o) { 
            closeModal(o.id); 
            if (o.id === 'reportModal') cancelPendingMarker(); 
        }
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => {
            closeModal(m.id); 
            if (m.id === 'reportModal') cancelPendingMarker();
        });
    }
});

/* ═══════════════════════════════════════════
   EXPONER AL WINDOW (para onclicks del HTML)
══════════════════════════════════════════ */
window.openModal  = openModal;
window.closeModal = closeModal;