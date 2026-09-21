import { disciplines } from '@/klanten/unitedvisions/lib/inhoud'

export function Looptekst({ className = '' }: { className?: string }) {
  const rij = [...disciplines, ...disciplines]
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div className="looptekst flex w-max">
        {[0, 1].map((kopie) => (
          <div key={kopie} className="flex shrink-0 items-center">
            {rij.map((d, i) => (
              <span key={`${kopie}-${i}`} className="kop flex items-center gap-8 px-4 text-2xl text-white/80 sm:text-3xl">
                {d}
                <span className="size-2 rounded-full bg-rood" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
