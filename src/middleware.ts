import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { supabaseGeconfigureerd } from '@/lib/supabase/config'

// Bewust de klassieke naam `middleware.ts` en niet Next.js 16's `proxy.ts`:
// op Vercel routeerde `proxy.ts` in het BeterBedrijfskundig-project helemaal
// niets (elk pad 404'de aan de edge zonder function-invocaties, ondanks een
// schone build). `middleware.ts` werkt in Next.js 16 gewoon, alleen met een
// deprecation-notice.
const PUBLIEKE_PADEN = ['/inloggen', '/auth', '/wachtwoord-instellen']

export async function middleware(request: NextRequest) {
  // Zonder config zou elke request klappen op een ongeldige Supabase-URL;
  // de pagina's tonen dan zelf een instelscherm.
  if (!supabaseGeconfigureerd) return NextResponse.next()

  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = new URL(request.url)

  const isPubliek = PUBLIEKE_PADEN.some((pad) => pathname.startsWith(pad))

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
