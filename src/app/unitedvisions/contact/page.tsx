import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Radio } from 'lucide-react'
import { ContactFormulier } from '@/klanten/unitedvisions/components/ContactFormulier'
import { bedrijf } from '@/klanten/unitedvisions/lib/inhoud'

export const metadata: Metadata = {
  title: 'Contact en offerte',
  description: 'Vraag een offerte aan of neem contact op met United Visions in Groningen.',
}

export default function ContactPagina() {
  return (
    <section className="bg-papier text-inkt">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 pb-24 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="label text-rood">Contact</p>
          <h1 className="kop mt-5 text-5xl sm:text-6xl xl:text-7xl">Vertel ons over uw plan.</h1>
          <p className="mt-6 max-w-md text-lg text-inkt/70">
            Een evenement, livestream, studio-opname of podcast? Laat het ons weten, dan denken we graag met u mee.
          </p>
          <ul className="mt-12 space-y-5">
            <li>
              <a href={`tel:${bedrijf.telefoonLink}`} className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-inkt text-white transition-colors group-hover:bg-rood"><Phone className="size-5" aria-hidden /></span>
                <span className="text-lg font-medium">{bedrijf.telefoon}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${bedrijf.email}`} className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-inkt text-white transition-colors group-hover:bg-rood"><Mail className="size-5" aria-hidden /></span>
                <span className="text-lg font-medium">{bedrijf.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-inkt text-white"><MapPin className="size-5" aria-hidden /></span>
              <span className="text-lg font-medium">{bedrijf.plaats}</span>
            </li>
            <li>
              <a href={bedrijf.livestreamPortaal} className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-inkt text-white transition-colors group-hover:bg-rood"><Radio className="size-5" aria-hidden /></span>
                <span className="text-lg font-medium">Livestream bekijken met uw code</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)] sm:p-12">
          <ContactFormulier />
        </div>
      </div>
    </section>
  )
}
