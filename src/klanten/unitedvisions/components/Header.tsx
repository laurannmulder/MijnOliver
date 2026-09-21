'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { bedrijf } from '@/klanten/unitedvisions/lib/inhoud'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

const menu = [
  { href: `${BASIS}/events`, label: 'Events' },
  { href: `${BASIS}/livestreams`, label: 'Livestreams' },
  { href: `${BASIS}/studio`, label: "Studio's" },
  { href: `${BASIS}/podcasts`, label: 'Podcasts' },
  { href: `${BASIS}/producties`, label: 'Producties' },
  { href: `${BASIS}/overons`, label: 'Over ons' },
]

export function Header() {
  const pad = usePathname()
  const [gescrold, setGescrold] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const bij = () => setGescrold(window.scrollY > 24)
    bij()
    window.addEventListener('scroll', bij, { passive: true })
    return () => window.removeEventListener('scroll', bij)
  }, [])

  // Menu dicht na navigeren: bijstellen tijdens het renderen in plaats van in
  // een effect, zie react.dev/learn/you-might-not-need-an-effect.
  const [vorigPad, setVorigPad] = useState(pad)
  if (pad !== vorigPad) {
    setVorigPad(pad)
    setOpen(false)
  }

  // Geen scrollende pagina achter het open menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  // Pagina's zonder donkere fotokop: daar is een transparante header onleesbaar.
  const altijdVast = pad.startsWith(`${BASIS}/contact`)

  const actief = (href: string) => pad === href || pad === href.replace(/\/$/, '')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        gescrold || open || altijdVast ? 'border-b border-rand bg-zwart/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <Logo />
        <nav aria-label="Hoofdmenu" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {menu.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  aria-current={actief(m.href) ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors hover:text-white ${
                    actief(m.href) ? 'text-white' : 'text-white/65'
                  }`}
                >
                  {m.label}
                  {actief(m.href) && <span className="mx-auto mt-1 block size-1 rounded-full bg-rood" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={`${BASIS}/contact`}
            className="hidden whitespace-nowrap rounded-full bg-rood px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rood-donker sm:inline-block"
          >
            Offerte aanvragen
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            className="grid size-11 place-items-center rounded-full border border-rand xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobiel-menu" aria-label="Mobiel menu" className="h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-rand bg-zwart px-4 pb-10 pt-6 xl:hidden">
          <ul className="flex flex-col">
            {[...menu, { href: `${BASIS}/contact`, label: 'Contact' }].map((m) => (
              <li key={m.href} className="border-b border-rand">
                <Link href={m.href} className={`kop block py-5 text-3xl ${actief(m.href) ? 'text-rood' : ''}`}>
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-2 text-white/70">
            <a className="block" href={`tel:${bedrijf.telefoonLink}`}>{bedrijf.telefoon}</a>
            <a className="block" href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a>
          </div>
        </nav>
      )}
    </header>
  )
}
