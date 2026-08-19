'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function inloggen(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const wachtwoord = String(formData.get('wachtwoord') ?? '')

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password: wachtwoord })

  if (error) {
    // De gebruiker krijgt bewust een neutrale melding — die mag niet verklappen
    // of een e-mailadres bestaat. Maar de échte fout hoort wel in de
    // serverlogs: een kapotte API-sleutel gaf hier maandenlang "onjuiste
    // inloggegevens", wat het probleem urenlang verborg.
    console.error('Inloggen mislukt:', error.status, error.message)
    redirect(`/inloggen?fout=${encodeURIComponent('Onjuiste inloggegevens')}`)
  }

  redirect('/')
}
