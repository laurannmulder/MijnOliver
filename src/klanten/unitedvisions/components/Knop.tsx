import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'rood' | 'rand' | 'licht'
  className?: string
}

const stijl = {
  rood: 'bg-rood text-white hover:bg-rood-donker',
  rand: 'border border-white/25 text-tekst hover:border-white hover:bg-white hover:text-inkt',
  licht: 'bg-papier text-inkt hover:bg-white',
}

export function Knop({ href, children, variant = 'rood', className = '' }: Props) {
  const klassen = `group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${stijl[variant]} ${className}`
  const inhoud = (
    <>
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </>
  )
  // Externe links en tel:/mailto: horen niet via de Next-router.
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return <a href={href} className={klassen}>{inhoud}</a>
  }
  return <Link href={href} className={klassen}>{inhoud}</Link>
}
