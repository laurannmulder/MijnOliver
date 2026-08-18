'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { huidigeGebruiker } from '@/lib/gebruiker'
import { TOOLS, type ToolSlug } from '@/lib/tools'

/**
 * Elke actie hier draait met de service-role client, die RLS omzeilt. De
 * beheerderscontrole moet dus in de code staan: een server action is een
 * gewoon HTTP-endpoint dat elke ingelogde gebruiker kan aanroepen.
 */
async function vereistBeheerder() {
  const gebruiker = await huidigeGebruiker()
  if (!gebruiker) redirect('/inloggen')
  if (!gebruiker.isBeheerder) redirect('/')
  return gebruiker
}

function gekozenTools(formData: FormData): ToolSlug[] {
  return TOOLS.map((tool) => tool.slug).filter((slug) => formData.get(`tool-${slug}`) === 'aan')
}

async function zetToegang(gebruikerId: string, tools: ToolSlug[]) {
  const supabase = createAdminClient()

  await supabase.from('toegang').delete().eq('gebruiker_id', gebruikerId)

  if (tools.length > 0) {
    await supabase
      .from('toegang')
      .insert(tools.map((tool) => ({ gebruiker_id: gebruikerId, tool })))
  }
}

export async function nodigUit(formData: FormData) {
  await vereistBeheerder()

  const email = String(formData.get('email') ?? '').trim()
  if (!email) {
    redirect(`/admin/gebruikers?fout=${encodeURIComponent('E-mailadres is verplicht')}`)
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/bevestigen?next=/wachtwoord-instellen`,
  })

  if (error) {
    redirect(`/admin/gebruikers?fout=${encodeURIComponent(error.message)}`)
  }

  const tools = gekozenTools(formData)
  if (data.user && tools.length > 0) {
    await zetToegang(data.user.id, tools)
  }

  revalidatePath('/admin/gebruikers')
  redirect(`/admin/gebruikers?melding=${encodeURIComponent(`Uitnodiging verstuurd naar ${email}`)}`)
}

export async function werkGebruikerBij(formData: FormData) {
  const beheerder = await vereistBeheerder()

  const gebruikerId = String(formData.get('gebruikerId') ?? '')
  if (!gebruikerId) redirect('/admin/gebruikers')

  const wilBeheerder = formData.get('is_beheerder') === 'aan'

  // Voorkom dat de laatste beheerder zichzelf buitensluit: zonder beheerder is
  // er geen enkele manier meer om via de app toegang te herstellen.
  if (gebruikerId === beheerder.id && !wilBeheerder) {
    redirect(
      `/admin/gebruikers?fout=${encodeURIComponent('Je kunt je eigen beheerdersrecht niet intrekken')}`
    )
  }

  const supabase = createAdminClient()
  await supabase.from('profielen').update({ is_beheerder: wilBeheerder }).eq('id', gebruikerId)
  await zetToegang(gebruikerId, gekozenTools(formData))

  revalidatePath('/admin/gebruikers')
  redirect(`/admin/gebruikers?melding=${encodeURIComponent('Wijzigingen opgeslagen')}`)
}

export async function verwijderGebruiker(formData: FormData) {
  const beheerder = await vereistBeheerder()

  const gebruikerId = String(formData.get('gebruikerId') ?? '')

  if (gebruikerId === beheerder.id) {
    redirect(`/admin/gebruikers?fout=${encodeURIComponent('Je kunt jezelf niet verwijderen')}`)
  }

  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.deleteUser(gebruikerId)

  if (error) {
    redirect(`/admin/gebruikers?fout=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/gebruikers')
  redirect(`/admin/gebruikers?melding=${encodeURIComponent('Gebruiker verwijderd')}`)
}
