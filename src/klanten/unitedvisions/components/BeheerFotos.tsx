'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Loader2, Trash2 } from 'lucide-react'
import { beeldUrl, type Productie } from '@/klanten/unitedvisions/lib/opslag'
import { verplaatsFoto, verwijderFoto, voegFotoToe, werkFotoBij } from '@/app/unitedvisions/beheer/acties'

const MAX_ZIJDE = 2000

/**
 * Verkleint de foto in de browser vóór het uploaden. Een foto rechtstreeks uit
 * een camera is al gauw 8 MB; zo gaat er nooit meer dan een paar honderd kB
 * over de lijn en blijft de site snel, zonder dat de eigenaar iets hoeft te doen.
 */
async function verklein(bestand: File): Promise<{ blob: Blob; breedte: number; hoogte: number }> {
  const bitmap = await createImageBitmap(bestand)
  const schaal = Math.min(1, MAX_ZIJDE / Math.max(bitmap.width, bitmap.height))
  const breedte = Math.round(bitmap.width * schaal)
  const hoogte = Math.round(bitmap.height * schaal)

  const canvas = document.createElement('canvas')
  canvas.width = breedte
  canvas.height = hoogte
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, breedte, hoogte)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82))
  if (!blob) throw new Error('Verkleinen mislukt')
  return { blob, breedte, hoogte }
}

export function BeheerFotos({ items }: { items: Productie[] }) {
  const router = useRouter()
  const [bezig, startOvergang] = useTransition()
  const [melding, setMelding] = useState<{ soort: 'fout' | 'gelukt'; tekst: string } | null>(null)
  const [uploadt, setUploadt] = useState(0)
  const invoer = useRef<HTMLInputElement>(null)

  const naAfloop = (uitkomst: { fout?: string; gelukt?: string }) => {
    if (uitkomst.fout) setMelding({ soort: 'fout', tekst: uitkomst.fout })
    else if (uitkomst.gelukt) setMelding({ soort: 'gelukt', tekst: uitkomst.gelukt })
    router.refresh()
  }

  async function kiesBestanden(bestanden: FileList | null) {
    if (!bestanden?.length) return
    setMelding(null)
    const lijst = Array.from(bestanden)

    for (const [i, bestand] of lijst.entries()) {
      setUploadt(lijst.length - i)
      try {
        const { blob, breedte, hoogte } = await verklein(bestand)
        const formData = new FormData()
        formData.set('foto', new File([blob], 'foto.webp', { type: 'image/webp' }))
        formData.set('titel', bestand.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
        formData.set('soort', '')
        formData.set('breedte', String(breedte))
        formData.set('hoogte', String(hoogte))
        const uitkomst = await voegFotoToe({}, formData)
        if (uitkomst.fout) {
          setMelding({ soort: 'fout', tekst: `${bestand.name}: ${uitkomst.fout}` })
          break
        }
      } catch {
        setMelding({ soort: 'fout', tekst: `${bestand.name} kon niet worden verwerkt.` })
        break
      }
    }

    setUploadt(0)
    if (invoer.current) invoer.current.value = ''
    setMelding((m) => m ?? { soort: 'gelukt', tekst: `${lijst.length} foto('s) toegevoegd.` })
    router.refresh()
  }

  return (
    <div className="space-y-8">
      {/* Toevoegen */}
      <div>
        <label
          htmlFor="fotos"
          className="flex cursor-pointer flex-col items-center gap-3 rounded-3xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-12 text-center transition-colors hover:border-rood hover:bg-white/[0.06]"
        >
          {uploadt > 0 ? (
            <Loader2 className="size-8 animate-spin text-rood" aria-hidden />
          ) : (
            <ImagePlus className="size-8 text-rood" aria-hidden />
          )}
          <span className="text-lg font-semibold">
            {uploadt > 0 ? `Bezig met uploaden (${uploadt} te gaan)…` : 'Foto’s toevoegen'}
          </span>
          <span className="max-w-sm text-sm text-zacht">
            Klik hier of sleep foto’s hierheen. Ze worden automatisch verkleind, dus een foto rechtstreeks
            uit de camera is prima.
          </span>
        </label>
        <input
          ref={invoer}
          id="fotos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(e) => kiesBestanden(e.target.files)}
        />
      </div>

      {melding && (
        <p
          role="status"
          className={`rounded-2xl border px-4 py-3 text-sm ${
            melding.soort === 'fout'
              ? 'border-rood/40 bg-rood/10 text-white'
              : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
          }`}
        >
          {melding.tekst}
        </p>
      )}

      {/* Lijst */}
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={item.id} className="rounded-3xl border border-rand bg-vlak p-3 sm:p-4">
            <form
              action={(formData) => startOvergang(async () => naAfloop(await werkFotoBij({}, formData)))}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <input type="hidden" name="id" value={item.id} />
              <Image
                src={beeldUrl(item.bestand)}
                alt=""
                width={item.breedte}
                height={item.hoogte}
                sizes="200px"
                className={`h-32 w-full rounded-2xl object-cover sm:w-48 ${item.zichtbaar ? '' : 'opacity-40'}`}
              />

              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="label text-zacht">Bijschrift</span>
                  <input
                    name="titel"
                    defaultValue={item.titel}
                    maxLength={120}
                    className="mt-1 w-full rounded-xl border border-rand bg-zwart px-3 py-2.5 text-sm outline-none focus:border-rood"
                  />
                </label>
                <label className="block">
                  <span className="label text-zacht">Techniek</span>
                  <input
                    name="soort"
                    defaultValue={item.soort}
                    maxLength={60}
                    placeholder="Bijv. Licht · Geluid"
                    className="mt-1 w-full rounded-xl border border-rand bg-zwart px-3 py-2.5 text-sm outline-none focus:border-rood placeholder:text-white/30"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-full border border-rand px-3 py-2 text-sm">
                    <input type="checkbox" name="zichtbaar" value="aan" defaultChecked={item.zichtbaar} className="peer sr-only" />
                    <Eye className="hidden size-4 text-emerald-400 peer-checked:block" aria-hidden />
                    <EyeOff className="size-4 text-zacht peer-checked:hidden" aria-hidden />
                    <span className="peer-checked:hidden">Verborgen</span>
                    <span className="hidden peer-checked:inline">Zichtbaar</span>
                  </label>

                  <button type="submit" disabled={bezig} className="rounded-full bg-rood px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-rood-donker disabled:opacity-50">
                    Opslaan
                  </button>

                  <div className="ml-auto flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Naar boven"
                      disabled={i === 0 || bezig}
                      onClick={() => startOvergang(async () => naAfloop(await verplaatsFoto(item.id, 'omhoog')))}
                      className="grid size-9 place-items-center rounded-full border border-rand transition-colors hover:bg-white/10 disabled:opacity-30"
                    >
                      <ArrowUp className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      aria-label="Naar beneden"
                      disabled={i === items.length - 1 || bezig}
                      onClick={() => startOvergang(async () => naAfloop(await verplaatsFoto(item.id, 'omlaag')))}
                      className="grid size-9 place-items-center rounded-full border border-rand transition-colors hover:bg-white/10 disabled:opacity-30"
                    >
                      <ArrowDown className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      aria-label="Verwijderen"
                      disabled={bezig}
                      onClick={() => {
                        if (!confirm(`"${item.titel || 'Deze foto'}" verwijderen?`)) return
                        startOvergang(async () => naAfloop(await verwijderFoto(item.id)))
                      }}
                      className="grid size-9 place-items-center rounded-full border border-rand text-rood transition-colors hover:bg-rood hover:text-white disabled:opacity-30"
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
