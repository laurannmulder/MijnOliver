import Link from 'next/link'
import type { ReactNode } from 'react'
import { Building2, HeartPulse, Mail, Search, ShieldCheck, Zap, type LucideIcon } from 'lucide-react'
import { Merk } from './Merk'
import { KnopLink } from './ui'
import { ContactFormulier } from './ContactFormulier'
import { BEDRIJFSNAAM, type Werkterrein } from '@/lib/site'

/** Opmaak van de publieke pagina's: header, footer en de bouwstenen daartussen. */

const ICONEN: Record<string, LucideIcon> = {
  bedrijfsschade: ShieldCheck,
  letselschade: HeartPulse,
  energie: Zap,
  markt: Building2,
}

export function WerkterreinIcoon({ sleutel, className = '' }: { sleutel: string; className?: string }) {
  const Icoon = ICONEN[sleutel] ?? Search
  return <Icoon className={className} aria-hidden />
}

export function PubliekeHeader({ ingelogd = false }: { ingelogd?: boolean }) {
  return (
    <header className="sticky top-0 z-10 border-b border-merk-rand bg-merk-vlak/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" className="shrink-0">
          <Merk />
        </Link>
        <nav className="ml-auto flex items-center gap-x-6 text-sm">
          <Link href="/wat-we-doen" className="hidden text-merk-zacht hover:text-merk sm:inline">
            Wat we doen
          </Link>
          <Link href="/wat-we-doen#werkwijze" className="hidden text-merk-zacht hover:text-merk md:inline">
            Werkwijze
          </Link>
          <Link href="/#contact" className="hidden text-merk-zacht hover:text-merk sm:inline">
            Contact
          </Link>
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
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <Merk hoogte={28} />
          <p className="mt-3 max-w-xs text-sm text-merk-zacht">
            {BEDRIJFSNAAM} bouwt slimme tools voor professionals die met cijfers en dossiers werken.
          </p>
        </div>
        <div className="text-sm">
          <h2 className="font-medium">Navigatie</h2>
          <ul className="mt-3 space-y-2 text-merk-zacht">
            <li><Link href="/" className="hover:text-merk">Home</Link></li>
            <li><Link href="/wat-we-doen" className="hover:text-merk">Wat we doen</Link></li>
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
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-merk-zacht">
          © {new Date().getFullYear()} {BEDRIJFSNAAM}
        </p>
      </div>
    </footer>
  )
}

export function Sectie({
  id,
  label,
  titel,
  intro,
  className = '',
  children,
}: {
  id?: string
  label?: string
  titel: string
  intro?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {label && (
          <p className="text-xs font-medium uppercase tracking-widest text-merk-accent">{label}</p>
        )}
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{titel}</h2>
        {intro && <p className="mt-4 max-w-2xl text-lg text-merk-zacht">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

export function WerkterreinKaart({ terrein }: { terrein: Werkterrein }) {
  return (
    <Link
      href={`/wat-we-doen#${terrein.sleutel}`}
      className="group flex flex-col rounded-2xl border border-merk-rand bg-merk-vlak p-8 transition-colors hover:border-merk-accent"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-merk-accent/10 text-merk-accent">
        <WerkterreinIcoon sleutel={terrein.sleutel} className="size-5" />
      </span>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{terrein.titel}</h3>
      <p className="mt-3 text-merk-zacht">{terrein.kort}</p>
      <span className="mt-6 text-sm font-medium text-merk-accent group-hover:underline">
        Meer hierover →
      </span>
    </Link>
  )
}

export function ContactBlok() {
  return (
    <section id="contact" className="scroll-mt-20 bg-merk">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="text-white">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Benieuwd wat we voor u kunnen doen?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Vertel ons met welk vraagstuk u worstelt. We laten graag zien hoe onze tools daarbij
            helpen.
          </p>
        </div>
        <div className="rounded-2xl bg-merk-vlak p-6 sm:p-8">
          <ContactFormulier />
        </div>
      </div>
    </section>
  )
}
