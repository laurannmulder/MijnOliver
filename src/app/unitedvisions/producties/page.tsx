import type { Metadata } from 'next'
import Image from 'next/image'
import { PaginaKop } from '@/klanten/unitedvisions/components/PaginaKop'
import { CtaBand } from '@/klanten/unitedvisions/components/CtaBand'
import { producties } from '@/klanten/unitedvisions/lib/inhoud'
import eventproductions from '@/klanten/unitedvisions/beeld/eventproductions.jpg'

export const metadata: Metadata = {
  title: 'Producties',
  description: 'Een selectie van evenementen, livestreams en studioproducties van United Visions.',
}

export default function ProductiesPagina() {
  return (
    <>
      <PaginaKop
        label="Onze producties"
        titel={<>Werk dat je <span className="text-rood">voelt.</span></>}
        intro="Congressen, galadiners, buitenevents, livestreams en studio-opnames. Een selectie uit ons recente werk."
        video="producties.mp4"
        beeld={eventproductions}
      />
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {producties.map((p) => (
            <li key={p.titel} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl">
              <Image
                src={p.beeld}
                alt={p.titel}
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-zwart/90 to-transparent p-6 pt-16 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
                <p className="label text-rood">{p.soort}</p>
                <p className="mt-2 text-lg font-semibold">{p.titel}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  )
}
