import Link from 'next/link'
import { AuthScherm } from '@/components/AuthScherm'
import { Knop, invoerClass } from '@/components/ui'
import { vraagHerstelmailAan } from './actions'

export default function WachtwoordVergetenPagina() {
  return (
    <AuthScherm titel="Wachtwoord vergeten">
      <form action={vraagHerstelmailAan} className="flex flex-col gap-3">
        <p className="text-sm text-merk-zacht">
          Vul je e-mailadres in, dan sturen we een link om een nieuw wachtwoord in te stellen.
        </p>
        <input
          name="email"
          type="email"
          placeholder="E-mailadres"
          required
          autoComplete="email"
          className={invoerClass}
        />
        <Knop type="submit" className="mt-1">
          Stuur link
        </Knop>
      </form>
      <Link
        href="/inloggen"
        className="mt-4 block text-sm text-merk-zacht underline-offset-4 hover:text-merk hover:underline"
      >
        Terug naar inloggen
      </Link>
    </AuthScherm>
  )
}
