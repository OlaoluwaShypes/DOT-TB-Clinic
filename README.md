# TB DOT Clinic Finder — Ogun State

A clean, responsive website to help patients and health workers locate **Directly Observed Therapy (DOT)** clinics for tuberculosis treatment across Ogun State, Nigeria.

## Features

- 🗺 **Interactive Map** — All 24 clinics plotted with colour-coded markers (green = signage visible, amber = no visible signage)
- 🔍 **Search & Filter** — Filter by clinic name, ward, LGA, location type, and signage status
- 📋 **Clinic Cards** — Click any card to zoom to that clinic on the map
- 📍 **Directions** — One-click Google Maps directions from any device
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ℹ️ **DOT Information** — Clear public health messaging about TB symptoms and treatment

## Files

```
tb-dot-finder/
├── index.html   # Main page (structure + layout)
├── style.css    # All styles
├── app.js       # Map logic, filtering, interactions
├── data.js      # Clinic data (24 facilities)
└── README.md    # This file
```

## How to Deploy on GitHub Pages

1. Create a new repository on GitHub (e.g. `tb-dot-finder`)
2. Upload all four files (`index.html`, `style.css`, `app.js`, `data.js`)
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save** — your site will be live at `https://yourusername.github.io/tb-dot-finder`

No build tools, no npm, no server required. It runs entirely in the browser.

## Updating Clinic Data

All clinic data is in `data.js`. Each entry follows this structure:

```js
{
  id: 1,
  state: "OGUN",
  lga: "SAGAMU",
  ward: "SABO AGURA",
  name: "ARUBA",
  signage: "Yes",           // "Yes" or "No"
  locationType: "Semi-Urban", // "Urban", "Semi-Urban", or "Rural"
  status: "Located and Open",
  lat: 6.825422,
  lng: 3.655275
}
```

## Data Source

Facility assessment records for Ogun State TB DOT clinics.
Verify current status with the Ogun State Ministry of Health or your local government health authority.

## Dependencies (CDN — no install needed)

- [Leaflet.js](https://leafletjs.com/) — open-source map library
- [OpenStreetMap](https://www.openstreetmap.org/) — free map tiles
- [Google Fonts](https://fonts.google.com/) — DM Serif Display + DM Sans

## License

Data and code may be freely used and adapted for public health purposes.
