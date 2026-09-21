import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { supabaseGeconfigureerd } from '@/lib/supabase/config'

// Bewust de klassieke naam `middleware.ts` en niet Next.js 16's `proxy.ts`:
// op Vercel routeerde `proxy.ts` in het BeterBedrijfskundig-project helemaal
// niets (elk pad 404'de aan de edge zonder function-invocaties, ondanks een
// schone build). `middleware.ts` werkt in Next.js 16 gewoon, alleen met een
// deprecation-notice.

// De publieke website: `/` exact (anders matcht alles), plus de informatiepagina's.
const PUBLIEKE_PAGINAS = ['/', '/wat-we-doen', '/sectoren']

// Let op: /wachtwoord-vergeten hoort hier ook bij. Wie zijn wachtwoord kwijt is
// heeft per definitie geen sessie, dus zonder deze regel stuurt de middleware
// diegene terug naar /inloggen en lijkt de link "niets te doen".
const PUBLIEKE_PADEN = [
  '/inloggen',
  '/auth',
  '/wachtwoord-instellen',
  '/wachtwoord-vergeten',
]

// Klantsites (src/app/unitedvisions e.d.): publiek, en ze hebben niets aan een
// Supabase-sessie, dus meteen door zonder inlogcontrole.
const KLANTSITES = ['/unitedvisions']

export async function middleware(request: NextRequest) {
  const pad = request.nextUrl.pathname
  if (KLANTSITES.some((k) => pad === k || pad.startsWith(`${k}/`))) return NextResponse.next()

  // Zonder config zou elke request klappen op een ongeldige Supabase-URL;
  // de pagina's tonen dan zelf een instelscherm.
  if (!supabaseGeconfigureerd) return NextResponse.next()

  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = new URL(request.url)

  const isPubliek =
    PUBLIEKE_PAGINAS.includes(pathname) ||
    PUBLIEKE_PADEN.some((pad) => pathname.startsWith(pad))

  if (!user && !isPubliek) {
    return NextResponse.redirect(new URL('/inloggen', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
