import type { Metadata } from 'next'
import {
  ContactBlok,
  DienstKaart,
  PaginaKop,
  PubliekeFooter,
  PubliekeHeader,
  Sectie,
  SectorRaster,
} from '@/components/Publiek'
import { isIngelogd } from '@/lib/gebruiker'
import { BEDRIJFSNAAM, DIENSTEN } from '@/lib/site'

export const metadata: Metadata = {
  title: `Sectoren | ${BEDRIJFSNAAM}`,
  description:
    'De aanpak van Oliver Intelligence is toepasbaar in elke sector waar met gegevens, documenten en berekeningen wordt gewerkt.',
}

const UITDAGINGEN = [
  {
    titel: 'Informatie zit verspreid',
    tekst: 'Gegevens staan in losse systemen, mappen en spreadsheets, en niemand heeft het totaalbeeld.',
  },
  {
    titel: 'Veel handwerk',
    tekst: 'Specialisten besteden een groot deel van hun tijd aan zoeken, overtypen en controleren.',
  },
  {
    titel: 'Lastig te onderbouwen',
    tekst: 'Uitkomsten verschillen per medewerker en zijn achteraf moeilijk te verantwoorden.',
  },
  {
    titel: 'Kansen blijven liggen',
    tekst: 'Zonder goed zicht op de markt gaat commerciële tijd naar de verkeerde partijen.',
  },
]

export default async function SectorenPagina() {
  const ingelogd = await isIngelogd()

  return (
    <>
      <PubliekeHeader ingelogd={ingelogd} />

      <main>
        <PaginaKop label="Sectoren" titel="Eén aanpak, toepasbaar in elke sector">
          <p className="mt-8 max-w-3xl text-lg text-merk-zacht sm:text-xl">
            Of u nu werkt in de financiële dienstverlening, de bouw, de zorg of bij de overheid: de
            vraagstukken rond gegevens lijken sterk op elkaar. Daarom werkt onze aanpak in vrijwel
            elke sector, en vertalen we die telkens naar de taal en regels van uw vakgebied.
          </p>
        </PaginaKop>

        <Sectie
          label="Waar we actief kunnen zijn"
          titel="Sectoren"
          intro="Een overzicht van sectoren waarin onze oplossingen waarde toevoegen. Staat die van u er niet bij? Neem gerust contact op."
        >
          <SectorRaster metOmschrijving />
        </Sectie>

        <Sectie
          label="Herkenbaar?"
          titel="Uitdagingen die we in elke sector tegenkomen"
          className="border-y border-merk-rand bg-merk-vlak"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {UITDAGINGEN.map((uitdaging, i) => (
              <div key={uitdaging.titel} className="border-t-2 border-merk-accent pt-6">
                <span className="text-sm font-medium text-merk-zacht">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{uitdaging.titel}</h3>
                <p className="mt-2 text-merk-zacht">{uitdaging.tekst}</p>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie
          label="Oplossingen"
          titel="Wat we voor uw sector kunnen doen"
          intro="Dezelfde bouwstenen, steeds afgestemd op uw vakgebied."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIENSTEN.map((dienst) => (
              <DienstKaart key={dienst.sleutel} dienst={dienst} />
            ))}
          </div>
        </Sectie>

        <ContactBlok />
      </main>

      <PubliekeFooter />
    </>
  )
}
