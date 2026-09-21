import type { Metadata } from 'next'
import Image from 'next/image'
import { PaginaKop } from '@/klanten/unitedvisions/components/PaginaKop'
import { CtaBand } from '@/klanten/unitedvisions/components/CtaBand'
import { team, disciplines } from '@/klanten/unitedvisions/lib/inhoud'
import kerkRegie from '@/klanten/unitedvisions/beeld/kerk-regie.jpg'

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Maak kennis met het team van United Visions uit Groningen.',
}

export default function OverOnsPagina() {
  return (
    <>
      <PaginaKop
        label="Over ons"
        titel={<>Altijd <span className="text-rood">onderweg.</span></>}
        intro="United Visions is het hele jaar door op pad: van livestreams in onze studio’s tot licht, geluid en beeld op beurzen, openingen, seminars en presentaties."
        video="overons.mp4"
        beeld={kerkRegie}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.4fr]">
        <p className="label text-rood">Ons verhaal</p>
        <div className="space-y-6 text-xl leading-relaxed text-white/85 sm:text-2xl">
          <p>
            Al meer dan 30 jaar verzorgen we LED, video, beeld, licht en geluid op evenementen. Daar kwamen livestreams,
            eigen studio’s in hartje Groningen en professionele podcasts bij.
          </p>
          <p className="text-zacht">
            Wat al die jaren hetzelfde bleef: we zoeken naar een presentatie die iets doet met mensen. Techniek is voor ons
            geen doel, maar het middel om een beleving neer te zetten.
          </p>
          <ul className="flex flex-wrap gap-2 pt-4">
            {disciplines.map((d) => (
              <li key={d} className="rounded-full border border-rand px-4 py-1.5 text-sm text-white/80">{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rand bg-vlak" aria-labelledby="team-kop">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-28">
          <h2 id="team-kop" className="kop text-4xl sm:text-6xl">Het team</h2>
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {team.map((t) => (
              <li key={t.naam} className="group">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={t.beeld}
                    alt={`Portret van ${t.naam}`}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="aspect-[3/4] w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold">{t.naam}</p>
                <p className="text-sm text-zacht">{t.rol}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
