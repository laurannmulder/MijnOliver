import { ArrowRight, Check, Database, Lightbulb, Rocket } from 'lucide-react'
import { KnopLink } from './ui'
import {
  ContactBlok,
  DienstKaart,
  IcoonVlak,
  MeerLink,
  PubliekeFooter,
  PubliekeHeader,
  Sectie,
  SectorRaster,
} from './Publiek'
import {
  BEDRIJFSNAAM,
  DIENSTEN,
  PRINCIPES,
  SECTOREN,
  TECHNOLOGIE,
  TOEPASSINGEN,
  WERKWIJZE,
} from '@/lib/site'

const VAN_DATA_NAAR_ACTIE = [
  {
    icoon: Database,
    titel: 'Verzamelen',
    tekst: 'Gegevens uit eigen systemen, documenten en openbare bronnen samengebracht.',
  },
  {
    icoon: Lightbulb,
    titel: 'Begrijpen',
    tekst: 'Analyses, modellen en AI die patronen, risico’s en kansen zichtbaar maken.',
  },
  {
    icoon: Rocket,
    titel: 'Handelen',
    tekst: 'Rapporten, werklijsten en adviezen waarmee uw team direct verder kan.',
  },
]

/** De voorpagina van mijnoliver.nl voor bezoekers die niet zijn ingelogd. */
export function Landingspagina() {
  return (
    <>
      <PubliekeHeader />

      <main>
        <section className="relative overflow-hidden border-b border-merk-rand bg-merk-vlak">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 sm:py-32 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-merk-rand bg-merk-achtergrond px-3 py-1 text-sm text-merk-zacht">
                <span className="size-2 rounded-full bg-merk-accent" aria-hidden />
                Data · AI · Automatisering
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
                Intelligentie die organisaties vooruit helpt
                <span className="text-merk-accent">.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-merk-zacht sm:text-xl">
                {BEDRIJFSNAAM} helpt organisaties in uiteenlopende sectoren meer uit hun gegevens
                te halen. Met data, kunstmatige intelligentie en slimme automatisering maken we
                complex werk eenvoudiger, sneller en beter te onderbouwen.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <KnopLink href="/wat-we-doen" className="px-6 py-3.5 text-base">
                  Ontdek wat we doen
                  <ArrowRight className="size-4" aria-hidden />
                </KnopLink>
                <KnopLink href="#contact" variant="zacht" className="px-6 py-3.5 text-base">
                  Plan een kennismaking
                </KnopLink>
              </div>
            </div>

            <div className="relative" aria-hidden>
              <div className="rounded-3xl bg-merk p-8 text-white shadow-2xl shadow-black/10">
                <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                  Van data naar beslissing
                </p>
                <ol className="mt-6 space-y-3">
                  {VAN_DATA_NAAR_ACTIE.map((stap, i) => (
                    <li key={stap.titel} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-merk-accent">
                        <stap.icoon className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm text-white/50">Stap {i + 1}</p>
                        <p className="font-medium">{stap.titel}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap gap-2">
                  {SECTOREN.slice(0, 8).map((sector) => (
                    <span key={sector.titel} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                      {sector.titel}
                    </span>
                  ))}
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    en meer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-merk-rand">
          <div className="mx-auto grid max-w-7xl gap-px bg-merk-rand sm:grid-cols-3">
            {VAN_DATA_NAAR_ACTIE.map((stap) => (
              <div key={stap.titel} className="bg-merk-achtergrond px-6 py-10 sm:px-8">
                <IcoonVlak item={stap} />
                <h2 className="mt-5 text-lg font-semibold tracking-tight">{stap.titel}</h2>
                <p className="mt-2 text-merk-zacht">{stap.tekst}</p>
              </div>
            ))}
          </div>
        </section>

        <Sectie
          label="Wat we doen"
          titel="Eén partner voor data, AI en automatisering"
          intro="Van het ontsluiten van gegevens tot het opleveren van een kant-en-klaar rapport: we ondersteunen de hele keten."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIENSTEN.map((dienst) => (
              <DienstKaart key={dienst.sleutel} dienst={dienst} />
            ))}
          </div>
        </Sectie>

        <Sectie
          label="Sectoren"
          titel="Toepasbaar in elke sector"
          intro="Overal waar met gegevens, documenten en berekeningen wordt gewerkt, liggen kansen. Onze aanpak werkt in de financiële wereld net zo goed als in de bouw, de zorg of de publieke sector."
          className="border-y border-merk-rand bg-merk-vlak"
        >
          <SectorRaster />
          <MeerLink href="/sectoren">Bekijk alle sectoren</MeerLink>
        </Sectie>

        <Sectie
          label="Technologie"
          titel="Moderne technologie, praktisch toegepast"
          intro="We zetten de nieuwste technieken in waar ze aantoonbaar waarde toevoegen, en houden het eenvoudig in gebruik."
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
          titel="Een greep uit de toepassingen"
          intro="Enkele voorbeelden van vraagstukken waarvoor onze technologie al wordt ingezet."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {TOEPASSINGEN.map((toepassing, i) => (
              <div key={toepassing.titel} className="flex gap-5 rounded-2xl border border-merk-rand bg-merk-vlak p-8">
                <span className="text-3xl font-semibold text-merk-accent/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{toepassing.titel}</h3>
                  <p className="mt-2 text-merk-zacht">{toepassing.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie
          label="Waar we voor staan"
          titel="Technologie die vakmanschap versterkt"
          className="border-y border-merk-rand bg-merk-vlak"
        >
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPES.map((principe) => (
              <div key={principe.titel}>
                <span className="flex size-9 items-center justify-center rounded-full bg-merk-accent text-white">
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
          titel="Van vraagstuk naar werkende oplossing"
          intro="Geen lange implementatietrajecten, maar stap voor stap naar resultaat."
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
