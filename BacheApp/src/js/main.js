import { applyFiltersAndSort } from './components/feed.js';
import { leafletMap } from './map/leaflet-map.js';
import './map/map-events.js';
import './components/role-switcher.js';
import './components/modal.js';
import './components/toast.js';
import './components/share.js';
import './components/admin-actions.js';
import './components/comments.js';
import './components/report-form.js';
import './components/upload.js';
import './map/map-controller.js';

document.addEventListener('DOMContentLoaded', () => {
    applyFiltersAndSort();
    setTimeout(() => leafletMap.invalidateSize(), 100);

    console.log('%c🚧 BacheApp ', 'background:#1E3A5F;color:#FFD60A;font-size:1rem;font-weight:bold;padding:4px 10px;border-radius:6px;');
    console.log('%cFrontend listo. Backend próximamente 🚀', 'color:#3A86FF;font-size:.8rem');
});