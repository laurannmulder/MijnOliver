-- MijnOliver-portaal: profielen en toegang per tool.
-- Draai dit bestand in de Supabase SQL Editor (zelfde werkwijze als in het
-- BeterBedrijfskundig-project: er is geen DB-wachtwoord gedeeld, dus geen
-- directe psql/migratietool-toegang).

-- 1. Welke tools bestaan er. Nieuwe tool toevoegen? Dan hier een waarde
--    toevoegen én in src/lib/tools.ts.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'tool_slug') then
    create type tool_slug as enum ('risk', 'bb');
  end if;
end
$$;

-- 2. Profiel per gebruiker. auth.users blijft de bron voor e-mail/wachtwoord;
--    hier staat alleen wat het portaal zelf nodig heeft.
create table if not exists public.profielen (
  id uuid primary key references auth.users (id) on delete cascade,
  naam text,
  is_beheerder boolean not null default false,
  aangemaakt_op timestamptz not null default now()
);

-- 3. Toegang: welke gebruiker mag welke tool zien. Geen rij = geen toegang.
create table if not exists public.toegang (
  gebruiker_id uuid not null references auth.users (id) on delete cascade,
  tool tool_slug not null,
  verleend_op timestamptz not null default now(),
  primary key (gebruiker_id, tool)
);

-- 4. Elke nieuwe auth-gebruiker krijgt automatisch een profiel, zodat het
--    portaal nooit naar een ontbrekend profiel hoeft te raden.
create or replace function public.maak_profiel_voor_nieuwe_gebruiker()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profielen (id, naam)
  values (new.id, nullif(new.raw_user_meta_data ->> 'naam', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists profiel_bij_nieuwe_gebruiker on auth.users;
create trigger profiel_bij_nieuwe_gebruiker
  after insert on auth.users
  for each row execute function public.maak_profiel_voor_nieuwe_gebruiker();

-- Profielen voor gebruikers die al bestonden voordat deze migratie draaide.
insert into public.profielen (id)
select u.id from auth.users u
where not exists (select 1 from public.profielen p where p.id = u.id);

-- 5. RLS. Beheerdersacties in de app lopen via de service-role client (die RLS
--    omzeilt); deze policies beschermen de gewone, ingelogde gebruiker.
--    De helper is security definer om oneindige recursie te voorkomen: een
--    policy op profielen die zelf profielen leest zou zichzelf aanroepen.
create or replace function public.is_beheerder()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select p.is_beheerder from public.profielen p where p.id = auth.uid()),
    false
  );
$$;

alter table public.profielen enable row level security;
alter table public.toegang enable row level security;

drop policy if exists "eigen profiel lezen" on public.profielen;
create policy "eigen profiel lezen" on public.profielen
  for select using (id = auth.uid() or public.is_beheerder());

drop policy if exists "eigen naam bijwerken" on public.profielen;
create policy "eigen naam bijwerken" on public.profielen
  for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "eigen toegang lezen" on public.toegang;
create policy "eigen toegang lezen" on public.toegang
  for select using (gebruiker_id = auth.uid() or public.is_beheerder());
