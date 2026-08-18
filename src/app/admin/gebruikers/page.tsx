import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'
import { Kaart, Knop, Melding, invoerClass, labelClass } from '@/components/ui'
import { huidigeGebruiker } from '@/lib/gebruiker'
import { createAdminClient } from '@/lib/supabase/admin'
import { serviceKeyAanwezig } from '@/lib/supabase/config'
import { TOOLS, type ToolSlug } from '@/lib/tools'
import { nodigUit, verwijderGebruiker, werkGebruikerBij } from './actions'
import { VerwijderKnop } from './verwijder-knop'

type Rij = {
  id: string
  email: string
  naam: string | null
  isBeheerder: boolean
  tools: ToolSlug[]
  bevestigd: boolean
}

async function haalGebruikers(): Promise<Rij[]> {
  const supabase = createAdminClient()

  const [{ data: authData }, { data: profielen }, { data: toegang }] = await Promise.all([
    supabase.auth.admin.listUsers({ perPage: 200 }),
    supabase.from('profielen').select('id, naam, is_beheerder'),
    supabase.from('toegang').select('gebruiker_id, tool'),
  ])

  const profielPerId = new Map((profielen ?? []).map((p) => [p.id as string, p]))
  const toolsPerId = new Map<string, ToolSlug[]>()
  for (const rij of toegang ?? []) {
    const lijst = toolsPerId.get(rij.gebruiker_id) ?? []
    lijst.push(rij.tool as ToolSlug)
    toolsPerId.set(rij.gebruiker_id, lijst)
  }

  return (authData?.users ?? []).map((user) => ({
    id: user.id,
    email: user.email ?? '',
    naam: (profielPerId.get(user.id)?.naam as string | null) ?? null,
    isBeheerder: Boolean(profielPerId.get(user.id)?.is_beheerder),
    tools: toolsPerId.get(user.id) ?? [],
    bevestigd: Boolean(user.last_sign_in_at),
  }))
}

export default async function GebruikersPagina({
  searchParams,
}: {
  searchParams: Promise<{ fout?: string; melding?: string }>
}) {
  const gebruiker = await huidigeGebruiker()
  if (!gebruiker) redirect('/inloggen')
  if (!gebruiker.isBeheerder) redirect('/')

  const { fout, melding } = await searchParams

  // Zonder service-role key kan deze pagina geen gebruikers ophalen of
  // uitnodigen; zeg dat, in plaats van te klappen in de Supabase-client.
  if (!serviceKeyAanwezig) {
    return (
      <>
        <Header email={gebruiker.email} isBeheerder={gebruiker.isBeheerder} />
        <main className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-2xl font-semibold tracking-tight">Gebruikers</h1>
          <div className="mt-6">
            <Melding soort="fout">
              <code>SUPABASE_SERVICE_ROLE_KEY</code> ontbreekt in de omgevingsvariabelen. Zet de
              secret key (of service_role key) uit Supabase → Settings → API Keys in{' '}
              <code>.env.local</code> en start de server opnieuw.
            </Melding>
          </div>
        </main>
      </>
    )
  }

  const rijen = await haalGebruikers()

  return (
    <>
      <Header email={gebruiker.email} isBeheerder={gebruiker.isBeheerder} />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">Gebruikers</h1>
        <p className="mt-2 text-sm text-merk-zacht">
          Nodig mensen uit en bepaal welke omgevingen zij zien.
        </p>

        {fout && (
          <div className="mt-6">
            <Melding soort="fout">{fout}</Melding>
          </div>
        )}
        {melding && (
          <div className="mt-6">
            <Melding soort="gelukt">{melding}</Melding>
          </div>
        )}

        <Kaart className="mt-6">
          <h2 className="font-medium">Nieuwe gebruiker uitnodigen</h2>
          <form action={nodigUit} className="mt-4 flex flex-wrap items-end gap-4">
            <div className="min-w-64 grow">
              <label className={labelClass} htmlFor="email">
                E-mailadres
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="naam@voorbeeld.nl"
                className={invoerClass}
              />
            </div>
            <fieldset className="flex items-center gap-4 pb-2.5">
              <legend className="sr-only">Toegang</legend>
              {TOOLS.map((tool) => (
                <label key={tool.slug} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name={`tool-${tool.slug}`} value="aan" className="size-4" />
                  {tool.naam}
                </label>
              ))}
            </fieldset>
            <Knop type="submit">Uitnodigen</Knop>
          </form>
        </Kaart>

        <div className="mt-8 space-y-3">
          {rijen.map((rij) => (
            <Kaart key={rij.id}>
              <form action={werkGebruikerBij} className="flex flex-wrap items-end gap-x-6 gap-y-4">
                <input type="hidden" name="gebruikerId" value={rij.id} />

                <div className="min-w-56 grow">
                  <p className="font-medium">{rij.naam ?? rij.email}</p>
                  <p className="text-sm text-merk-zacht">
                    {rij.naam ? `${rij.email} · ` : ''}
                    {rij.bevestigd ? 'actief' : 'uitgenodigd, nog niet ingelogd'}
                  </p>
                </div>

                <fieldset className="flex items-center gap-4">
                  <legend className="sr-only">Toegang</legend>
                  {TOOLS.map((tool) => (
                    <label key={tool.slug} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name={`tool-${tool.slug}`}
                        value="aan"
                        defaultChecked={rij.tools.includes(tool.slug)}
                        className="size-4"
                      />
                      {tool.naam}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="is_beheerder"
                      value="aan"
                      defaultChecked={rij.isBeheerder}
                      className="size-4"
                    />
                    Beheerder
                  </label>
                </fieldset>

                <Knop type="submit" variant="zacht">
                  Opslaan
                </Knop>
              </form>

              {rij.id !== gebruiker.id && (
                <form action={verwijderGebruiker} className="mt-3">
                  <input type="hidden" name="gebruikerId" value={rij.id} />
                  <VerwijderKnop naam={rij.naam ?? rij.email} />
                </form>
              )}
            </Kaart>
          ))}
        </div>
      </main>
    </>
  )
}
