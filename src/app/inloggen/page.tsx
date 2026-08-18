import Link from 'next/link'
import { AuthScherm } from '@/components/AuthScherm'
import { Instelscherm } from '@/components/Instelscherm'
import { supabaseGeconfigureerd } from '@/lib/supabase/config'
import { Knop, Melding, invoerClass } from '@/components/ui'
import { inloggen } from './actions'

export default async function InloggenPagina({
  searchParams,
}: {
  searchParams: Promise<{ fout?: string; melding?: string }>
}) {
  if (!supabaseGeconfigureerd) return <Instelscherm />

  const { fout, melding } = await searchParams

  return (
    <AuthScherm titel="Inloggen">
      <form action={inloggen} className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          placeholder="E-mailadres"
          required
          autoComplete="email"
          className={invoerClass}
        />
        <input
          name="wachtwoord"
          type="password"
          placeholder="Wachtwoord"
          required
          autoComplete="current-password"
          className={invoerClass}
        />
        {fout && <Melding soort="fout">{fout}</Melding>}
        {melding && <Melding soort="gelukt">{melding}</Melding>}
        <Knop type="submit" className="mt-1">
          Inloggen
        </Knop>
      </form>
      <Link
        href="/wachtwoord-vergeten"
        className="mt-4 block text-sm text-merk-zacht underline-offset-4 hover:text-merk hover:underline"
      >
        Wachtwoord vergeten?
      </Link>
    </AuthScherm>
  )
}
