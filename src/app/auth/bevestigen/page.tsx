import { AuthScherm } from '@/components/AuthScherm'
import { Knop, Melding } from '@/components/ui'
import { bevestig } from './actions'

export default async function BevestigenPagina({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; type?: string; next?: string }>
}) {
  const { token_hash, type, next } = await searchParams

  if (!token_hash || !type) {
    return (
      <AuthScherm titel="Link ongeldig">
        <Melding soort="fout">Deze link is ongeldig of verlopen.</Melding>
      </AuthScherm>
    )
  }

  return (
    <AuthScherm titel="Bevestigen">
      <p className="mb-4 text-sm text-merk-zacht">
        Klik op de knop om door te gaan naar MijnOliver.
      </p>
      <form action={bevestig}>
        <input type="hidden" name="token_hash" value={token_hash} />
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="next" value={next ?? '/wachtwoord-instellen'} />
        <Knop type="submit" className="w-full">
          Doorgaan
        </Knop>
      </form>
    </AuthScherm>
  )
}
