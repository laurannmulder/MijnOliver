'use server'

import { redirect } from 'next/navigation'
import { type EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

/**
 * De token wordt hier pas verzilverd — achter een echte klik, niet op de GET
 * die de e-maillink oplevert. Mailscanners (Microsoft Safe Links en soortgelijke)
 * bezoeken die GET automatisch en zouden de eenmalige token opbranden voordat
 * de mens erop klikt. Dit is in het BeterBedrijfskundig-project daadwerkelijk
 * misgegaan; vandaar deze tussenpagina.
 */
export async function bevestig(formData: FormData) {
  const token_hash = String(formData.get('token_hash') ?? '')
  const type = formData.get('type') as EmailOtpType | null
  const next = String(formData.get('next') ?? '/wachtwoord-instellen')

  if (!token_hash || !type) {
    redirect(`/inloggen?fout=${encodeURIComponent('Link is ongeldig of verlopen')}`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({ type, token_hash })

  if (error) {
    redirect(
      `/inloggen?fout=${encodeURIComponent('Link is al gebruikt of verlopen — vraag een nieuwe aan')}`
    )
  }

  redirect(next)
}
