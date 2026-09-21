import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { bedrijf, diensten } from '@/klanten/unitedvisions/lib/inhoud'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

export function Footer() {
  return (
    <footer className="border-t border-rand bg-zwart">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-zacht">
            Licht, geluid, beeld en livestreams. Al meer dan 30 jaar.
          </p>
        </div>
        <div>
          <h2 className="label text-zacht">Diensten</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {diensten.map((d) => (
              <li key={d.slug}><Link className="hover:text-rood" href={`${BASIS}/${d.slug}`}>{d.titel}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="label text-zacht">United Visions</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-rood" href={`${BASIS}/producties`}>Producties</Link></li>
            <li><Link className="hover:text-rood" href={`${BASIS}/overons`}>Over ons</Link></li>
            <li><Link className="hover:text-rood" href={`${BASIS}/contact`}>Contact</Link></li>
            <li><a className="hover:text-rood" href={bedrijf.livestreamPortaal}>Livestream bekijken</a></li>
          </ul>
        </div>
        <div>
          <h2 className="label text-zacht">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a className="hover:text-rood" href={`tel:${bedrijf.telefoonLink}`}>{bedrijf.telefoon}</a></li>
            <li><a className="hover:text-rood" href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a></li>
            <li className="flex gap-4 pt-2">
              <a className="hover:text-rood" href={bedrijf.instagram}>Instagram</a>
              <a className="hover:text-rood" href={bedrijf.facebook}>Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rand">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-zacht sm:px-8">
          Website door{' '}
          <a
            href="https://mijnoliver.nl"
            className="inline-flex items-center gap-0.5 font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-rood hover:decoration-rood"
          >
            Oliver Intelligence
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
        </p>
      </div>
    </footer>
  )
}
