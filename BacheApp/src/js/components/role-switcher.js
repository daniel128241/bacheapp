// role-switcher.js
import { applyFiltersAndSort } from './feed.js';
import { leafletMap } from '../map/leaflet-map.js';
import { showToast } from './toast.js';
import { closeModal } from './modal.js';

// ← AQUÍ la declaración que faltaba
let currentRole = null;

const ROLES = {
    visitor: { key: 'visitor', label: 'Visitante', icon: '👁️', desc: '...', badgeClass: '...', avatarBg: '...', initials: 'V', canReport: false },
    user: { key: 'user', label: 'Usuario', icon: '👤', desc: '...', badgeClass: '...', avatarBg: '...', initials: 'U', canReport: true },
    admin: { key: 'admin', label: 'Admin', icon: '🛡️', desc: '...', badgeClass: '...', avatarBg: '...', initials: 'A', canReport: true },
};
/* ═══════════════════════════════════════════
   BIENVENIDA
══════════════════════════════════════════ */
function selectRole(role) {
    currentRole = role;
    const ws = document.getElementById('welcomeScreen');
    ws.style.transition = 'opacity .3s';
    ws.style.opacity = '0';
    setTimeout(() => {
        ws.style.display = 'none';
        updateRoleUI();
        applyFiltersAndSort();
        const hint = document.getElementById('mapClickHint');
        if (ROLES[role].canReport) hint.classList.add('visible');
        setTimeout(() => hint.classList.remove('visible'), 4000);
        showToast(`${ROLES[role].icon} Bienvenido como ${ROLES[role].label}`, role === 'admin' ? 'warning' : role === 'user' ? 'success' : '');
        setTimeout(() => leafletMap.invalidateSize(), 350);
    }, 300);
}

/* ═══════════════════════════════════════════
   UI POR ROL
══════════════════════════════════════════ */
function updateRoleUI() {
    const r = ROLES[currentRole];
    const badge = document.getElementById('roleBadge');
    badge.className = `role-badge-hdr ${r.badgeClass}`;
    badge.innerHTML = `<span>${r.icon} ${r.label}</span>`;
    const av = document.getElementById('userAvatar');
    av.style.background = r.avatarBg;
    av.textContent = r.initials;
    av.title = `${r.label} — clic para cambiar`;
    document.getElementById('btnReportHdr').style.display = r.canReport ? 'flex' : 'none';
    document.getElementById('fabBtn').style.display = r.canReport ? 'grid' : 'none';
    renderRoleSwitcher();
}

function renderRoleSwitcher() {
    document.getElementById('roleSwitcherList').innerHTML = Object.values(ROLES).map(r => `
    <div class="role-sw-item ${currentRole === r.key ? 'active-role' : ''}" onclick="switchRole('${r.key}')">
      <div class="role-sw-icon" style="background:${r.key === 'visitor' ? 'rgba(136,152,170,.14)' : r.key === 'user' ? 'rgba(58,134,255,.11)' : 'rgba(255,214,10,.12)'}">${r.icon}</div>
      <div class="role-sw-info"><h4>${r.label}</h4><p>${r.desc}</p></div>
      <div class="role-sw-check">✓</div>
    </div>`).join('');
}

function switchRole(role) {
    currentRole = role;
    closeModal('roleModal');
    updateRoleUI();
    applyFiltersAndSort();
    const hint = document.getElementById('mapClickHint');
    if (ROLES[role].canReport) { hint.classList.add('visible'); setTimeout(() => hint.classList.remove('visible'), 3500); }
    showToast(`${ROLES[role].icon} Rol: ${ROLES[role].label}`, role === 'admin' ? 'warning' : role === 'user' ? 'success' : '');
}

// Al final de role-switcher.js
window.selectRole = selectRole;
window.switchRole = switchRole;