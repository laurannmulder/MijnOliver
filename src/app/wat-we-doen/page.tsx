import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import {
  ContactBlok,
  PubliekeFooter,
  PubliekeHeader,
  Sectie,
  WerkterreinIcoon,
} from '@/components/Publiek'
import { supabaseGeconfigureerd } from '@/lib/supabase/config'
import { createClient } from '@/lib/supabase/server'
import { BEDRIJFSNAAM, PRINCIPES, VRAGEN, WERKTERREINEN, WERKWIJZE } from '@/lib/site'

export const metadata: Metadata = {
  title: `Wat we doen | ${BEDRIJFSNAAM}`,
  description:
    'Oliver Intelligence bouwt tools voor bedrijfsschade, letselschade, energie en vastgoed, en marktinzicht op basis van bedrijfsgegevens.',
}

export default async function WatWeDoenPagina() {
  let ingelogd = false
  if (supabaseGeconfigureerd) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    ingelogd = data.user !== null
  }

  return (
    <>
      <PubliekeHeader ingelogd={ingelogd} />

      <main>
        <section className="border-b border-merk-rand bg-merk-vlak">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <p className="text-sm font-medium text-merk-accent">Wat we doen</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Wij maken complex rekenwerk en dossierwerk overzichtelijk
            </h1>
            <div className="mt-8 grid max-w-4xl gap-6 text-lg text-merk-zacht md:grid-cols-2">
              <p>
                {BEDRIJFSNAAM} ontwikkelt online tools voor professionals die dagelijks werken met
                jaarcijfers, dossiers en openbare registers. Denk aan adviseurs, deskundigen en
                commerciële teams.
              </p>
              <p>
                We combineren kennis van het vakgebied met data en slimme automatisering. Het
                resultaat: minder handwerk, uitkomsten die u kunt onderbouwen en meer tijd voor
                het gesprek met uw klant.
              </p>
            </div>

            <nav className="mt-12 flex flex-wrap gap-3" aria-label="Werkterreinen">
              {WERKTERREINEN.map((terrein) => (
                <a
                  key={terrein.sleutel}
                  href={`#${terrein.sleutel}`}
                  className="inline-flex items-center gap-2 rounded-full border border-merk-rand bg-merk-achtergrond px-4 py-2 text-sm hover:border-merk-accent"
                >
                  <WerkterreinIcoon sleutel={terrein.sleutel} className="size-4 text-merk-accent" />
                  {terrein.titel}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {WERKTERREINEN.map((terrein, i) => (
          <section
            key={terrein.sleutel}
            id={terrein.sleutel}
            className={`scroll-mt-20 py-20 sm:py-24 ${i % 2 === 1 ? 'border-y border-merk-rand bg-merk-vlak' : ''}`}
          >
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-merk-accent/10 text-merk-accent">
                    <WerkterreinIcoon sleutel={terrein.sleutel} className="size-5" />
                  </span>
                  <span className="text-sm font-medium text-merk-zacht">
                    Werkterrein {i + 1} van {WERKTERREINEN.length}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {terrein.titel}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-merk-zacht">{terrein.lang}</p>
                <p className="mt-6 text-sm">
                  <span className="font-medium">Voor wie: </span>
                  <span className="text-merk-zacht">{terrein.voorWie}</span>
                </p>
              </div>
              <div className="self-start rounded-2xl border border-merk-rand bg-merk-achtergrond p-8">
                <h3 className="text-sm font-medium uppercase tracking-widest text-merk-zacht">
                  Wat u ermee kunt
                </h3>
                <ul className="mt-6 space-y-4">
                  {terrein.punten.map((punt) => (
                    <li key={punt} className="flex gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-merk-accent" aria-hidden />
                      <span>{punt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <Sectie
          label="Onze principes"
          titel="Hoe we bouwen"
          className="border-t border-merk-rand bg-merk text-white [&_p]:text-white/70"
        >
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {PRINCIPES.map((principe) => (
              <div key={principe.titel} className="border-l-2 border-merk-accent pl-6">
                <h3 className="text-xl font-semibold tracking-tight text-white">{principe.titel}</h3>
                <p className="mt-2">{principe.tekst}</p>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie
          id="werkwijze"
          label="Werkwijze"
          titel="Van eerste gesprek tot dagelijks gebruik"
        >
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WERKWIJZE.map((stap, i) => (
              <li key={stap.titel} className="rounded-2xl border border-merk-rand bg-merk-vlak p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-merk text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{stap.titel}</h3>
                <p className="mt-2 text-merk-zacht">{stap.tekst}</p>
              </li>
            ))}
          </ol>
        </Sectie>

        <Sectie
          label="Veelgestelde vragen"
          titel="Goed om te weten"
          className="border-t border-merk-rand bg-merk-vlak"
        >
          <div className="max-w-3xl divide-y divide-merk-rand border-y border-merk-rand">
            {VRAGEN.map((item) => (
              <details key={item.vraag} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                  {item.vraag}
                  <span className="text-2xl leading-none text-merk-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-merk-zacht">{item.antwoord}</p>
              </details>
            ))}
          </div>
        </Sectie>

        <ContactBlok />
      </main>

      <PubliekeFooter />
    </>
  )
}
