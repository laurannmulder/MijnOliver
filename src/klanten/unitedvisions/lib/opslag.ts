import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Productiefoto's die de eigenaar zelf beheert.
 *
 * Opzet: de foto's staan in de Supabase-opslag (bucket `unitedvisions`) en de
 * volgorde met bijschriften in één JSON-bestand in diezelfde bucket. Zo werkt
 * het beheer zonder migratie in de database. Bevalt het, dan verhuist deze
 * index naar een echte tabel; alleen dit bestand verandert dan mee.
 */

export const BUCKET = 'unitedvisions'
export const INDEX = 'producties.json'

export type Productie = {
  id: string
  bestand: string
  titel: string
  soort: string
  breedte: number
  hoogte: number
  zichtbaar: boolean
}

export function beeldUrl(bestand: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${bestand}`
}

export const PRODUCTIES_TAG = 'uv-producties'

/**
 * Leest de index via de publieke URL, zodat het antwoord in de Next-cache komt
 * en niet bij elke bezoeker opnieuw bij Supabase wordt opgehaald. Na een
 * wijziging in het beheer maakt `updateTag(PRODUCTIES_TAG)` de cache leeg.
 */
export async function haalProducties(): Promise<Productie[] | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null
  try {
    const res = await fetch(beeldUrl(INDEX), { next: { tags: [PRODUCTIES_TAG], revalidate: 3600 } })
    if (!res.ok) return null
    const data = (await res.json()) as { items?: Productie[] }
    return data.items ?? null
  } catch (fout) {
    // Valt de opslag uit, dan tonen de pagina's de meegeleverde foto's.
    console.error('United Visions: producties ophalen mislukt:', fout)
    return null
  }
}

/** Alleen voor het beheer: altijd vers, inclusief verborgen foto's. */
export async function haalProductiesVers(): Promise<Productie[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase.storage.from(BUCKET).download(INDEX)
  if (error || !data) return []
  const json = JSON.parse(await data.text()) as { items?: Productie[] }
  return json.items ?? []
}

export async function bewaarProducties(items: Productie[]) {
  const supabase = createAdminClient()
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(INDEX, JSON.stringify({ items }, null, 2), {
      upsert: true,
      contentType: 'application/json',
      cacheControl: '60',
    })
  if (error) throw new Error(`Opslaan van de volgorde mislukte: ${error.message}`)
}
