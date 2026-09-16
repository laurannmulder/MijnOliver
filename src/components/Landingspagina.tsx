import { ArrowRight, Check } from 'lucide-react'
import { KnopLink } from './ui'
import {
  ContactBlok,
  PubliekeFooter,
  PubliekeHeader,
  Sectie,
  WerkterreinIcoon,
  WerkterreinKaart,
} from './Publiek'
import { BEDRIJFSNAAM, PRINCIPES, WERKTERREINEN, WERKWIJZE } from '@/lib/site'

/** De voorpagina van mijnoliver.nl voor bezoekers die niet zijn ingelogd. */
export function Landingspagina() {
  return (
    <>
      <PubliekeHeader />

      <main>
        <section className="border-b border-merk-rand bg-merk-vlak">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-sm font-medium text-merk-accent">{BEDRIJFSNAAM}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                Van losse gegevens naar onderbouwde beslissingen
                <span className="text-merk-accent">.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-merk-zacht sm:text-xl">
                Wij bouwen slimme tools voor professionals in verzekeringen, letselschade, energie
                en vastgoed. Zodat u minder tijd kwijt bent aan zoeken en rekenen, en meer tijd
                overhoudt voor advies.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <KnopLink href="/wat-we-doen" className="px-6 py-3.5 text-base">
                  Ontdek wat we doen
                  <ArrowRight className="size-4" aria-hidden />
                </KnopLink>
                <KnopLink href="#contact" variant="zacht" className="px-6 py-3.5 text-base">
                  Neem contact op
                </KnopLink>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4" aria-hidden>
              {WERKTERREINEN.map((terrein, i) => (
                <div
                  key={terrein.sleutel}
                  className={`rounded-2xl border border-merk-rand p-6 ${
                    i === 0 || i === 3 ? 'bg-merk text-white' : 'bg-merk-achtergrond'
                  }`}
                >
                  <WerkterreinIcoon
                    sleutel={terrein.sleutel}
                    className={`size-6 ${i === 0 || i === 3 ? 'text-white' : 'text-merk-accent'}`}
                  />
                  <p className="mt-10 text-sm font-medium leading-snug">{terrein.titel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Sectie
          label="Wat we doen"
          titel="Vier werkterreinen, één aanpak"
          intro="Elk vakgebied heeft eigen vragen en eigen bronnen. Wij bouwen per vakgebied een omgeving die precies daarop aansluit."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {WERKTERREINEN.map((terrein) => (
              <WerkterreinKaart key={terrein.sleutel} terrein={terrein} />
            ))}
          </div>
        </Sectie>

        <Sectie
          label="Waar we voor staan"
          titel="Technologie die het vakmanschap versterkt"
          className="border-y border-merk-rand bg-merk-vlak"
        >
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPES.map((principe) => (
              <div key={principe.titel}>
                <span className="flex size-8 items-center justify-center rounded-full bg-merk-accent text-white">
                  <Check className="size-4" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{principe.titel}</h3>
                <p className="mt-2 text-merk-zacht">{principe.tekst}</p>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie
          label="Werkwijze"
          titel="Zo gaat samenwerken in zijn werk"
          intro="Geen lange implementatietrajecten. U logt in op mijnoliver.nl en gaat aan de slag."
        >
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WERKWIJZE.map((stap, i) => (
              <li key={stap.titel} className="border-t-2 border-merk pt-6">
                <span className="text-sm font-medium text-merk-accent">Stap {i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{stap.titel}</h3>
                <p className="mt-2 text-merk-zacht">{stap.tekst}</p>
              </li>
            ))}
          </ol>
        </Sectie>

        <ContactBlok />
      </main>

      <PubliekeFooter />
    </>
  )
}
