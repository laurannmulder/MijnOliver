import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { PaginaKop } from '@/klanten/unitedvisions/components/PaginaKop'
import { CtaBand } from '@/klanten/unitedvisions/components/CtaBand'
import { Knop } from '@/klanten/unitedvisions/components/Knop'
import { diensten, vindDienst } from '@/klanten/unitedvisions/lib/inhoud'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

// Alleen de vier diensten bestaan; elk ander pad is een 404.
export const dynamicParams = false

export function generateStaticParams() {
  return diensten.map((d) => ({ dienst: d.slug }))
}

export async function generateMetadata({ params }: PageProps<'/unitedvisions/[dienst]'>): Promise<Metadata> {
  const dienst = vindDienst((await params).dienst)
  return dienst ? { title: dienst.titel, description: dienst.kort } : {}
}

export default async function DienstPagina({ params }: PageProps<'/unitedvisions/[dienst]'>) {
  const dienst = vindDienst((await params).dienst)
  if (!dienst) notFound()

  const volgende = diensten[(diensten.indexOf(dienst) + 1) % diensten.length]

  return (
    <>
      <PaginaKop label={`${dienst.nummer} · ${dienst.titel}`} titel={dienst.kop} video={dienst.video} beeld={dienst.beeld} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.4fr]">
        <p className="label text-rood">{dienst.titel}</p>
        <div className="space-y-6 text-xl leading-relaxed text-white/85 sm:text-2xl">
          {dienst.intro.map((alinea) => <p key={alinea}>{alinea}</p>)}
          <div className="pt-4">
            <Knop href={`${BASIS}/contact`}>Vraag een offerte aan</Knop>
          </div>
        </div>
      </section>

      <section className="border-y border-rand bg-vlak">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-28">
          <h2 className="kop text-3xl sm:text-5xl">{dienst.onderdelenKop}</h2>
          <ul className={`mt-12 grid gap-px overflow-hidden rounded-2xl border border-rand bg-rand sm:grid-cols-2 ${dienst.onderdelen.length > 4 ? 'lg:grid-cols-3' : ''}`}>
            {dienst.onderdelen.map((o, i) => (
              <li key={o.titel} className="bg-vlak p-7 transition-colors hover:bg-vlak-2 sm:p-9">
                <span className="label text-rood">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{o.titel}</h3>
                <p className="mt-3 leading-relaxed text-zacht">{o.tekst}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-28" aria-label="Foto's">
        <div className="grid gap-4 sm:grid-cols-2">
          {dienst.galerij.map((g, i) => (
            <Image
              key={g.alt}
              src={g.beeld}
              alt={g.alt}
              placeholder="blur"
              sizes="(min-width: 640px) 50vw, 100vw"
              className={`w-full rounded-2xl object-cover ${i % 3 === 0 ? 'aspect-[4/3] sm:col-span-2 sm:aspect-[21/9]' : 'aspect-[4/3]'}`}
            />
          ))}
        </div>

        <Link
          href={`${BASIS}/${volgende.slug}`}
          className="group mt-16 flex items-center justify-between gap-6 border-t border-rand pt-10"
        >
          <span className="min-w-0">
            <span className="label text-zacht">Volgende dienst</span>
            <span className="kop mt-3 block text-[clamp(1.75rem,8vw,3.75rem)] transition-colors group-hover:text-rood">{volgende.titel}</span>
          </span>
          <span className="grid size-12 shrink-0 place-items-center sm:size-16 rounded-full border border-rand transition-all group-hover:rotate-45 group-hover:border-rood group-hover:bg-rood">
            <ArrowUpRight className="size-6" aria-hidden />
          </span>
        </Link>
      </section>

      <CtaBand />
    </>
  )
}
