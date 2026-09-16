import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { Merk } from './Merk'
import { KnopLink } from './ui'
import { ContactFormulier } from './ContactFormulier'
import { BEDRIJFSNAAM, DIENSTEN, SECTOREN, type Dienst, type Item } from '@/lib/site'

/** Opmaak van de publieke pagina's: header, footer en de bouwstenen daartussen. */

const NAVIGATIE = [
  { href: '/wat-we-doen', label: 'Wat we doen', klasse: 'sm:inline' },
  { href: '/sectoren', label: 'Sectoren', klasse: 'sm:inline' },
  { href: '/wat-we-doen#werkwijze', label: 'Werkwijze', klasse: 'md:inline' },
  { href: '/#contact', label: 'Contact', klasse: 'md:inline' },
]

export function PubliekeHeader({ ingelogd = false }: { ingelogd?: boolean }) {
  return (
    <header className="sticky top-0 z-10 border-b border-merk-rand bg-merk-vlak/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        <Link href="/" className="shrink-0">
          <Merk />
        </Link>
        <nav className="ml-auto flex items-center gap-x-7 text-sm">
          {NAVIGATIE.map((item) => (
            <Link key={item.href} href={item.href} className={`hidden text-merk-zacht hover:text-merk ${item.klasse}`}>
              {item.label}
            </Link>
          ))}
          <KnopLink href={ingelogd ? '/' : '/inloggen'} variant={ingelogd ? 'zacht' : 'primair'}>
            {ingelogd ? 'Mijn omgevingen' : 'Inloggen'}
          </KnopLink>
        </nav>
      </div>
    </header>
  )
}

export function PubliekeFooter() {
  return (
    <footer className="border-t border-merk-rand bg-merk-vlak">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Merk hoogte={28} />
          <p className="mt-3 max-w-xs text-sm text-merk-zacht">
            {BEDRIJFSNAAM} helpt organisaties slimmer werken met data, AI en automatisering.
          </p>
        </div>
        <div className="text-sm">
          <h2 className="font-medium">Wat we doen</h2>
          <ul className="mt-3 space-y-2 text-merk-zacht">
            {DIENSTEN.map((dienst) => (
              <li key={dienst.sleutel}>
                <Link href={`/wat-we-doen#${dienst.sleutel}`} className="hover:text-merk">
                  {dienst.titel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-medium">Organisatie</h2>
          <ul className="mt-3 space-y-2 text-merk-zacht">
            <li><Link href="/" className="hover:text-merk">Home</Link></li>
            <li><Link href="/sectoren" className="hover:text-merk">Sectoren</Link></li>
            <li><Link href="/wat-we-doen#werkwijze" className="hover:text-merk">Werkwijze</Link></li>
            <li><Link href="/inloggen" className="hover:text-merk">Inloggen</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-medium">Contact</h2>
          <p className="mt-3 text-merk-zacht">Een vraag of kennismaken?</p>
          <Link
            href="/#contact"
            className="mt-2 inline-flex items-center gap-2 font-medium text-merk-accent hover:underline"
          >
            <Mail className="size-4" aria-hidden />
            Stuur ons een bericht
          </Link>
        </div>
      </div>
      <div className="border-t border-merk-rand">
        <p className="mx-auto max-w-7xl px-6 py-4 text-xs text-merk-zacht">
          © {new Date().getFullYear()} {BEDRIJFSNAAM}
        </p>
      </div>
    </footer>
  )
}

export function PaginaKop({ label, titel, children }: { label: string; titel: string; children?: ReactNode }) {
  return (
    <section className="border-b border-merk-rand bg-merk-vlak">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <p className="text-sm font-medium text-merk-accent">{label}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          {titel}
        </h1>
        {children}
      </div>
    </section>
  )
}

export function Sectie({
  id,
  label,
  titel,
  intro,
  donker = false,
  className = '',
  children,
}: {
  id?: string
  label?: string
  titel: string
  intro?: string
  donker?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-28 ${donker ? 'bg-merk text-white' : ''} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {label && (
          <p className={`text-xs font-medium uppercase tracking-widest ${donker ? 'text-white/60' : 'text-merk-accent'}`}>
            {label}
          </p>
        )}
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">{titel}</h2>
        {intro && (
          <p className={`mt-5 max-w-2xl text-lg ${donker ? 'text-white/70' : 'text-merk-zacht'}`}>{intro}</p>
        )}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}

export function IcoonVlak({ item, groot = false }: { item: Pick<Item, 'icoon'>; groot?: boolean }) {
  const Icoon = item.icoon
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl bg-merk-accent/10 text-merk-accent ${groot ? 'size-12' : 'size-10'}`}
    >
      <Icoon className={groot ? 'size-6' : 'size-5'} aria-hidden />
    </span>
  )
}

export function DienstKaart({ dienst }: { dienst: Dienst }) {
  return (
    <Link
      href={`/wat-we-doen#${dienst.sleutel}`}
      className="group flex flex-col rounded-2xl border border-merk-rand bg-merk-vlak p-8 transition-colors hover:border-merk-accent"
    >
      <IcoonVlak item={dienst} groot />
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{dienst.titel}</h3>
      <p className="mt-3 flex-1 text-merk-zacht">{dienst.tekst}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-merk-accent">
        Lees meer
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  )
}

export function SectorRaster({ metOmschrijving = false }: { metOmschrijving?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {SECTOREN.map((sector) => (
        <li
          key={sector.titel}
          className="flex items-center gap-4 rounded-xl border border-merk-rand bg-merk-vlak p-4"
        >
          <IcoonVlak item={sector} />
          <div>
            <p className="font-medium leading-snug">{sector.titel}</p>
            {metOmschrijving && <p className="mt-0.5 text-sm text-merk-zacht">{sector.tekst}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function MeerLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <KnopLink href={href} variant="zacht" className="mt-10 px-5 py-3">
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </KnopLink>
  )
}

export function ContactBlok() {
  return (
    <section id="contact" className="scroll-mt-20 bg-merk">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="text-white">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Klaar om slimmer te werken?
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Vertel ons met welk vraagstuk uw organisatie bezig is. We denken graag mee over wat
            data, AI en automatisering voor u kunnen betekenen.
          </p>
        </div>
        <div className="rounded-2xl bg-merk-vlak p-6 sm:p-8">
          <ContactFormulier />
        </div>
      </div>
    </section>
  )
}
