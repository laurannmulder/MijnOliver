import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { BeheerFotos } from '@/klanten/unitedvisions/components/BeheerFotos'
import { haalProductiesVers } from '@/klanten/unitedvisions/lib/opslag'
import { huidigeGebruiker } from '@/lib/gebruiker'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

export const metadata: Metadata = { title: 'Beheer', robots: { index: false, follow: false } }

// De beheerpagina mag nooit uit de cache komen: hij toont de actuele lijst.
export const dynamic = 'force-dynamic'

export default async function BeheerPagina() {
  const gebruiker = await huidigeGebruiker()
  if (!gebruiker) redirect('/inloggen')

  if (!gebruiker.isBeheerder) {
    return (
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-36 sm:px-8">
        <h1 className="kop text-4xl">Geen toegang</h1>
        <p className="mt-4 text-zacht">
          Dit account mag de website niet beheren. Vraag de beheerder van {`${'MijnOliver'}`} om toegang.
        </p>
      </section>
    )
  }

  const items = await haalProductiesVers()

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-8 sm:pt-36">
      <p className="label text-rood">Beheer</p>
      <h1 className="kop mt-4 text-[clamp(2rem,7vw,3.5rem)]">Foto’s bij producties</h1>
      <p className="mt-4 max-w-2xl text-zacht">
        Wat u hier aanpast, staat meteen op{' '}
        <a href={`${BASIS}/producties`} className="text-white underline underline-offset-4 hover:text-rood">
          de productiepagina
        </a>{' '}
        en op de homepage. De bovenste foto’s staan vooraan.
      </p>

      <div className="mt-12">
        <BeheerFotos items={items} />
      </div>
    </section>
  )
}
