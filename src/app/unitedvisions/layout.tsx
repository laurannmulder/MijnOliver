import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { Header } from '@/klanten/unitedvisions/components/Header'
import { Footer } from '@/klanten/unitedvisions/components/Footer'
import '@/klanten/unitedvisions/stijl.css'

// Klantpreview: de nieuwe United Visions-site, tijdelijk onder mijnoliver.nl
// tot het domein unitedvisions.nl verhuisd is. Staat los van het portaal: eigen
// huisstijl (stijl.css), eigen componenten in src/klanten/unitedvisions en
// publiek toegankelijk (zie KLANTSITES in src/middleware.ts).

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'United Visions | Licht, geluid, beeld en livestreams',
    template: '%s | United Visions',
  },
  description:
    'United Visions verzorgt al meer dan 30 jaar licht, geluid, beeld en LED-schermen voor evenementen, en livestreams, studio’s en podcasts.',
  // Preview: niet in Google, anders concurreert hij met de echte site.
  robots: { index: false, follow: false },
}

export default function UnitedVisionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`uv-site ${archivo.variable} min-h-screen bg-zwart font-sans text-tekst antialiased`}>
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-rood focus:px-4 focus:py-2 focus:text-white"
      >
        Naar de inhoud
      </a>
      <Header />
      <main id="inhoud">{children}</main>
      <Footer />
    </div>
  )
}
