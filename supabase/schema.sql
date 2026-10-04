-- IMRAN SERVICE CRM Schema
create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text default 'admin',
  created_at timestamptz default now()
);

create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price integer not null,
  duration_minutes integer not null,
  created_at timestamptz default now()
);

create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  start_at timestamptz not null,
  end_at timestamptz,
  status text default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  notes text,
  created_at timestamptz default now()
);

create table if not exists sms_logs (
  id uuid primary key default uuid_generate_v4(),
  phone text not null,
  message text not null,
  status text default 'sent',
  appointment_id uuid references appointments(id) on delete set null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table clients enable row level security;
alter table services enable row level security;
alter table appointments enable row level security;
alter table sms_logs enable row level security;

create policy "Allow authenticated all" on profiles for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all" on clients for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all" on services for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all" on appointments for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all" on sms_logs for all using (auth.role() = 'authenticated');

create index if not exists idx_clients_phone on clients(phone);
create index if not exists idx_appointments_start_at on appointments(start_at);
create index if not exists idx_sms_logs_created_at on sms_logs(created_at);
