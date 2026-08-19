import { redirect } from 'next/navigation'
import { AuthScherm } from '@/components/AuthScherm'
import { Knop, Melding, invoerClass, labelClass } from '@/components/ui'
import { huidigeGebruiker } from '@/lib/gebruiker'
import { stelWachtwoordIn } from './actions'

export default async function WachtwoordInstellenPagina({
  searchParams,
}: {
  searchParams: Promise<{ fout?: string }>
}) {
  const { fout } = await searchParams
  const gebruiker = await huidigeGebruiker()

  // Zonder geldige sessie is dit formulier zinloos: de opslaanactie zou toch
  // afketsen. Meteen terugsturen scheelt de gebruiker een ingevuld formulier
  // dat daarna alsnog weggegooid wordt.
  if (!gebruiker) {
    redirect(
      `/inloggen?fout=${encodeURIComponent('Deze link is verlopen — vraag een nieuwe aan via "Wachtwoord vergeten?"')}`
    )
  }

  // De naam vragen we alleen bij een nieuw account. Wie alleen zijn wachtwoord
  // kwijt is, heeft die al ingevuld en wordt er terecht niet nog eens naar
  // gevraagd.
  const naamOnbekend = !gebruiker.naam

  return (
    <AuthScherm titel={naamOnbekend ? 'Account instellen' : 'Nieuw wachtwoord kiezen'}>
      <p className="mb-4 text-sm text-merk-zacht">
        Je bent ingelogd als {gebruiker.email}.
      </p>
      <form action={stelWachtwoordIn} className="flex flex-col gap-4">
        {naamOnbekend && (
          <div>
            <label className={labelClass} htmlFor="naam">
              Naam
            </label>
            <input id="naam" name="naam" type="text" autoComplete="name" className={invoerClass} />
          </div>
        )}
        <div>
          <label className={labelClass} htmlFor="wachtwoord">
            {naamOnbekend ? 'Wachtwoord' : 'Nieuw wachtwoord'}
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
