import { AuthScherm } from '@/components/AuthScherm'
import { Knop, Melding, invoerClass, labelClass } from '@/components/ui'
import { stelWachtwoordIn } from './actions'

export default async function WachtwoordInstellenPagina({
  searchParams,
}: {
  searchParams: Promise<{ fout?: string }>
}) {
  const { fout } = await searchParams

  return (
    <AuthScherm titel="Account instellen">
      <form action={stelWachtwoordIn} className="flex flex-col gap-4">
        <div>
          <label className={labelClass} htmlFor="naam">
            Naam
          </label>
          <input id="naam" name="naam" type="text" autoComplete="name" className={invoerClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="wachtwoord">
            Wachtwoord
          </label>
          <input
            id="wachtwoord"
            name="wachtwoord"
            type="password"
            minLength={8}
            required
            autoComplete="new-password"
            placeholder="Minimaal 8 tekens"
            className={invoerClass}
          />
        </div>
        {fout && <Melding soort="fout">{fout}</Melding>}
        <Knop type="submit">Opslaan</Knop>
      </form>
    </AuthScherm>
  )
}
