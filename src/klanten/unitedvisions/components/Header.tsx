'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { bedrijf, diensten } from '@/klanten/unitedvisions/lib/inhoud'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

const overig = [
  { href: `${BASIS}/producties`, label: 'Producties' },
  { href: `${BASIS}/overons`, label: 'Over ons' },
  { href: `${BASIS}/contact`, label: 'Contact' },
]

export function Header() {
  const pad = usePathname()
  const [gescrold, setGescrold] = useState(false)
  const [mobielOpen, setMobielOpen] = useState(false)
  const [dienstenOpen, setDienstenOpen] = useState(false)
  const sluitTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const bij = () => setGescrold(window.scrollY > 24)
    bij()
    window.addEventListener('scroll', bij, { passive: true })
    return () => window.removeEventListener('scroll', bij)
  }, [])

  // Menu's dicht na navigeren: bijstellen tijdens het renderen in plaats van in
  // een effect, zie react.dev/learn/you-might-not-need-an-effect.
  const [vorigPad, setVorigPad] = useState(pad)
  if (pad !== vorigPad) {
    setVorigPad(pad)
    setMobielOpen(false)
    setDienstenOpen(false)
  }

  // Geen scrollende pagina achter het mobiele menu; Escape sluit alles.
  useEffect(() => {
    document.body.style.overflow = mobielOpen ? 'hidden' : ''
  }, [mobielOpen])
  useEffect(() => {
    const toets = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMobielOpen(false)
      setDienstenOpen(false)
    }
    window.addEventListener('keydown', toets)
    return () => window.removeEventListener('keydown', toets)
  }, [])

  // Hover opent het dienstenmenu; een korte vertraging bij het verlaten
  // voorkomt dat het dichtklapt terwijl de muis naar het paneel beweegt.
  const hoverAan = () => {
    clearTimeout(sluitTimer.current)
    setDienstenOpen(true)
  }
  const hoverUit = () => {
    sluitTimer.current = setTimeout(() => setDienstenOpen(false), 150)
  }

  const actief = (href: string) => pad === href
  const opDienst = diensten.some((d) => pad === `${BASIS}/${d.slug}`)
  // Op de lichte contactpagina moet de balk altijd een donkere achtergrond hebben.
  const vast = gescrold || mobielOpen || pad.startsWith(`${BASIS}/contact`)

  const linkStijl = (aan: boolean) =>
    `rounded-full px-4 py-2 text-sm transition-colors ${aan ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'}`

  return (
    <>
      {/* Dimt de pagina achter het mobiele menu; klikken sluit het. */}
      <div
        aria-hidden
        onClick={() => setMobielOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobielOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`relative mx-auto max-w-6xl rounded-[1.75rem] border transition-all duration-500 ${
            vast
              ? 'border-white/10 bg-zwart/80 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-2xl'
              : 'border-white/10 bg-white/[0.04] backdrop-blur-md'
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-4 pl-4 pr-2 sm:pl-5">
            <Logo ondertitel={false} />

            <nav aria-label="Hoofdmenu" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                <li onPointerEnter={hoverAan} onPointerLeave={hoverUit}>
                  <button
                    type="button"
                    onClick={() => setDienstenOpen((o) => !o)}
                    aria-expanded={dienstenOpen}
                    aria-controls="diensten-menu"
                    className={`flex items-center gap-1.5 ${linkStijl(opDienst || dienstenOpen)}`}
                  >
                    Diensten
                    <ChevronDown className={`size-4 transition-transform duration-300 ${dienstenOpen ? 'rotate-180' : ''}`} aria-hidden />
                  </button>
                </li>
                {overig.filter((m) => m.label !== 'Contact').map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} aria-current={actief(m.href) ? 'page' : undefined} className={linkStijl(actief(m.href))}>
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={`${BASIS}/contact`}
                className="group hidden items-center gap-1.5 rounded-full bg-rood py-2.5 pl-5 pr-4 text-sm font-semibold text-white transition-colors hover:bg-rood-donker sm:inline-flex"
              >
                Contact
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => setMobielOpen((o) => !o)}
                aria-expanded={mobielOpen}
                aria-controls="mobiel-menu"
                aria-label={mobielOpen ? 'Menu sluiten' : 'Menu openen'}
                className="relative grid size-12 place-items-center rounded-full bg-white/8 transition-colors hover:bg-white/15 lg:hidden"
              >
                {/* Twee streepjes die tot een kruis draaien. */}
                <span className={`absolute h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${mobielOpen ? 'rotate-45' : '-translate-y-1'}`} />
                <span className={`absolute h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${mobielOpen ? '-rotate-45' : 'translate-y-1'}`} />
              </button>
            </div>
          </div>

          {/* Desktop: dienstenpaneel onder de balk */}
          <div
            id="diensten-menu"
            onPointerEnter={hoverAan}
            onPointerLeave={hoverUit}
            className={`absolute inset-x-0 top-full hidden pt-3 transition-all duration-300 lg:block ${
              dienstenOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
            }`}
          >
            <ul className="grid grid-cols-4 gap-2 rounded-[1.75rem] border border-white/10 bg-zwart/90 p-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] backdrop-blur-2xl">
              {diensten.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`${BASIS}/${d.slug}`}
                    tabIndex={dienstenOpen ? undefined : -1}
                    className="group relative isolate flex h-56 flex-col justify-end overflow-hidden rounded-[1.25rem] p-5"
                  >
                    <Image
                      src={d.beeld}
                      alt=""
                      fill
                      sizes="280px"
                      placeholder="blur"
                      className="-z-20 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zwart via-zwart/50 to-transparent" />
                    <span className="label absolute left-5 top-5 text-white/60">{d.nummer}</span>
                    <ArrowUpRight
                      className="absolute right-5 top-5 size-5 text-white/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rood"
                      aria-hidden
                    />
                    <span className="text-lg font-semibold tracking-tight">{d.titel}</span>
                    <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/65">{d.kort}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobiel: menukaart onder de balk */}
          <nav
            id="mobiel-menu"
            aria-label="Mobiel menu"
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:hidden ${
              mobielOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="max-h-[calc(100svh-7rem)] overflow-y-auto px-2 pb-2">
                <p className="label px-3 pb-3 pt-2 text-white/50">Diensten</p>
                <ul className="grid grid-cols-2 gap-2">
                  {diensten.map((d, i) => (
                    <li
                      key={d.slug}
                      className={`transition-all duration-500 ${mobielOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
                      style={{ transitionDelay: mobielOpen ? `${80 + i * 50}ms` : '0ms' }}
                    >
                      <Link
                        href={`${BASIS}/${d.slug}`}
                        tabIndex={mobielOpen ? undefined : -1}
                        className="relative isolate flex h-28 items-end overflow-hidden rounded-2xl p-3.5"
                      >
                        <Image src={d.beeld} alt="" fill sizes="45vw" placeholder="blur" className="-z-20 object-cover" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zwart/90 to-zwart/10" />
                        <span className={`font-semibold ${pad === `${BASIS}/${d.slug}` ? 'text-rood' : ''}`}>{d.titel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="mt-2 overflow-hidden rounded-2xl bg-white/[0.04]">
                  {overig.map((m, i) => (
                    <li
                      key={m.href}
                      className={`border-b border-white/5 transition-all duration-500 last:border-0 ${mobielOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
                      style={{ transitionDelay: mobielOpen ? `${280 + i * 50}ms` : '0ms' }}
                    >
                      <Link
                        href={m.href}
                        tabIndex={mobielOpen ? undefined : -1}
                        aria-current={actief(m.href) ? 'page' : undefined}
                        className="flex items-center justify-between px-4 py-4 text-lg"
                      >
                        <span className={actief(m.href) ? 'text-rood' : ''}>{m.label}</span>
                        <ArrowUpRight className="size-4 text-white/40" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex gap-2">
                  <Link
                    href={`${BASIS}/contact`}
                    tabIndex={mobielOpen ? undefined : -1}
                    className="flex-1 rounded-2xl bg-rood px-4 py-4 text-center font-semibold text-white"
                  >
                    Offerte aanvragen
                  </Link>
                  <a
                    href={`tel:${bedrijf.telefoonLink}`}
                    tabIndex={mobielOpen ? undefined : -1}
                    className="rounded-2xl bg-white/8 px-5 py-4 font-semibold"
                  >
                    Bel ons
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
