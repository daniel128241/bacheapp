/* ═══════════════════════════════════════════
   IMPORTS
══════════════════════════════════════════ */
import { reports, levelLabel } from '../modules/reports/reports-data.js';
import { showToast } from './toast.js';
import { openModal } from './modal.js';
import { applyFiltersAndSort } from './feed.js';

/* ═══════════════════════════════════════════
   COMPARTIR
══════════════════════════════════════════ */
export function openShare(id) {
  const r = reports.find(x => x.id === id); if (!r) return;
  const url = `https://bacheapp.mx/reporte/${id}`;
  const msg = `🚧 Bache: ${r.title}\n📍 ${r.location}\n${levelLabel[r.level]}\n\nVer en BacheApp: ${url}`;
  const enc = encodeURIComponent(msg);

  document.getElementById('shareModalContent').innerHTML = `
    <div class="modal-header-row">
      <span class="modal-header-title">📤 Compartir reporte</span>
      <button class="close-x" onclick="closeModal('shareModal')">✕</button>
    </div>
    <div class="share-preview">
      <img class="share-preview-img" src="${r.image}" alt="${r.title}"/>
      <div class="share-preview-body">
        <span class="status-badge ${r.level}">${levelLabel[r.level]}</span>
        <div class="share-preview-title">${r.title}</div>
        <div class="share-preview-loc">
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          ${r.location}
        </div>
      </div>
    </div>
    <div class="share-section-label">Compartir en</div>
    <div class="share-platforms">
      <button class="spb" onclick="shareOn('whatsapp','${enc}',${id})">
        <div class="sp-icon sp-wa"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.537 4.053 1.476 5.768L0 24l6.452-1.427A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.848 0-3.577-.5-5.065-1.374l-.363-.215-3.829.847.863-3.742-.236-.38A9.78 9.78 0 012.182 12C2.182 6.588 6.588 2.182 12 2.182S21.818 6.588 21.818 12 17.412 21.818 12 21.818z"/></svg></div>WhatsApp
      </button>
      <button class="spb" onclick="shareOn('telegram','${enc}',${id})">
        <div class="sp-icon sp-tg"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></div>Telegram
      </button>
      <button class="spb" onclick="shareOn('twitter','${enc}',${id})">
        <div class="sp-icon sp-tw"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>X / Twitter
      </button>
      <button class="spb" onclick="shareOn('facebook','${encodeURIComponent(url)}',${id})">
        <div class="sp-icon sp-fb"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>Facebook
      </button>
      <button class="spb" onclick="shareOn('sms','${enc}',${id})"><div class="sp-icon sp-sms">📱</div>SMS</button>
      <button class="spb" onclick="shareOn('mail','${enc}',${id})"><div class="sp-icon sp-mail">✉️</div>Email</button>
      <button class="spb" onclick="copyLink(${id})"><div class="sp-icon sp-copy">🔗</div>Copiar</button>
      <button class="spb" onclick="shareNative(${id})"><div class="sp-icon sp-native">⬆️</div>Más...</button>
    </div>
    <div class="share-section-label">Enlace directo</div>
    <div class="share-link-box">
      <input class="share-link-input" type="text" value="${url}" readonly id="shareLinkInput_${id}"/>
      <button class="btn-copy-link" onclick="copyLink(${id})">Copiar</button>
    </div>`;

  openModal('shareModal');
}


export function shareOn(platform, enc, id) {
  const url = `https://bacheapp.mx/reporte/${id}`;
  const urls = {
    whatsapp: `https://wa.me/?text=${enc}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${enc}`,
    twitter: `https://twitter.com/intent/tweet?text=${enc}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    sms: `sms:?body=${enc}`,
    mail: `mailto:?subject=${encodeURIComponent('Reporte de bache - BacheApp')}&body=${enc}`
  };
  const r = reports.find(x => x.id === id); if (r) r.shares++;
  applyFiltersAndSort();
  showToast(`📤 Abriendo ${platform}…`, 'success');
  setTimeout(() => { if (urls[platform]) window.open(urls[platform], '_blank'); }, 350);
}

export async function shareNative(id) {
  const r = reports.find(x => x.id === id); if (!r) return;
  const url = `https://bacheapp.mx/reporte/${id}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: r.title, text: `🚧 ${r.title}\n📍 ${r.location}\n${levelLabel[r.level]}`, url });
      r.shares++;
      applyFiltersAndSort();
      showToast('📤 Compartido con éxito', 'success');
    } catch (err) {
      if (err.name !== 'AbortError') showToast('⚠ No se pudo compartir', 'warning');
    }
  } else {
    copyLink(id);
  }
}

export function copyLink(id) {
  const url = `https://bacheapp.mx/reporte/${id}`;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => showToast('🔗 Enlace copiado al portapapeles', 'success'))
      .catch(() => _fallbackCopy(id));
  } else {
    _fallbackCopy(id);
  }
  const r = reports.find(x => x.id === id); if (r) r.shares++;
  applyFiltersAndSort();
}

function _fallbackCopy(id) {
  const inp = document.getElementById(`shareLinkInput_${id}`);
  if (inp) { inp.select(); inp.setSelectionRange(0, 99999); try { document.execCommand('copy'); } catch (e) { } }
  showToast('🔗 Enlace copiado al portapapeles', 'success');
}

/* ═══════════════════════════════════════════
   EXPONER AL WINDOW
══════════════════════════════════════════ */
window.openShare = openShare;
window.shareOn = shareOn;
window.shareNative = shareNative;
window.copyLink = copyLink;