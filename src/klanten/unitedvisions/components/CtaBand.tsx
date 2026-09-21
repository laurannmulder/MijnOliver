import Image from 'next/image'
import { VideoAchtergrond } from './VideoAchtergrond'
import { Knop } from './Knop'
import { bedrijf } from '@/klanten/unitedvisions/lib/inhoud'
import kerkDiner from '@/klanten/unitedvisions/beeld/kerk-diner.jpg'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={kerkDiner} alt="" fill sizes="100vw" placeholder="blur" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10"><VideoAchtergrond bestand="presentatorconfetti.mp4" /></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zwart via-zwart/85 to-zwart/30" />
      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8 sm:py-36">
        <p className="label text-rood">Uw project</p>
        <h2 className="kop mt-5 max-w-3xl text-[clamp(2rem,8.5vw,3.75rem)]">
          Wij maken het <span className="text-rood">onvergetelijk.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-white/75">
          Met creatieve ideeën, innovatie en vastberadenheid. Vertel ons wat u van plan bent, dan denken we direct met u mee.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Knop href={`${BASIS}/contact`}>Offerte aanvragen</Knop>
          <Knop href={`tel:${bedrijf.telefoonLink}`} variant="rand">Bel {bedrijf.telefoon}</Knop>
        </div>
      </div>
    </section>
  )
}
