import { createClient } from './supabase/server'
import { supabaseGeconfigureerd } from './supabase/config'
import type { ToolSlug } from './tools'

export type Gebruiker = {
  id: string
  email: string
  naam: string | null
  isBeheerder: boolean
  tools: ToolSlug[]
  /**
   * Het opvragen van de toegang mislukte. Zonder dit onderscheid werd een
   * mislukte opvraging een lege lijst, en kreeg de gebruiker te horen dat hij
   * nergens toegang toe heeft — terwijl dat misschien helemaal niet zo is.
   */
  toegangOnbekend: boolean
}

/**
 * De ingelogde gebruiker met profiel en toegangen. Geeft null terug als er
 * geen sessie is; de middleware stuurt dan al door naar /inloggen, dus in een
 * pagina mag je na een null-check gerust van een geldige gebruiker uitgaan.
 */
export async function huidigeGebruiker(): Promise<Gebruiker | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const [{ data: profiel, error: profielFout }, { data: toegang, error: toegangFout }] =
    await Promise.all([
      supabase.from('profielen').select('naam, is_beheerder').eq('id', user.id).maybeSingle(),
      supabase.from('toegang').select('tool').eq('gebruiker_id', user.id),
    ])

  // Een mislukte opvraging hoort in de logs te staan, met de echte oorzaak.
  // Op het scherm alleen een neutrale melding; de details zijn voor de beheerder.
  if (profielFout !== null) console.error('Profiel ophalen mislukt:', profielFout.code, profielFout.message)
  if (toegangFout !== null) console.error('Toegang ophalen mislukt:', toegangFout.code, toegangFout.message)

  return {
    id: user.id,
    email: user.email ?? '',
    naam: profiel?.naam ?? null,
    isBeheerder: profiel?.is_beheerder ?? false,
    tools: (toegang ?? []).map((rij) => rij.tool as ToolSlug),
    toegangOnbekend: toegangFout !== null,
  }
}

/**
 * Alleen of er een sessie is, zonder profiel en toegangen op te halen. Voor de
 * publieke pagina's, die daarmee alleen de knop rechtsboven kiezen.
 */
export async function isIngelogd(): Promise<boolean> {
  if (!supabaseGeconfigureerd) return false
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user !== null
}
