import { createBrowserClient } from '@supabase/ssr'
import { cookieOpties } from './config'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // Zonder hetzelfde cookiedomein als de server kan de uitlogknop de
    // sessiecookie niet verwijderen.
    { cookieOptions: cookieOpties }
  )
}
