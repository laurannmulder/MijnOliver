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

**Neem de waarden over die Vercel zelf toont bij het domein.** Wat er op
2026-08-18 voor `mijnoliver.nl` uit kwam, en wat er misging:

| Naam | Type | Waarde |
| --- | --- | --- |
| `@` | A | `216.198.79.1` |
| `www` | CNAME | `mijnoliver.nl.` |

Let op deze vier dingen — alle vier kostten tijd:

1. **Het A-record is `216.198.79.1`**, niet de `76.76.21.21` uit oudere
   handleidingen. Die legacy waarde blijft werken, maar Vercel reikt de nieuwe aan.
2. **Het AAAA-record moet je verwijderen.** TransIP zet er standaard een neer
   (`2a01:7c8:3:1337::27`, hun parkeerserver). Vercel heeft geen IPv6 — noch
   `vercel.com` noch een deployment heeft een AAAA-record — dus er is geen
   vervangende waarde. Laat je hem staan, dan komen bezoekers met IPv6 op de
   parkeerpagina en bezoekers met IPv4 op je site.
3. **De schakelaar "TransIP-instellingen" moet uit.** Zolang die aan staat
   beheert TransIP de records met hun eigen standaardset.
4. **Het bestaande `@`-A-record wijzigen**, niet een tweede toevoegen.

Certificaten regelt Vercel automatisch; in dit geval stond alles binnen enkele
minuten op "Valid Configuration".

## 4. Environment variables in Vercel

Zet voor het portaalproject dezelfde variabelen als in `.env.example`, met
`NEXT_PUBLIC_APP_URL=https://mijnoliver.nl`. Zet daarna in Supabase →
Authentication → URL Configuration diezelfde URL als Site URL, en
`https://mijnoliver.nl/auth/bevestigen` als toegestane redirect — anders komen
uitnodigings- en herstelmails op localhost uit.

## 5. Nog niet klaar om live te gaan

`risk.mijnoliver.nl` kan nog niet publiek: de app heeft geen login en bewaart
dossiers in een JSON-bestand op schijf. Zie het laatste kopje in `README.md`.
