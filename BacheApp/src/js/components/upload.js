/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { showToast } from './toast.js';

/* ═══════════════════════════════════════════
   FOTO — abre galería del dispositivo
══════════════════════════════════════════ */
export let pendingImageDataURL = null;

export function handlePhotoSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
        showToast('⚠ La imagen no debe superar 10 MB', 'warning');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        pendingImageDataURL = e.target.result;
        const zone = document.getElementById('uploadZone');
        zone.innerHTML = `
            <img src="${pendingImageDataURL}"
                 style="width:100%;height:130px;object-fit:cover;border-radius:8px;display:block"/>
            <p style="color:var(--success);font-weight:600;margin-top:8px;font-size:.82rem">✓ ${file.name}</p>`;
        zone.style.borderColor = 'var(--success)';
        zone.style.background  = 'rgba(46,196,182,.04)';
        zone.style.padding     = '8px';
    };
    reader.readAsDataURL(file);
}

export function _resetUploadZone() {
    pendingImageDataURL = null;
    const input = document.getElementById('photoInput');
    if (input) input.value = '';
    const zone = document.getElementById('uploadZone');
    if (!zone) return;
    zone.innerHTML = `
        <svg width="33" height="33" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <p>Haz clic para <span>subir foto</span> del bache</p>
        <p style="font-size:.72rem;margin-top:3px">PNG, JPG hasta 10 MB</p>`;
    zone.style.borderColor = '';
    zone.style.background  = '';
    zone.style.padding     = '';
}

/* ═══════════════════════════════════════════
   EXPONER AL WINDOW
══════════════════════════════════════════ */
window.handlePhotoSelected = handlePhotoSelected;