/**
 * Zonder Supabase-omgevingsvariabelen kan er niets ingelogd worden. In plaats
 * van een stacktrace bij elke request tonen we dan één duidelijk instelscherm
 * — handig bij een verse checkout of een deploy waar de env nog niet staat.
 */
export const supabaseGeconfigureerd = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
