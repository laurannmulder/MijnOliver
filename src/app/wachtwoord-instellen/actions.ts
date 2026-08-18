'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function stelWachtwoordIn(formData: FormData) {
  const wachtwoord = String(formData.get('wachtwoord') ?? '')
  const naam = String(formData.get('naam') ?? '').trim()

  if (wachtwoord.length < 8) {
    redirect(
      `/wachtwoord-instellen?fout=${encodeURIComponent('Wachtwoord moet minimaal 8 tekens zijn')}`
    )
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/inloggen?fout=${encodeURIComponent('Je sessie is verlopen — log opnieuw in')}`)
  }

  const { error } = await supabase.auth.updateUser({ password: wachtwoord })

  if (error) {
    redirect(`/wachtwoord-instellen?fout=${encodeURIComponent(error.message)}`)
  }

  if (naam) {
    await supabase.from('profielen').update({ naam }).eq('id', user.id)
  }

  redirect('/')
}
