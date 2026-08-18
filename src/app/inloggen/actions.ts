'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function inloggen(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const wachtwoord = String(formData.get('wachtwoord') ?? '')

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password: wachtwoord })

  if (error) {
    redirect(`/inloggen?fout=${encodeURIComponent('Onjuiste inloggegevens')}`)
  }

  redirect('/')
}
