/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { reports, levelLabel } from '../modules/reports/reports-data.js';
import { ROLES, roleState } from '../modules/reports/roles-data.js';
import { openModal, closeModal } from './modal.js';
import { createIcon } from '../map/map-render.js';

/* ═══════════════════════════════════════════
   DETALLE
══════════════════════════════════════════ */
export function openDetail(id) {
  const r = reports.find(x => x.id === id); if (!r) return;
  r.views++;
  const role = ROLES[roleState.currentRole];
  const adminHTML = role.canAdmin ? `<div class="admin-actions">
      <button class="admin-btn ab-accent"  onclick="markPriority(${id})">⚡ ${r.priority ? 'Quitar prioridad' : 'Prioritario'}</button>
      <button class="admin-btn ab-success" onclick="markRepaired(${id})">✔ Reparado</button>
      <button class="admin-btn ab-danger"  onclick="deleteReport(${id})">🗑 Eliminar</button>
    </div>` : '';
  const commentsHTML = r.comments.length
    ? r.comments.map(c => `<div class="comment-item"><div class="comment-avatar" style="background:${c.color}">${c.author.slice(0, 2).toUpperCase()}</div><div class="comment-bubble"><div class="comment-author">${c.author}</div><div class="comment-text">${c.text}</div><div class="comment-date">${c.date}</div></div></div>`).join('')
    : '<p style="color:var(--muted);font-size:.81rem">Sé el primero en comentar.</p>';
  const commentSection = role.canComment
    ? `<div class="comment-form"><textarea placeholder="¿Sigue el bache? ¿Ya fue reparado?" id="newCommentInput"></textarea><button class="btn-comment" onclick="addComment(${id})">Enviar</button></div>`
    : `<div class="visitor-comment-wall"><div><strong>Solo usuarios registrados pueden comentar.</strong><p>Cambia tu perfil para participar.</p></div><button class="btn-switch-role" onclick="closeModal('detailModal');openModal('roleModal')">Cambiar rol</button></div>`;

  document.getElementById('detailModalContent').innerHTML = `
    <div class="detail-hero">
      <img src="${r.image}" alt="${r.title}"/>
      <div class="detail-hero-overlay"></div>
      <button class="detail-close" onclick="closeModal('detailModal')">✕</button>
      <span class="status-badge ${r.level}" style="position:absolute;bottom:13px;left:13px">${levelLabel[r.level]}</span>
      ${r.priority ? '<span class="priority-flag" style="position:absolute;top:13px;left:13px">⚡ Prioritario</span>' : ''}
    </div>
    <div class="detail-body">
      <h2 class="detail-title">${r.title}</h2>
      <div class="detail-location-row">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        ${r.location}<span style="color:var(--border)">·</span><span>${r.date}</span>
      </div>
      ${adminHTML}
      <p class="detail-desc">${r.description}</p>
      <div class="detail-minimap" id="detailMapContainer_${id}">
        <div class="detail-minimap-lf" id="detailMap_${id}"></div>
      </div>
      <div class="detail-stats">
        <div class="stat-box"><strong>${r.comments.length}</strong><span>Comentarios</span></div>
        <div class="stat-box"><strong>${r.views}</strong><span>Vistas</span></div>
        <div class="stat-box"><strong>${r.shares}</strong><span>Compartidos</span></div>
      </div>
      <button class="btn-share-detail" onclick="openShare(${id})">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
        Compartir este reporte
      </button>
      <div class="comments-section">
        <div class="comments-title">💬 Comentarios (${r.comments.length})</div>
        <div id="commentsBody">${commentsHTML}</div>
        ${commentSection}
      </div>
    </div>`;

  openModal('detailModal');

  setTimeout(() => {
    const el = document.getElementById(`detailMap_${id}`);
    if (!el || el._leafletMap) return;
    const miniMap = L.map(el, { zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false, attributionControl: false }).setView([r.lat, r.lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(miniMap);
    L.marker([r.lat, r.lng], { icon: createIcon(r.level) }).addTo(miniMap);
    el._leafletMap = miniMap;
  }, 150);
}
