import { ArrowUpRight, Lock } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'
import { Kaart } from '@/components/ui'
import { Instelscherm } from '@/components/Instelscherm'
import { huidigeGebruiker } from '@/lib/gebruiker'
import { supabaseGeconfigureerd } from '@/lib/supabase/config'
import { TOOLS } from '@/lib/tools'

export default async function PortaalPagina() {
  if (!supabaseGeconfigureerd) return <Instelscherm />

  const gebruiker = await huidigeGebruiker()

  if (!gebruiker) redirect('/inloggen')

  const toegestaan = TOOLS.filter((tool) => gebruiker.tools.includes(tool.slug))
  const rest = TOOLS.filter((tool) => !gebruiker.tools.includes(tool.slug))

  return (
    <>
      <Header email={gebruiker.email} isBeheerder={gebruiker.isBeheerder} />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">
          {gebruiker.naam ? `Welkom, ${gebruiker.naam}` : 'Welkom'}
        </h1>
        <p className="mt-2 text-sm text-merk-zacht">
          {toegestaan.length > 0
            ? 'Kies de omgeving waar je naartoe wilt.'
            : 'Je hebt nog geen toegang tot een omgeving. Vraag de beheerder om je toe te voegen.'}
        </p>

        {toegestaan.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {toegestaan.map((tool) => (
              <a
                key={tool.slug}
                href={tool.url}
                className="group rounded-xl border border-merk-rand bg-merk-vlak p-6 transition-colors hover:border-merk-accent"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    <span className="text-merk-accent">mijn</span>oliver {tool.naam}
                  </h2>
                  <ArrowUpRight className="size-5 text-merk-zacht transition-colors group-hover:text-merk-accent" />
                </div>
                <p className="mt-2 text-sm text-merk-zacht">{tool.omschrijving}</p>
                <p className="mt-4 text-xs text-merk-zacht/80">{new URL(tool.url).host}</p>
              </a>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-wide text-merk-zacht">
              Geen toegang
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {rest.map((tool) => (
                <Kaart key={tool.slug} className="opacity-60">
                  <div className="flex items-center gap-2">
                    <Lock className="size-4 text-merk-zacht" />
                    <h3 className="font-medium">
                      <span className="text-merk-accent">mijn</span>oliver {tool.naam}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-merk-zacht">{tool.omschrijving}</p>
                </Kaart>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
