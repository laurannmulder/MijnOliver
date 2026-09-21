import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { VideoAchtergrond } from '@/klanten/unitedvisions/components/VideoAchtergrond'
import { Looptekst } from '@/klanten/unitedvisions/components/Looptekst'
import { Knop } from '@/klanten/unitedvisions/components/Knop'
import { CtaBand } from '@/klanten/unitedvisions/components/CtaBand'
import { diensten, producties, werkwijze, bedrijf } from '@/klanten/unitedvisions/lib/inhoud'
import podiumWidescreen from '@/klanten/unitedvisions/beeld/podium-widescreen.jpg'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
        <Image src={podiumWidescreen} alt="" fill preload sizes="100vw" placeholder="blur" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10">
          <VideoAchtergrond bestand="opkomstmeneerpodium.mp4" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zwart via-zwart/50 to-zwart/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zwart/80 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-36 sm:px-8 sm:pb-20">
          <p className="label opkomen flex items-center gap-3 text-white/80">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-rood opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-rood" />
            </span>
            Live event solutions
          </p>
          <h1 className="kop opkomen mt-6 text-[clamp(2.25rem,9.5vw,9rem)] [animation-delay:120ms]">
            Beleving is
            <br />
            ons <span className="text-rood">kernwoord.</span>
          </h1>
          <div className="opkomen mt-8 flex flex-col gap-8 [animation-delay:240ms] md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Licht, geluid, beeld en livestreams voor evenementen waar mensen nog lang over praten. Al meer dan 30 jaar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Knop href={`${BASIS}/contact`}>Offerte aanvragen</Knop>
              <Knop href={`${BASIS}/producties`} variant="rand">Bekijk ons werk</Knop>
            </div>
          </div>
        </div>
        <Looptekst className="border-y border-rand bg-zwart/60 py-5 backdrop-blur" />
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="label text-rood">Wie we zijn</p>
          <p className="mt-6 text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            We zoeken altijd naar een presentatie die iets doet met mensen. Die een emotie oproept.{' '}
            <span className="text-zacht">
              Het mooiste compliment? Als bezoekers na afloop nog praten over wat ze hebben gezien, gehoord en beleefd.
            </span>
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-2xl border border-rand bg-rand">
          {[
            ['30+', 'jaar ervaring in eventtechniek'],
            ['12 m²', 'HD LED-wand in onze studio'],
            ['4K', 'camera’s voor registratie en streams'],
            ['1', 'aanspreekpunt, van concept tot afbouw'],
          ].map(([getal, tekst]) => (
            <div key={getal} className="bg-zwart p-6 sm:p-8">
              <dt className="kop text-4xl normal-case text-white sm:text-5xl">{getal}</dt>
              <dd className="mt-3 text-sm text-zacht">{tekst}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Diensten */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 sm:pb-32" aria-labelledby="diensten-kop">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-rood">Wat we doen</p>
            <h2 id="diensten-kop" className="kop mt-4 text-4xl sm:text-6xl">Eén partner.<br />Alle techniek.</h2>
          </div>
          <p className="max-w-sm text-zacht">
            Van een seminar voor vijftig mensen tot een buitenevent met LED-wand: we leveren alles, en bedienen het ook.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {diensten.map((d, i) => (
            <li key={d.slug} className={i === 0 ? 'md:row-span-2' : ''}>
              <Link
                href={`${BASIS}/${d.slug}`}
                className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-7 sm:p-9"
              >
                <Image
                  src={d.beeld}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zwart via-zwart/60 to-zwart/10 transition-opacity group-hover:opacity-90" />
                <span className="label absolute left-7 top-7 text-white/60 sm:left-9 sm:top-9">{d.nummer}</span>
                <span className="absolute right-7 top-7 grid size-12 place-items-center rounded-full border border-white/30 transition-all duration-300 group-hover:rotate-45 group-hover:border-rood group-hover:bg-rood sm:right-9 sm:top-9">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
                <h3 className={`kop ${i === 0 ? 'text-5xl sm:text-6xl xl:text-7xl' : 'text-3xl sm:text-4xl xl:text-5xl'}`}>{d.titel}</h3>
                <p className="mt-4 max-w-md text-white/75">{d.kort}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Werkwijze, op licht vlak als rustpunt tussen het donkere beeld */}
      <section className="bg-papier text-inkt">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="label text-rood">Zo werken we</p>
              <h2 className="kop mt-4 text-4xl sm:text-6xl">Zorgeloos van begin tot eind.</h2>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-2xl bg-inkt/10 sm:grid-cols-2">
              {werkwijze.map((s, i) => (
                <li key={s.titel} className="bg-papier p-7 sm:p-9">
                  <span className="kop text-5xl text-rood">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-6 text-xl font-semibold">{s.titel}</h3>
                  <p className="mt-2 text-inkt/70">{s.tekst}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Producties */}
      <section className="py-24 sm:py-32" aria-labelledby="producties-kop">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-8">
          <div>
            <p className="label text-rood">Recent werk</p>
            <h2 id="producties-kop" className="kop mt-4 text-4xl sm:text-6xl">Producties</h2>
          </div>
          <Knop href={`${BASIS}/producties`} variant="rand">Alle producties</Knop>
        </div>
        <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {producties.slice(0, 8).map((p) => (
            <figure key={p.titel} className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[26rem]">
              <Image
                src={p.beeld}
                alt={p.titel}
                sizes="(min-width: 640px) 26rem, 78vw"
                placeholder="blur"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zwart/90 to-transparent p-6 pt-16">
                <p className="label text-rood">{p.soort}</p>
                <p className="mt-2 text-lg font-semibold">{p.titel}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
