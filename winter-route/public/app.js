const map = L.map('map', {
  zoomControl: false,
  attributionControl: true
}).setView([45.4215, -75.6972], 6);

L.control
  .zoom({
    position: 'topright'
  })
  .addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

const state = {
  map,
  routeLayer: null,
  anchorLayer: null,
  originCoords: null,
  lastResult: null
};

const selectors = {
  form: document.getElementById('route-form'),
  originInput: document.getElementById('origin-input'),
  destinationInput: document.getElementById('destination-input'),
  winterToggle: document.getElementById('winter-toggle'),
  planBtn: document.getElementById('plan-btn'),
  eta: document.getElementById('eta-value'),
  distance: document.getElementById('distance-value'),
  profile: document.getElementById('profile-value'),
  reasonsList: document.getElementById('reasons-list'),
  reasonsCount: document.getElementById('reasons-count'),
  anchorPills: document.getElementById('anchor-pills'),
  anchorsCount: document.getElementById('anchors-count'),
  mapsBtn: document.getElementById('maps-btn'),
  formError: document.getElementById('form-error'),
  mapEmpty: document.getElementById('map-empty'),
  locationBtn: document.getElementById('location-btn'),
  originHint: document.getElementById('origin-hint')
};

function setLoading(isLoading) {
  selectors.planBtn.disabled = isLoading;
  selectors.planBtn.textContent = isLoading ? 'Planning…' : 'Plan route';
}

function setError(message) {
  selectors.formError.textContent = message;
  selectors.formError.classList.toggle('hidden', !message);
}

function formatDistance(meters) {
  if (!meters) return '—';
  if (meters < 1000) {
    return `${meters.toFixed(0)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds) {
  if (!seconds) return '—';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  if (hrs === 0) {
    return `${mins} min`;
  }
  return `${hrs} h ${mins.toString().padStart(2, '0')} m`;
}

function updateStats(result) {
  selectors.eta.textContent = formatDuration(result.durationSeconds);
  selectors.distance.textContent = formatDistance(result.distanceMeters);

  if (result.meta?.winterProfileActive) {
    selectors.profile.textContent = 'Winter-safe';
  } else if (result.meta?.winterModeRequested) {
    selectors.profile.textContent = 'Fallback (standard)';
  } else {
    selectors.profile.textContent = 'Standard';
  }
}

function renderReasons(reasons = []) {
  selectors.reasonsList.innerHTML = '';
  if (!reasons.length) {
    const li = document.createElement('li');
    li.textContent = 'Route stats pending. Try enabling winter-safe weighting.';
    selectors.reasonsList.appendChild(li);
  } else {
    reasons.forEach((reason) => {
      const li = document.createElement('li');
      li.textContent = reason;
      selectors.reasonsList.appendChild(li);
    });
  }
  selectors.reasonsCount.textContent = reasons.length;
}

function renderAnchors(anchors = []) {
  selectors.anchorPills.innerHTML = '';
  anchors.forEach((anchor, index) => {
    const pill = document.createElement('span');
    pill.className = 'anchor-pill';
    pill.textContent = `Anchor ${index + 1} • ${anchor.pct}% mark (${anchor.lat.toFixed(3)}, ${anchor.lon.toFixed(3)})`;
    selectors.anchorPills.appendChild(pill);
  });
  selectors.anchorsCount.textContent = anchors.length;
}

function normalizeCoordinates(routeData, order = 'latlng') {
  if (!routeData) {
    return [];
  }

  if (Array.isArray(routeData)) {
    return routeData
      .map((entry) => {
        if (Array.isArray(entry) && entry.length >= 2) {
          const [first, second] = entry;
          return order === 'lnglat' ? [second, first] : [first, second];
        }
        if (entry && typeof entry === 'object') {
          const lat = Number(entry.lat ?? entry.latitude);
          const lon = Number(entry.lon ?? entry.longitude ?? entry.lng);
          if (Number.isFinite(lat) && Number.isFinite(lon)) {
            return [lat, lon];
          }
        }
        return null;
      })
      .filter(Boolean);
  }

  const coordinates = Array.isArray(routeData.coordinates)
    ? routeData.coordinates
    : Array.isArray(routeData.points?.coordinates)
      ? routeData.points.coordinates
      : [];

  if (!coordinates.length) {
    return [];
  }

  return coordinates
    .map((pair) => {
      if (!Array.isArray(pair) || pair.length < 2) {
        return null;
      }
      const [first, second] = pair;
      return order === 'lnglat' ? [second, first] : [first, second];
    })
    .filter(Boolean);
}

function renderMap(routeLatLng = null, anchors = [], rawRoute = null, geoJsonRoute = null) {
  if (state.routeLayer) {
    state.map.removeLayer(state.routeLayer);
    state.routeLayer = null;
  }
  if (state.anchorLayer) {
    state.map.removeLayer(state.anchorLayer);
    state.anchorLayer = null;
  }

  const latLngs = normalizeCoordinates(routeLatLng, 'latlng');
  const geoJsonFallback = latLngs.length ? latLngs : normalizeCoordinates(geoJsonRoute, 'lnglat');
  const fallbackLatLngs = geoJsonFallback.length ? geoJsonFallback : normalizeCoordinates(rawRoute, 'lnglat');

  if (!fallbackLatLngs.length) {
    console.warn('Route geometry missing – check backend response', { routeLatLng, geoJsonRoute, rawRoute });
    selectors.mapEmpty.textContent = 'Route returned without draw-able geometry. Check API response or try again.';
    selectors.mapEmpty.classList.remove('hidden');
    return;
  }

  state.routeLayer = L.polyline(fallbackLatLngs, {
    color: '#0ea5e9',
    weight: 5,
    opacity: 0.9
  }).addTo(state.map);

  state.map.fitBounds(state.routeLayer.getBounds(), { padding: [24, 24] });
  selectors.mapEmpty.classList.add('hidden');

  if (anchors.length) {
    state.anchorLayer = L.layerGroup(
      anchors.map((anchor) =>
        L.circleMarker([anchor.lat, anchor.lon], {
          radius: 6,
          color: '#2563eb',
          weight: 2,
          fillColor: '#bae6fd',
          fillOpacity: 0.9
        }).bindTooltip(`Anchor ${anchor.pct}%`)
      )
    ).addTo(state.map);
  }
}

function updateGoogleMapsLink(url) {
  if (!url) {
    selectors.mapsBtn.disabled = true;
    selectors.mapsBtn.dataset.href = '';
    return;
  }
  selectors.mapsBtn.disabled = false;
  selectors.mapsBtn.dataset.href = url;
}

selectors.mapsBtn.addEventListener('click', (event) => {
  const href = selectors.mapsBtn.dataset.href;
  if (!href) {
    event.preventDefault();
    return;
  }
  window.open(href, '_blank');
});

selectors.locationBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    setError('Geolocation is not supported by this browser.');
    return;
  }

  selectors.locationBtn.disabled = true;
  selectors.locationBtn.textContent = 'Locating…';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      state.originCoords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      selectors.originInput.value = 'Current location';
      selectors.originHint.textContent = 'Using live GPS coordinates.';
      selectors.locationBtn.textContent = 'Location set';
      setTimeout(() => {
        selectors.locationBtn.textContent = 'Use my location';
        selectors.locationBtn.disabled = false;
      }, 1200);
    },
    () => {
      setError('Unable to determine your location.');
      selectors.locationBtn.textContent = 'Use my location';
      selectors.locationBtn.disabled = false;
    },
    {
      enableHighAccuracy: true,
      maximumAge: 30_000,
      timeout: 10_000
    }
  );
});

async function requestRoute(payload) {
  const response = await fetch('/api/route', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Could not plan route');
  }

  return response.json();
}

selectors.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  setError('');

  const destination = selectors.destinationInput.value.trim();
  if (!destination) {
    setError('Destination is required.');
    return;
  }

  const originLabel = selectors.originInput.value.trim();
  if (!state.originCoords && !originLabel) {
    setError('Provide an origin or enable current location.');
    return;
  }

  const payload = {
    origin: state.originCoords
      ? {
          lat: state.originCoords.lat,
          lon: state.originCoords.lon,
          label: originLabel || 'Current location'
        }
      : { label: originLabel },
    destination: { label: destination },
    winterSafe: selectors.winterToggle.checked
  };

  setLoading(true);

  try {
    const result = await requestRoute(payload);
    state.lastResult = result;
    updateStats(result);
    renderReasons(result.reasons);
    renderAnchors(result.anchors);
    renderMap(result.routeLatLng, result.anchors, result.rawPath, result.route);
    updateGoogleMapsLink(result.googleMapsUrl);
  } catch (error) {
    console.error(error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
});
