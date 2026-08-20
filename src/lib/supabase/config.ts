/**
 * Zonder Supabase-omgevingsvariabelen kan er niets ingelogd worden. In plaats
 * van een stacktrace bij elke request tonen we dan één duidelijk instelscherm
 * — handig bij een verse checkout of een deploy waar de env nog niet staat.
 */
export const supabaseGeconfigureerd = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * Alleen het gebruikersbeheer heeft de service-role key nodig. De rest van de
 * app werkt zonder, dus dit wordt apart gecontroleerd op de plek die hem echt
 * gebruikt in plaats van bij het opstarten.
 */
export const serviceKeyAanwezig = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)

/**
 * Het cookiedomein bepaalt of één sessie geldt op mijnoliver.nl én op de
 * subdomeinen risk. en bb. Zonder Domain-attribuut is een cookie host-only en
 * stuurt de browser hem niet mee naar een subdomein — dan moet je per omgeving
 * opnieuw inloggen.
 *
 * In productie hoort hier `.mijnoliver.nl` te staan, en exact dezelfde waarde
 * bij elke tool. Lokaal blijft dit leeg: op localhost weigert de browser zo'n
 * cookie, en poorten delen daar toch al hun cookies.
 *
 * Let op: dit moet ook bij `createBrowserClient` staan. De uitlogknop draait in
 * de browser, en een cookie die met een Domain is gezet wordt niet verwijderd
 * door een poging zonder dat Domain — uitloggen zou dan stilletjes mislukken.
 */
export const cookieDomein = process.env.NEXT_PUBLIC_COOKIE_DOMAIN?.trim() || undefined

export const cookieOpties = cookieDomein === undefined ? {} : { domain: cookieDomein }
