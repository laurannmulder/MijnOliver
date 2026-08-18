# MijnOliver

Het portaal op **mijnoliver.nl**: één centrale login voor de MijnOliver-tools.
Na het inloggen zie je alleen de omgevingen waarvoor je toegang hebt.

| Omgeving | Subdomein | Broncode |
| --- | --- | --- |
| Portaal | `mijnoliver.nl` | dit project |
| Risk | `risk.mijnoliver.nl` | `~/Documents/bedrijfsschade-profiel` |
| BB | `bb.mijnoliver.nl` | `~/Documents/BeterBedrijfskundig` |

## Stack

Next.js 16 (App Router, `src/`), React 19, Tailwind 4, Supabase (auth + database).
Bewust dezelfde stack als BeterBedrijfskundig, zodat de drie apps later dezelfde
Supabase-sessie kunnen delen.

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # en invullen
npm run dev
```

Zonder ingevulde Supabase-gegevens start de app gewoon op en toont elke pagina
een instelscherm in plaats van een foutmelding.

## Supabase instellen

1. Maak een nieuw Supabase-project aan (naam bijvoorbeeld `mijnoliver`).
2. Plak `supabase/migrations/0001_portaal.sql` in de SQL Editor en draai het.
   Dat maakt `profielen`, `toegang`, de trigger die bij elke nieuwe auth-gebruiker
   een profiel aanmaakt, en de RLS-policies.
3. Zet in Supabase → Authentication → URL Configuration de Site URL en de
   redirect-URL's op de omgeving waar het portaal draait
   (`http://localhost:3200` lokaal, `https://mijnoliver.nl` in productie).
4. Vul `.env.local` met de project-URL, de anon key en de service-role key.
5. Maak jezelf als eerste gebruiker aan (Authentication → Users → Add user, of via
   een uitnodiging) en zet daarna in de SQL Editor je eigen profiel op beheerder:

   ```sql
   update public.profielen set is_beheerder = true
   where id = (select id from auth.users where email = 'jouw@adres.nl');
   ```

   Dit is bewust een handmatige stap: de allereerste beheerder kan niet via de app
   worden aangewezen, want daarvoor moet je al beheerder zijn. Daarna gaat alles
   via `/admin/gebruikers`.

## Toegang beheren

`/admin/gebruikers` (alleen zichtbaar voor beheerders): uitnodigen per e-mail,
per gebruiker aanvinken welke omgevingen zij zien, beheerdersrecht geven en
accounts verwijderen. Geen rij in `toegang` = geen toegang; de tegel is dan
zichtbaar als "geen toegang" maar niet aanklikbaar.

De beheerderscontrole staat in de server actions zelf (`vereistBeheerder`), niet
alleen in de UI: een server action is een gewoon endpoint dat elke ingelogde
gebruiker kan aanroepen, en de service-role client omzeilt RLS.

## Huisstijl

Alle kleuren staan als tokens bovenin `src/app/globals.css`; de rest van de app
gebruikt alleen die tokens. Het logo is `public/logo.svg`, aangeroepen via
`src/components/Merk.tsx` — geen enkele pagina noemt zelf een bestandsnaam.

Beide zijn **placeholders**, overgenomen uit het bestaande "oliver bb"-logo
(zwart `#141414` + teal `#12756a`). Vervang `public/logo.svg` door het echte
logo en pas de acht kleurwaarden aan, dan is de hele app om.

## Nog te doen voor de subdomeinen live kunnen

Zie ook `DEPLOY.md` voor de stappen bij TransIP en Vercel.

- **Echte SSO tussen de drie apps** werkt nog niet. Het portaal is nu een centrale
  login met toegangsbeheer; de tegels linken naar de subdomeinen, waar je apart
  inlogt. De vervolgstap (die wijzigingen in de andere twee apps vergt, en die
  stonden voor nu bewust stil): laat alle drie de apps hetzelfde Supabase-project
  gebruiken en zet de auth-cookie op domein `.mijnoliver.nl`, dan geldt één sessie
  op alle subdomeinen.
- **Risk heeft nog geen login en geen database.** `bedrijfsschade-profiel` slaat
  dossiers op in een JSON-bestand op schijf (`.data/dossiers.json`) en heeft geen
  authenticatie. Zo publiek op `risk.mijnoliver.nl` zetten betekent: iedereen die
  het adres kent, kan bij alle dossiers. Bovendien overleeft een bestand op schijf
  geen serverless deploy op Vercel. `src/lib/opslag.ts` is daar al op voorbereid
  ("vervang deze module door Supabase"), maar dat moet nog gebeuren.
