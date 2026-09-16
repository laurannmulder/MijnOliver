import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import {
  ContactBlok,
  IcoonVlak,
  MeerLink,
  PaginaKop,
  PubliekeFooter,
  PubliekeHeader,
  Sectie,
} from '@/components/Publiek'
import { isIngelogd } from '@/lib/gebruiker'
import {
  BEDRIJFSNAAM,
  DIENSTEN,
  PRINCIPES,
  TECHNOLOGIE,
  TOEPASSINGEN,
  VRAGEN,
  WERKWIJZE,
} from '@/lib/site'

export const metadata: Metadata = {
  title: `Wat we doen | ${BEDRIJFSNAAM}`,
  description:
    'Oliver Intelligence helpt organisaties met data-integratie, analyse, slimme documentverwerking, rekenmodellen, automatische rapportage en marktinzicht.',
}

export default async function WatWeDoenPagina() {
  const ingelogd = await isIngelogd()

  return (
    <>
      <PubliekeHeader ingelogd={ingelogd} />

      <main>
        <PaginaKop label="Wat we doen" titel="Wij maken van gegevens een voorsprong">
          <div className="mt-10 grid max-w-5xl gap-6 text-lg text-merk-zacht md:grid-cols-2">
            <p>
              {BEDRIJFSNAAM} is een technologiepartner voor organisaties die meer willen halen uit
              hun informatie. We combineren data, kunstmatige intelligentie en automatisering met
              een scherp oog voor hoe het werk in de praktijk verloopt.
            </p>
            <p>
              Het resultaat: minder handwerk, snellere doorlooptijden en beslissingen die u kunt
              onderbouwen. Of het nu gaat om het doorrekenen van risico’s, het verwerken van
              dossiers of het vinden van nieuwe klanten.
            </p>
          </div>

          <nav className="mt-12 flex flex-wrap gap-3" aria-label="Diensten">
            {DIENSTEN.map((dienst) => (
              <a
                key={dienst.sleutel}
                href={`#${dienst.sleutel}`}
                className="inline-flex items-center gap-2 rounded-full border border-merk-rand bg-merk-achtergrond px-4 py-2 text-sm hover:border-merk-accent"
              >
                <dienst.icoon className="size-4 text-merk-accent" aria-hidden />
                {dienst.titel}
              </a>
            ))}
          </nav>
        </PaginaKop>

        {DIENSTEN.map((dienst, i) => (
          <section
            key={dienst.sleutel}
            id={dienst.sleutel}
            className={`scroll-mt-20 py-20 sm:py-24 ${i % 2 === 1 ? 'border-y border-merk-rand bg-merk-vlak' : ''}`}
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <IcoonVlak item={dienst} groot />
                  <span className="text-sm font-medium text-merk-zacht">
                    {String(i + 1).padStart(2, '0')} / {String(DIENSTEN.length).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">{dienst.titel}</h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-merk-zacht">{dienst.lang}</p>
              </div>
              <div className="self-center rounded-2xl border border-merk-rand bg-merk-achtergrond p-8">
                <h3 className="text-sm font-medium uppercase tracking-widest text-merk-zacht">
                  Wat het u oplevert
                </h3>
                <ul className="mt-6 space-y-4">
                  {dienst.punten.map((punt) => (
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
          label="Technologie"
          titel="De bouwstenen achter onze oplossingen"
          donker
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TECHNOLOGIE.map((item) => (
              <div key={item.titel} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <item.icoon className="size-7 text-merk-accent" aria-hidden />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.titel}</h3>
                <p className="mt-2 text-white/70">{item.tekst}</p>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie
          label="In de praktijk"
          titel="Voorbeelden van toepassingen"
          intro="Een greep uit de vraagstukken waarvoor onze technologie al wordt ingezet. En de lijst groeit."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {TOEPASSINGEN.map((toepassing) => (
              <div key={toepassing.titel} className="rounded-2xl border border-merk-rand bg-merk-vlak p-8">
                <h3 className="text-xl font-semibold tracking-tight">{toepassing.titel}</h3>
                <p className="mt-2 text-merk-zacht">{toepassing.tekst}</p>
              </div>
            ))}
          </div>
          <MeerLink href="/sectoren">Bekijk de sectoren waarin dit toepasbaar is</MeerLink>
        </Sectie>

        <Sectie
          label="Onze principes"
          titel="Hoe we werken"
          className="border-y border-merk-rand bg-merk-vlak"
        >
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {PRINCIPES.map((principe) => (
              <div key={principe.titel} className="flex gap-5">
                <IcoonVlak item={principe} groot />
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{principe.titel}</h3>
                  <p className="mt-2 text-merk-zacht">{principe.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie id="werkwijze" label="Werkwijze" titel="Van eerste gesprek tot dagelijks gebruik">
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WERKWIJZE.map((stap, i) => (
              <li key={stap.titel} className="rounded-2xl border border-merk-rand bg-merk-vlak p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-merk text-sm font-semibold text-white">
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
