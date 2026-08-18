import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

const knopBasis =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none'

const varianten = {
  primair: 'bg-merk text-white hover:bg-merk-licht',
  zacht: 'bg-white text-merk border border-merk-rand hover:bg-merk-achtergrond',
  stil: 'text-merk-zacht hover:text-merk hover:bg-merk-achtergrond',
} as const

type Variant = keyof typeof varianten

export function Knop({
  variant = 'primair',
  className = '',
  ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
  return <button className={`${knopBasis} ${varianten[variant]} ${className}`} {...props} />
}

export function KnopLink({
  variant = 'primair',
  className = '',
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${knopBasis} ${varianten[variant]} ${className}`} {...props} />
}

export function Kaart({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-xl border border-merk-rand bg-merk-vlak p-6 ${className}`}>
      {children}
    </div>
  )
}

export function Melding({ soort, children }: { soort: 'fout' | 'gelukt'; children: ReactNode }) {
  const stijl =
    soort === 'fout'
      ? 'border-red-200 bg-red-50 text-red-800'
      : 'border-emerald-200 bg-emerald-50 text-emerald-800'
  return <p className={`rounded-lg border px-4 py-3 text-sm ${stijl}`}>{children}</p>
}

export const invoerClass =
  'w-full rounded-lg border border-merk-rand bg-white px-3 py-2.5 text-sm text-merk-tekst outline-none focus:border-merk placeholder:text-merk-zacht/60'

export const labelClass = 'block text-sm font-medium text-merk-tekst mb-1.5'
