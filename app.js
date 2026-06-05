// ── TB DOT Clinic Finder — app.js ──────────────────────────────────────────

let map, markersLayer, allMarkers = [], filteredClinics = [...clinicData];

// ── Map init ──────────────────────────────────────────────────────────────
function initMap() {
  map = L.map('map', { zoomControl: true, scrollWheelZoom: true });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);
  markersLayer = L.layerGroup().addTo(map);
}

// ── Custom marker icons ────────────────────────────────────────────────────
function getIcon(signage) {
  const color = signage === 'Yes' ? '#1A6B3C' : '#D97706';
  const border = signage === 'Yes' ? '#0f4a29' : '#92400e';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z"
        fill="${color}" stroke="${border}" stroke-width="1.5"/>
      <circle cx="16" cy="16" r="7" fill="white" opacity="0.9"/>
      <path d="M16 10v12M10 16h12" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40]
  });
}

// ── Render markers ────────────────────────────────────────────────────────
function renderMarkers(clinics) {
  markersLayer.clearLayers();
  allMarkers = [];

  clinics.forEach(clinic => {
    const marker = L.marker([clinic.lat, clinic.lng], { icon: getIcon(clinic.signage) });
    marker.bindPopup(`
      <div class="map-popup">
        <div class="popup-name">${clinic.name}</div>
        <div class="popup-ward">${clinic.ward} Ward</div>
        <div class="popup-meta">
          <span class="tag tag-lga">${clinic.lga}</span>
          <span class="tag tag-type">${clinic.locationType}</span>
          <span class="tag ${clinic.signage === 'Yes' ? 'tag-open' : 'tag-warn'}">
            ${clinic.signage === 'Yes' ? '✔ Signage Visible' : '⚠ No Signage'}
          </span>
        </div>
        <div class="popup-status">🟢 ${clinic.status}</div>
        <a class="popup-directions"
          href="https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}"
          target="_blank" rel="noopener">Get Directions →</a>
      </div>`, { maxWidth: 260 });

    marker.clinicId = clinic.id;
    marker.addTo(markersLayer);
    allMarkers.push(marker);
  });

  if (clinics.length > 0) {
    const bounds = L.latLngBounds(clinics.map(c => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }
}

// ── Build LGA dropdown from data ──────────────────────────────────────────
function buildFilters() {
  const lgas = [...new Set(clinicData.map(c => c.lga))].sort();
  const lgaSel = document.getElementById('lgaFilter');
  lgas.forEach(lga => {
    const opt = document.createElement('option');
    opt.value = lga;
    opt.textContent = lga;
    lgaSel.appendChild(opt);
  });
}

// ── Render clinic cards ───────────────────────────────────────────────────
function renderCards(clinics) {
  const grid = document.getElementById('clinicGrid');
  grid.innerHTML = '';

  if (clinics.length === 0) {
    grid.innerHTML = '<div class="no-results">No clinics match your search. Try adjusting the filters.</div>';
    return;
  }

  clinics.forEach(clinic => {
    const card = document.createElement('div');
    card.className = `clinic-card ${clinic.signage === 'Yes' ? 'card-open' : 'card-warn'}`;
    card.dataset.id = clinic.id;
    card.innerHTML = `
      <div class="card-top">
        <div class="card-name">${clinic.name}</div>
        <span class="card-badge ${clinic.locationType.toLowerCase().replace('-', '')}">
          ${clinic.locationType}
        </span>
      </div>
      <div class="card-ward">${clinic.ward} Ward</div>
      <div class="card-lga">LGA: ${clinic.lga}</div>
      <div class="card-footer">
        <span class="signage-indicator ${clinic.signage === 'Yes' ? 'sig-yes' : 'sig-no'}">
          ${clinic.signage === 'Yes' ? '✔ Signage Visible' : '⚠ No Visible Signage'}
        </span>
        <a class="card-directions"
          href="https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}"
          target="_blank" rel="noopener">Directions</a>
      </div>`;

    card.addEventListener('click', () => {
      const marker = allMarkers.find(m => m.clinicId === clinic.id);
      if (marker) {
        map.setView([clinic.lat, clinic.lng], 15, { animate: true });
        marker.openPopup();
        document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
      }
    });

    grid.appendChild(card);
  });
}

// ── Update result count ───────────────────────────────────────────────────
function updateCount(n, total) {
  const el = document.getElementById('resultCount');
  el.textContent = n === total
    ? `Showing all ${total} clinics`
    : `Showing ${n} of ${total} clinics`;
}

// ── Filter + search ───────────────────────────────────────────────────────
function applyFilters() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const lga = document.getElementById('lgaFilter').value;
  const type = document.getElementById('typeFilter').value;
  const signage = document.getElementById('signageFilter').value;

  filteredClinics = clinicData.filter(c => {
    const matchSearch = !query ||
      c.name.toLowerCase().includes(query) ||
      c.ward.toLowerCase().includes(query) ||
      c.lga.toLowerCase().includes(query);
    const matchLga = !lga || c.lga === lga;
    const matchType = !type || c.locationType === type;
    const matchSignage = !signage || c.signage === signage;
    return matchSearch && matchLga && matchType && matchSignage;
  });

  renderMarkers(filteredClinics);
  renderCards(filteredClinics);
  updateCount(filteredClinics.length, clinicData.length);
}

// ── Reset ─────────────────────────────────────────────────────────────────
function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('lgaFilter').value = '';
  document.getElementById('typeFilter').value = '';
  document.getElementById('signageFilter').value = '';
  applyFilters();
}

// ── Event listeners ───────────────────────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('lgaFilter').addEventListener('change', applyFilters);
document.getElementById('typeFilter').addEventListener('change', applyFilters);
document.getElementById('signageFilter').addEventListener('change', applyFilters);
document.getElementById('resetBtn').addEventListener('click', resetFilters);

// ── Boot ──────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  initMap();
  renderMarkers(clinicData);
  renderCards(clinicData);
  updateCount(clinicData.length, clinicData.length);

  // Stats
  document.getElementById('stat-total').textContent = clinicData.length;
  document.getElementById('stat-open').textContent = clinicData.filter(c => c.status.includes('Open')).length;
});
