import Image from 'next/image'
import Link from 'next/link'
import logo from '@/klanten/unitedvisions/beeld/logo-wit.png'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href={`${BASIS}`} className={`group flex items-center gap-3 ${className}`} aria-label="United Visions, naar de homepage">
      <span className="relative grid size-9 place-items-center rounded-full bg-rood transition-transform duration-300 group-hover:rotate-[-8deg]">
        <Image src={logo} alt="" className="h-5 w-auto" sizes="20px" />
      </span>
      <span className="leading-none">
        <span className="kop block text-[0.95rem] tracking-[0.02em]">United Visions</span>
        <span className="label mt-1 block text-[0.6rem] text-zacht">Live event solutions</span>
      </span>
    </Link>
  )
}
