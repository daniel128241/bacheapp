/* ═══════════════════════════════════════════
   ROLES DATA
══════════════════════════════════════════ */

export const ROLES = {
    visitor: { key: 'visitor', label: 'Visitante', icon: '👁️', initials: '?', avatarBg: 'var(--muted)', badgeClass: 'visitor', canReport: false, canComment: false, canAdmin: false, desc: 'Solo puedes ver, navegar y compartir reportes.' },
    user: { key: 'user', label: 'Usuario', icon: '👤', initials: 'JD', avatarBg: 'var(--secondary)', badgeClass: 'user', canReport: true, canComment: true, canAdmin: false, desc: 'Puedes reportar baches y comentar.' },
    admin: { key: 'admin', label: 'Admin', icon: '👑', initials: 'JP', avatarBg: 'var(--primary)', badgeClass: 'admin', canReport: true, canComment: true, canAdmin: true, desc: 'Acceso completo de gestión y moderación.' }
};

// Estado compartido — objeto para que todos los archivos vean el cambio
export const roleState = {
    currentRole: 'visitor'
};