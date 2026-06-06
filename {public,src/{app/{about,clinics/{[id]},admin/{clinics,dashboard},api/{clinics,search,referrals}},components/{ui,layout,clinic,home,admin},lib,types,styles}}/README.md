# Ogun DOT Connect

**Free Tuberculosis Testing & Treatment Directory for Ogun State, Nigeria**

A modern, mobile-first public health platform helping patients quickly find free TB DOT (Directly Observed Therapy) clinics across Ogun State. Built for potential adoption by the Ogun State Ministry of Health, NTBLCP, and international health partners.

Inspired by the [Sagamu Primary Health Centres Directory](https://sagamuhealthcentres.com/) developed under the National Health Fellows Programme.

---

## Features

- 🏥 **DOT Clinic Directory** — 24+ real clinics from the Ogun State PHC database, searchable and filterable
- 🗺️ **Google Maps Integration** — embedded maps and one-tap directions for every clinic
- 🔍 **TB Symptom Checker** — quick risk assessment tool with guided referral
- 📱 **Mobile-First Design** — optimised for low-bandwidth Android phones
- 💬 **WhatsApp Integration** — floating button + clinic-specific WhatsApp links
- 🛡️ **Admin Dashboard** — manage clinics, view analytics
- ⚡ **Next.js 15** — fast, SEO-optimised, statically generated pages

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Maps | Google Maps Embed API |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ogun-dot-connect.git
cd ogun-dot-connect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_WHATSAPP_NUMBER=2348000000000
```

### 4. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration script:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
   This creates all tables and seeds 24 clinic records.

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add all environment variables from `.env.local`
4. Deploy — Vercel detects Next.js automatically

---

## Project Structure

```
ogun-dot-connect/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Homepage
│   │   ├── about/page.tsx             # About TB
│   │   ├── clinics/
│   │   │   ├── page.tsx               # Clinic directory
│   │   │   └── [id]/page.tsx          # Clinic detail
│   │   ├── symptom-checker/           # Symptom assessment tool
│   │   ├── admin/                     # Admin dashboard
│   │   └── api/clinics/               # REST API routes
│   ├── components/
│   │   ├── layout/                    # Navbar, Footer, WhatsApp button
│   │   └── clinic/                    # ClinicCard, ClinicFilters
│   ├── lib/
│   │   ├── seed-data.ts               # 24 real Ogun PHC clinics
│   │   ├── supabase.ts                # Supabase client
│   │   └── utils.ts                   # Helper functions
│   └── types/index.ts                 # TypeScript definitions
├── supabase/
│   └── migrations/001_initial_schema.sql
└── public/
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, symptoms, treatment steps, FAQ |
| `/clinics` | Searchable clinic directory with filters |
| `/clinics/[id]` | Individual clinic detail with map and directions |
| `/about` | Full TB education page |
| `/symptom-checker` | Interactive symptom assessment |
| `/admin` | Admin login |
| `/admin/dashboard` | Clinic management dashboard |
| `/api/clinics` | REST API — list clinics with filters |
| `/api/clinics/[id]` | REST API — single clinic |

---

## Clinic Data

All 24 clinics in this release are real Ogun State Primary Health Centres sourced from the [Sagamu PHC Directory](https://sagamuhealthcentres.com/), with coordinates verified from the original dataset. Contact details and opening hours are placeholder values and should be verified with the Ogun State Ministry of Health before public launch.

---

## Phase 2 Roadmap

- [ ] Referral management system
- [ ] Treatment adherence SMS/WhatsApp reminders
- [ ] Defaulter tracking for DOT programme managers
- [ ] Drug stock monitoring dashboard
- [ ] NGO and donor reporting
- [ ] Progressive Web App (offline support)
- [ ] AI-powered patient guidance chatbot
- [ ] Multi-LGA expansion beyond Sagamu

---

## Acknowledgements

- Built under the **National Health Fellows Programme**
- Clinic data sourced from the **Sagamu Primary Health Centres Directory**
- Aligned with **NTBLCP** TB programme guidelines
- Designed to WHO/UNICEF public health digital standards

---

## License

MIT — free to use, adapt, and deploy for public health purposes.

> TB is curable. Treatment is free. Early diagnosis saves lives.
