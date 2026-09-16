'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

type MenuItem = { href: string; label: string }

/** Uitklapmenu voor de publieke header op schermen waar de navigatie niet past. */
export function MobielMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false)

  // Met Escape sluiten, zoals bezoekers van een menu verwachten.
  useEffect(() => {
    if (!open) return
    const sluit = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', sluit)
    return () => window.removeEventListener('keydown', sluit)
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobiel-menu"
        aria-label={open ? 'Menu sluiten' : 'Menu openen'}
        className="flex size-10 items-center justify-center rounded-lg border border-merk-rand bg-merk-vlak text-merk"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>

      {open && (
        <nav
          id="mobiel-menu"
          className="absolute inset-x-0 top-full border-b border-merk-rand bg-merk-vlak shadow-lg"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-6 py-2">
            {items.map((item) => (
              <li key={item.href} className="border-b border-merk-rand last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
