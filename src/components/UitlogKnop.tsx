'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function UitlogKnop() {
  const router = useRouter()
  const [bezig, setBezig] = useState(false)

  async function uitloggen() {
    setBezig(true)
    await createClient().auth.signOut()
    router.refresh()
    router.push('/inloggen')
  }

  return (
    <button
      onClick={uitloggen}
      disabled={bezig}
      className="text-merk-zacht hover:text-merk disabled:opacity-50"
    >
      Uitloggen
    </button>
  )
}
