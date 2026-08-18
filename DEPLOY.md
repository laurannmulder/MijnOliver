# MijnOliver live zetten

Wat ik niet voor je kan doen: DNS-records en deploys aanmaken vergt toegang tot
jouw TransIP- en Vercel-account. Hieronder staat precies wat er moet gebeuren.

## 1. Domein

`mijnoliver.nl` staat geregistreerd bij **TransIP** (het domein wijst nu naar
`37.97.254.27` = de TransIP-parkeerpagina). De subdomeinen `risk.` en `bb.`
bestaan nog niet — er zijn geen DNS-records voor.

## 2. Deploy per omgeving (Vercel)

Voor elke app een apart Vercel-project, net als bij BeterBedrijfskundig:

| Vercel-project | Repo | Domein |
| --- | --- | --- |
| mijnoliver | dit project | `mijnoliver.nl` + `www.mijnoliver.nl` |
| mijnoliver-risk | bedrijfsschade-profiel | `risk.mijnoliver.nl` |
| mijnoliver-bb | BeterBedrijfskundig | `bb.mijnoliver.nl` |

Let op de drie valkuilen die bij BeterBedrijfskundig speelden en die hier
opnieuw kunnen toeslaan:

1. **Deployment Protection** staat standaard aan en blokkeert alle bezoekers —
   uitzetten in de projectinstellingen.
2. **Framework Preset** bleef op "Other" hangen, waardoor elke route 404'de —
   controleer dat hij op "Next.js" staat.
3. **`proxy.ts` routeert niets op Vercel** in Next.js 16 — dit project gebruikt
   daarom bewust `src/middleware.ts`.

## 3. DNS bij TransIP

Vercel geeft per domein het exacte record. In de regel:

| Naam | Type | Waarde |
| --- | --- | --- |
| `@` | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com.` |
| `risk` | CNAME | `cname.vercel-dns.com.` |
| `bb` | CNAME | `cname.vercel-dns.com.` |

Neem de waarden over die Vercel zelf toont bij "Add domain" — die zijn leidend
boven dit tabelletje. Certificaten regelt Vercel automatisch zodra het record
klopt; reken op enkele minuten tot een uur voor DNS-propagatie.

## 4. Environment variables in Vercel

Zet voor het portaalproject dezelfde variabelen als in `.env.example`, met
`NEXT_PUBLIC_APP_URL=https://mijnoliver.nl`. Zet daarna in Supabase →
Authentication → URL Configuration diezelfde URL als Site URL, en
`https://mijnoliver.nl/auth/bevestigen` als toegestane redirect — anders komen
uitnodigings- en herstelmails op localhost uit.

## 5. Nog niet klaar om live te gaan

`risk.mijnoliver.nl` kan nog niet publiek: de app heeft geen login en bewaart
dossiers in een JSON-bestand op schijf. Zie het laatste kopje in `README.md`.
