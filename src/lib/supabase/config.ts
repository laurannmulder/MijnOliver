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
