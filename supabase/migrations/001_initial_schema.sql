-- ============================================================
-- Ogun DOT Connect — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── CLINICS ──────────────────────────────────────────────────
create table if not exists public.clinics (
  id                    uuid primary key default uuid_generate_v4(),
  clinic_name           text not null,
  lga                   text not null,
  ward                  text,
  town                  text not null,
  address               text not null,
  latitude              double precision not null,
  longitude             double precision not null,
  phone                 text,
  email                 text,
  opening_hours         text,
  services              text[],
  genexpert_available   boolean not null default false,
  hiv_tb_integrated     boolean not null default false,
  pediatric_tb          boolean not null default false,
  drug_refill_days      text,
  contact_officer       text,
  whatsapp_number       text,
  image_url             text,
  facility_location_type text,
  status                text not null default 'active' check (status in ('active', 'inactive', 'pending')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Indexes
create index if not exists clinics_lga_idx on public.clinics(lga);
create index if not exists clinics_status_idx on public.clinics(status);
create index if not exists clinics_genexpert_idx on public.clinics(genexpert_available);

-- ── USERS ─────────────────────────────────────────────────────
create table if not exists public.users (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  email         text unique not null,
  role          text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at    timestamptz not null default now()
);

-- ── REFERRALS ─────────────────────────────────────────────────
create table if not exists public.referrals (
  id                uuid primary key default uuid_generate_v4(),
  patient_reference text not null,
  clinic_id         uuid references public.clinics(id) on delete cascade,
  referring_facility text,
  status            text not null default 'pending' check (status in ('pending', 'completed', 'cancelled')),
  notes             text,
  created_at        timestamptz not null default now()
);

-- ── SEARCH ANALYTICS ──────────────────────────────────────────
create table if not exists public.search_analytics (
  id          uuid primary key default uuid_generate_v4(),
  query       text,
  lga_filter  text,
  results     int,
  created_at  timestamptz not null default now()
);

-- ── CLINIC VIEWS ──────────────────────────────────────────────
create table if not exists public.clinic_views (
  id          uuid primary key default uuid_generate_v4(),
  clinic_id   uuid references public.clinics(id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
alter table public.clinics enable row level security;
alter table public.referrals enable row level security;
alter table public.users enable row level security;

-- Public read access for clinics
create policy "Public read clinics"
  on public.clinics for select
  using (status = 'active');

-- Admins can do everything
create policy "Admin full access clinics"
  on public.clinics for all
  using (auth.role() = 'authenticated');

-- Public can create referrals
create policy "Public create referrals"
  on public.referrals for insert
  with check (true);

-- ── UPDATED_AT TRIGGER ────────────────────────────────────────
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger clinics_updated_at
  before update on public.clinics
  for each row execute function public.update_updated_at();

-- ============================================================
-- SEED DATA — 24 Ogun State DOT Clinics from PHC Directory
-- ============================================================
insert into public.clinics (clinic_name, lga, ward, town, address, latitude, longitude, phone, opening_hours, services, genexpert_available, hiv_tb_integrated, pediatric_tb, drug_refill_days, contact_officer, whatsapp_number, facility_location_type, status) values
('Aruba Primary Health Centre', 'Sagamu', 'Sabo Agura', 'Sagamu', 'Sabo Agura Ward, Sagamu, Ogun State', 6.825422, 3.655275, '08012345601', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'General OPD'], false, true, false, 'Mondays and Thursdays', 'Nurse Adebayo', '2348012345601', 'Semi-Urban', 'active'),
('Emuren Primary Health Centre', 'Sagamu', 'Odelemo', 'Emuren', 'Odelemo Ward, Emuren, Sagamu LGA, Ogun State', 6.696772, 3.617214, '08012345602', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Tuesdays', 'CHO Oluwaseun', '2348012345602', 'Rural', 'active'),
('Itunsoku Primary Health Centre', 'Sagamu', 'Itunsoku', 'Sagamu', 'Itunsoku Ward, Sagamu, Ogun State', 6.841372, 3.646416, '08012345603', 'Mon–Fri: 8:00am – 5:00pm', ARRAY['TB Screening', 'DOT Treatment', 'HIV/TB Clinic', 'GeneXpert'], true, true, true, 'Mondays, Wednesdays and Fridays', 'Dr. Akinwale', '2348012345603', 'Urban', 'active'),
('Sabo GRA Health Centre', 'Sagamu', 'Sabo GRA', 'Sagamu', 'Sabo GRA, Sagamu, Ogun State', 6.836423, 3.633725, '08012345604', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Fridays', 'Nurse Folake', '2348012345604', 'Urban', 'active'),
('Sabo Agura PHC', 'Sagamu', 'Sabo Agura', 'Sagamu', 'Sabo Agura, Sagamu, Ogun State', 6.832458, 3.647943, '08012345605', 'Mon–Sat: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'Pediatric TB'], false, true, true, 'Tuesdays and Fridays', 'CHO Bamidele', '2348012345605', 'Urban', 'active'),
('Afisuru Health Centre', 'Sagamu', 'Ogijo', 'Ogijo', 'Ogijo Ward, Sagamu LGA, Ogun State', 6.716394, 3.521219, '08012345606', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Mondays', 'Nurse Kehinde', '2348012345606', 'Semi-Urban', 'active'),
('Ogijo Health Centre', 'Sagamu', 'Ogijo', 'Ogijo', 'Ogijo, Sagamu LGA, Ogun State', 6.70418, 3.511011, '08012345607', 'Mon–Fri: 8:00am – 5:00pm', ARRAY['TB Screening', 'DOT Treatment', 'HIV/TB Clinic', 'GeneXpert'], true, true, false, 'Mondays, Wednesdays', 'Dr. Omotola', '2348012345607', 'Urban', 'active'),
('Ajegunle Primary Health Centre', 'Sagamu', 'Ogijo', 'Ajegunle', 'Ajegunle, Ogijo, Sagamu LGA, Ogun State', 6.692734, 3.494852, '08012345608', 'Mon–Fri: 8:00am – 3:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Thursdays', 'CHO Adewale', '2348012345608', 'Rural', 'active'),
('Ogede Health Post', 'Sagamu', 'Ogijo', 'Ogede', 'Ogede Village, Ogijo, Sagamu LGA, Ogun State', 6.716801, 3.481645, '08012345609', 'Mon, Wed, Fri: 8:00am – 2:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Wednesdays', 'Nurse Bello', '2348012345609', 'Rural', 'active'),
('Aiyegbami Primary Health Centre', 'Sagamu', 'Aiyegbami', 'Sagamu', 'Aiyegbami Ward, Sagamu, Ogun State', 6.837634, 3.652595, '08012345610', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'General OPD'], false, true, false, 'Tuesdays', 'CHO Olamide', '2348012345610', 'Urban', 'active'),
('Batoro Primary Health Centre', 'Sagamu', 'Batoro', 'Sagamu', 'Batoro Ward, Sagamu, Ogun State', 6.844058, 3.650475, '08012345611', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Mondays', 'Nurse Taiwo', '2348012345611', 'Urban', 'active'),
('Ipoji Primary Health Centre', 'Sagamu', 'Ipoji', 'Sagamu', 'Ipoji Ward, Sagamu, Ogun State', 6.845309, 3.652082, '08012345612', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, true, 'Wednesdays', 'CHO Sola', '2348012345612', 'Urban', 'active'),
('Legacy Health Centre', 'Sagamu', 'Soyindo', 'Sagamu', 'Soyindo Ward, Sagamu, Ogun State', 6.852567, 3.654561, '08012345613', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'HIV/TB Clinic'], false, true, false, 'Thursdays', 'Nurse Comfort', '2348012345613', 'Urban', 'active'),
('Agbowa Ibido Health Centre', 'Sagamu', 'Agbowa', 'Agbowa', 'Agbowa Ibido, Sagamu LGA, Ogun State', 6.851995, 3.647027, '08012345614', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Fridays', 'CHO Gboyega', '2348012345614', 'Urban', 'active'),
('Ajaka Primary Health Centre', 'Sagamu', 'Ajaka', 'Sagamu', 'Ajaka Ward, Sagamu, Ogun State', 6.853548, 3.635688, '08012345615', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'Pediatric TB'], false, false, true, 'Mondays', 'Nurse Blessing', '2348012345615', 'Urban', 'active'),
('Ijagba Health Centre', 'Sagamu', 'Ijagba', 'Sagamu', 'Ijagba Ward, Sagamu, Ogun State', 6.847589, 3.645721, '08012345616', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Tuesdays', 'CHO Segun', '2348012345616', 'Urban', 'active'),
('Latawa Primary Health Centre', 'Sagamu', 'Latawa', 'Sagamu', 'Latawa Ward, Sagamu, Ogun State', 6.844648, 3.644424, '08012345617', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, true, false, 'Wednesdays', 'Nurse Grace', '2348012345617', 'Urban', 'active'),
('Amodu Alowomatana Health Centre', 'Sagamu', 'Itunsoku', 'Sagamu', 'Itunsoku Ward, Sagamu, Ogun State', 6.846502, 3.647329, '08012345618', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Thursdays', 'CHO Damilola', '2348012345618', 'Urban', 'active'),
('Isote Primary Health Centre', 'Sagamu', 'Isote', 'Sagamu', 'Isote Ward, Sagamu, Ogun State', 6.847996, 3.641809, '08012345619', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'General OPD'], false, false, false, 'Mondays', 'Nurse Precious', '2348012345619', 'Urban', 'active'),
('Sotubo Health Centre', 'Sagamu', 'Ogijo', 'Sotubo', 'Sotubo, Ogijo, Sagamu LGA, Ogun State', 6.807533, 3.584403, '08012345620', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Fridays', 'CHO Rasheed', '2348012345620', 'Semi-Urban', 'active'),
('Simawa Primary Health Centre', 'Sagamu', 'Simawa', 'Simawa', 'Simawa, Sagamu LGA, Ogun State', 6.774019, 3.50171, '08012345621', 'Mon–Fri: 8:00am – 3:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Tuesdays', 'Nurse Aminat', '2348012345621', 'Rural', 'active'),
('Likosi Primary Health Centre', 'Sagamu', 'Ogijo', 'Likosi', 'Likosi, Ogijo, Sagamu LGA, Ogun State', 6.761471, 3.536275, '08012345622', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment'], false, false, false, 'Wednesdays', 'CHO Toyin', '2348012345622', 'Semi-Urban', 'active'),
('Owode Epota Health Centre', 'Sagamu', 'Sabo Agura', 'Sagamu', 'Owode Epota, Sabo Agura, Sagamu, Ogun State', 6.822969, 3.633803, '08012345623', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'General OPD'], false, false, false, 'Mondays', 'Nurse Victoria', '2348012345623', 'Urban', 'active'),
('Makun Ojumele Health Centre', 'Sagamu', 'Ojumele', 'Sagamu', 'Makun Ojumele, Sagamu, Ogun State', 6.849035, 3.630761, '08012345624', 'Mon–Fri: 8:00am – 4:00pm', ARRAY['TB Screening', 'DOT Treatment', 'HIV/TB Clinic'], true, true, true, 'Tuesdays and Fridays', 'Dr. Adeyemi', '2348012345624', 'Urban', 'active');
