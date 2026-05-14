/* ═══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
export function showToast(msg, type = '') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(50px)'; t.style.transition = 'all .3s'; }, 2800);
    setTimeout(() => t.remove(), 3200);
}