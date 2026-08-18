import { createClient } from './supabase/server'
import type { ToolSlug } from './tools'

export type Gebruiker = {
  id: string
  email: string
  naam: string | null
  isBeheerder: boolean
  tools: ToolSlug[]
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

  const [{ data: profiel }, { data: toegang }] = await Promise.all([
    supabase.from('profielen').select('naam, is_beheerder').eq('id', user.id).maybeSingle(),
    supabase.from('toegang').select('tool').eq('gebruiker_id', user.id),
  ])

  return {
    id: user.id,
    email: user.email ?? '',
    naam: profiel?.naam ?? null,
    isBeheerder: profiel?.is_beheerder ?? false,
    tools: (toegang ?? []).map((rij) => rij.tool as ToolSlug),
  }
}
