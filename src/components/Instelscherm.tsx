import { AuthScherm } from './AuthScherm'

export function Instelscherm() {
  return (
    <AuthScherm titel="Nog niet ingesteld">
      <p className="text-sm text-merk-zacht">
        Er zijn nog geen Supabase-gegevens ingesteld, dus inloggen kan nog niet. Zet deze waarden in{' '}
        <code className="rounded bg-merk-achtergrond px-1 py-0.5">.env.local</code> (zie{' '}
        <code className="rounded bg-merk-achtergrond px-1 py-0.5">.env.example</code>):
      </p>
      <ul className="mt-4 space-y-1 text-sm text-merk-zacht">
        <li>
          <code>NEXT_PUBLIC_SUPABASE_URL</code>
        </li>
        <li>
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
        </li>
        <li>
          <code>SUPABASE_SERVICE_ROLE_KEY</code>
        </li>
      </ul>
    </AuthScherm>
  )
}
