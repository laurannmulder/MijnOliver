import Link from 'next/link'
import { Merk } from './Merk'
import { UitlogKnop } from './UitlogKnop'

export function Header({ email, isBeheerder }: { email: string; isBeheerder: boolean }) {
  return (
    <header className="border-b border-merk-rand bg-merk-vlak">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/" className="shrink-0">
          <Merk />
        </Link>
        <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {isBeheerder && (
            <Link href="/admin/gebruikers" className="text-merk-zacht hover:text-merk">
              Gebruikers
            </Link>
          )}
          <span className="text-merk-zacht">{email}</span>
          <UitlogKnop />
        </div>
      </div>
    </header>
  )
}
