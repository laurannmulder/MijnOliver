'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function vraagHerstelmailAan(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()

  const supabase = await createClient()
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/bevestigen?next=/wachtwoord-instellen`,
  })

  // Bewust altijd dezelfde melding, ook als het adres niet bestaat: anders is
  // dit formulier een manier om te achterhalen wie er een account heeft.
  redirect(
    `/inloggen?melding=${encodeURIComponent('Als dit adres bekend is, is er een e-mail onderweg.')}`
  )
}
