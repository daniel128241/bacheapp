/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { reports, levelLabel, filterState } from '../modules/reports/reports-data.js';
import { openDetail } from './detail-modal.js';
import { leafletMap } from '../map/leaflet-map.js';
import { renderMapMarkers } from '../map/map-render.js';

/* ═══════════════════════════════════════════
   RENDER FEED
══════════════════════════════════════════ */
export function renderFeed() {
  const list = document.getElementById('feedList');
  list.innerHTML = '';
  if (!filterState.filteredReports.length) {
    list.innerHTML = `<div class="empty-state">
    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <circle cx="12" cy="17" r=".5"/>
    </svg>
    <p>No hay reportes con ese criterio.</p>
</div>`;
    document.getElementById('feedCount').textContent = '0 reportes';
    return;
  }
  document.getElementById('feedCount').textContent = `${filterState.filteredReports.length} reporte${filterState.filteredReports.length !== 1 ? 's' : ''}`;
  filterState.filteredReports.forEach(r => {
    const card = document.createElement('div');
    card.className = 'report-card';
    card.onclick = () => { openDetail(r.id); leafletMap.flyTo([r.lat, r.lng], 16, { duration: 1.2 }); };
    card.innerHTML = `
      <div class="card-bar ${r.level}"></div>
      <div class="card-img-wrap">
        <img src="${r.image}" alt="${r.title}" loading="lazy"/>
        <span class="status-badge ${r.level} abs-top-right">${levelLabel[r.level]}</span>
        ${r.priority ? '<span class="priority-flag">⚡ Prioritario</span>' : ''}
      </div>
      <div class="card-body">
        <div class="card-location"><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>${r.location}</div>
        <h3 class="card-title">${r.title}</h3>
        <p class="card-desc">${r.description}</p>
      </div>
      <div class="card-footer">
        <div class="card-meta">
          <span class="card-meta-item"><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>${r.comments.length}</span>
          <span class="card-meta-item"><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>${r.shares}</span>
          <span style="font-size:.71rem;color:var(--muted)">${r.date}</span>
        </div>
        <div class="card-actions">
          <button class="btn-share-card" onclick="event.stopPropagation();openShare(${r.id})">
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            Compartir
          </button>
          <button class="btn-detail" onclick="event.stopPropagation();openDetail(${r.id})">Ver más</button>
        </div>
      </div>`;
    list.appendChild(card);
  });
}

/* ═══════════════════════════════════════════
   FILTROS / SORT / SEARCH
══════════════════════════════════════════ */
export function applyFiltersAndSort() {
  filterState.filteredReports = filterState.currentFilter === 'all'
    ? [...reports]
    : reports.filter(r => r.level === filterState.currentFilter);

  if (filterState.currentSort === 'danger') filterState.filteredReports.sort((a, b) => a.level === 'danger' ? -1 : 1);
  if (filterState.currentSort === 'comments') filterState.filteredReports.sort((a, b) => b.comments.length - a.comments.length);

  renderFeed();
  renderMapMarkers();
}

export function filterReports(level, btn) {
  filterState.currentFilter = level;
  document.querySelectorAll('.header-filters .chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyFiltersAndSort();
}

export function sortReports(by, btn) {
  filterState.currentSort = by;
  document.querySelectorAll('.feed-sort .chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyFiltersAndSort();
}

export function handleSearch(val) {
  const q = val.toLowerCase();
  filterState.filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.location.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q)
  );
  renderFeed();
  renderMapMarkers();
}

/* ═══════════════════════════════════════════
   EXPONER AL WINDOW (para onclicks del HTML)
══════════════════════════════════════════ */
window.filterReports = filterReports;
window.sortReports = sortReports;
window.handleSearch = handleSearch;
window.openDetail = openDetail; 