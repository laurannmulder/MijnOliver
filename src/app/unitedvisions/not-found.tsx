import { Knop } from '@/klanten/unitedvisions/components/Knop'
import { BASIS } from '@/klanten/unitedvisions/lib/pad'

export default function NietGevonden() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-center px-4 pt-24 sm:px-8">
      <p className="label text-rood">404</p>
      <h1 className="kop mt-5 text-5xl sm:text-7xl">Deze pagina staat niet op het podium.</h1>
      <div className="mt-10"><Knop href={`${BASIS}`}>Naar de homepage</Knop></div>
    </section>
  )
}
