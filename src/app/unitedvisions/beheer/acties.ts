'use server'

// updateTag (Next.js 16) maakt de cache meteen leeg; revalidateTag met één
// argument is afgeschaft en zou pas bij het volgende bezoek verversen.
import { updateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { huidigeGebruiker } from '@/lib/gebruiker'
import {
  BUCKET,
  PRODUCTIES_TAG,
  bewaarProducties,
  haalProductiesVers,
  type Productie,
} from '@/klanten/unitedvisions/lib/opslag'

export type Uitkomst = { fout?: string; gelukt?: string }

/**
 * Elke actie controleert zelf of je beheerder bent. Een server action is een
 * gewoon endpoint: wie het adres kent kan hem aanroepen, dus de controle in de
 * pagina alleen is niet genoeg.
 */
async function vereistBeheerder() {
  const gebruiker = await huidigeGebruiker()
  if (!gebruiker?.isBeheerder) throw new Error('Geen toegang.')
  return gebruiker
}

const MAX_BYTES = 8 * 1024 * 1024
const TOEGESTAAN = ['image/webp', 'image/jpeg', 'image/png']

export async function voegFotoToe(_vorige: Uitkomst, formData: FormData): Promise<Uitkomst> {
  try {
    await vereistBeheerder()

    const bestand = formData.get('foto')
    if (!(bestand instanceof File) || bestand.size === 0) return { fout: 'Kies eerst een foto.' }
    if (!TOEGESTAAN.includes(bestand.type)) return { fout: 'Alleen JPG-, PNG- of WEBP-bestanden.' }
    // De browser verkleint de foto al; deze grens vangt het geval af dat dat mislukt.
    if (bestand.size > MAX_BYTES) return { fout: 'Deze foto is te groot (meer dan 8 MB).' }

    const titel = String(formData.get('titel') ?? '').trim().slice(0, 120)
    const soort = String(formData.get('soort') ?? '').trim().slice(0, 60)
    const breedte = Number(formData.get('breedte')) || 1600
    const hoogte = Number(formData.get('hoogte')) || 1200

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const extensie = bestand.type === 'image/png' ? 'png' : bestand.type === 'image/jpeg' ? 'jpg' : 'webp'
    const pad = `producties/${id}.${extensie}`

    const supabase = createAdminClient()
    const { error } = await supabase.storage.from(BUCKET).upload(pad, bestand, {
      contentType: bestand.type,
      cacheControl: '31536000',
    })
    if (error) return { fout: `Uploaden mislukte: ${error.message}` }

    const items = await haalProductiesVers()
    const nieuw: Productie = { id, bestand: pad, titel, soort, breedte, hoogte, zichtbaar: true }
    await bewaarProducties([nieuw, ...items])
    updateTag(PRODUCTIES_TAG)
    return { gelukt: 'De foto staat op de site.' }
  } catch (fout) {
    console.error('United Visions beheer, toevoegen:', fout)
    return { fout: 'Er ging iets mis bij het toevoegen.' }
  }
}

export async function werkFotoBij(_vorige: Uitkomst, formData: FormData): Promise<Uitkomst> {
  try {
    await vereistBeheerder()
    const id = String(formData.get('id') ?? '')
    const items = await haalProductiesVers()
    const rij = items.find((i) => i.id === id)
    if (!rij) return { fout: 'Deze foto bestaat niet meer.' }

    rij.titel = String(formData.get('titel') ?? '').trim().slice(0, 120)
    rij.soort = String(formData.get('soort') ?? '').trim().slice(0, 60)
    rij.zichtbaar = formData.get('zichtbaar') === 'aan'

    await bewaarProducties(items)
    updateTag(PRODUCTIES_TAG)
    return { gelukt: 'Opgeslagen.' }
  } catch (fout) {
    console.error('United Visions beheer, bijwerken:', fout)
    return { fout: 'Opslaan is niet gelukt.' }
  }
}

export async function verplaatsFoto(id: string, richting: 'omhoog' | 'omlaag'): Promise<Uitkomst> {
  try {
    await vereistBeheerder()
    const items = await haalProductiesVers()
    const i = items.findIndex((r) => r.id === id)
    const j = richting === 'omhoog' ? i - 1 : i + 1
    if (i === -1 || j < 0 || j >= items.length) return {}

    ;[items[i], items[j]] = [items[j], items[i]]
    await bewaarProducties(items)
    updateTag(PRODUCTIES_TAG)
    return { gelukt: 'Volgorde aangepast.' }
  } catch (fout) {
    console.error('United Visions beheer, verplaatsen:', fout)
    return { fout: 'Verplaatsen is niet gelukt.' }
  }
}

export async function verwijderFoto(id: string): Promise<Uitkomst> {
  try {
    await vereistBeheerder()
    const items = await haalProductiesVers()
    const rij = items.find((r) => r.id === id)
    if (!rij) return {}

    const supabase = createAdminClient()
    // Eerst de index bijwerken: blijft het bestand hangen, dan is dat hooguit
    // verspilde opslag. Andersom zou de site naar een weggegooide foto wijzen.
    await bewaarProducties(items.filter((r) => r.id !== id))
    await supabase.storage.from(BUCKET).remove([rij.bestand])
    updateTag(PRODUCTIES_TAG)
    return { gelukt: 'Foto verwijderd.' }
  } catch (fout) {
    console.error('United Visions beheer, verwijderen:', fout)
    return { fout: 'Verwijderen is niet gelukt.' }
  }
}
