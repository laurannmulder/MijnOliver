import { beeldUrl, haalProducties } from './opslag'
import { producties as meegeleverd } from './inhoud'

export type GetoondeProductie = {
  id: string
  src: string
  titel: string
  soort: string
  breedte: number
  hoogte: number
  blur?: string
}

/**
 * De foto's zoals bezoekers ze zien: uit het beheer, en anders de foto's die
 * met de site zijn meegeleverd. Zo staat de pagina nooit leeg, ook niet als de
 * opslag onbereikbaar is of het beheer nog niet gebruikt is.
 */
export async function haalGetoondeProducties(): Promise<GetoondeProductie[]> {
  const beheerd = await haalProducties()

  if (beheerd?.length) {
    return beheerd
      .filter((p) => p.zichtbaar)
      .map((p) => ({
        id: p.id,
        src: beeldUrl(p.bestand),
        titel: p.titel,
        soort: p.soort,
        breedte: p.breedte,
        hoogte: p.hoogte,
      }))
  }

  return meegeleverd.map((p) => ({
    id: p.titel,
    src: p.beeld.src,
    titel: p.titel,
    soort: p.soort,
    breedte: p.beeld.width,
    hoogte: p.beeld.height,
    blur: p.beeld.blurDataURL,
  }))
}
