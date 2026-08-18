/**
 * De tools die onder het MijnOliver-portaal hangen. De sleutel (`slug`) is
 * ook de waarde die in de `toegang`-tabel staat, dus die verandert niet
 * zomaar: pas je hem aan, dan hoort daar een migratie bij.
 *
 * De URL's staan in env-variabelen zodat je lokaal naar een dev-server kunt
 * wijzen zonder de code te wijzigen.
 */
export type ToolSlug = 'risk' | 'bb'

export type Tool = {
  slug: ToolSlug
  naam: string
  omschrijving: string
  url: string
}

export const TOOLS: Tool[] = [
  {
    slug: 'risk',
    naam: 'Risk',
    omschrijving:
      'Bedrijfsschadeprofiel: brutowinst, kruiscontrole, uitkeringstermijn en onderverzekeringstoets.',
    url: process.env.NEXT_PUBLIC_URL_RISK ?? 'https://risk.mijnoliver.nl',
  },
  {
    slug: 'bb',
    naam: 'BB',
    omschrijving:
      'Bedrijfskundige rapportages bij letselschade: dossiers, documentclassificatie en conceptrapportages.',
    url: process.env.NEXT_PUBLIC_URL_BB ?? 'https://bb.mijnoliver.nl',
  },
]

export function vindTool(slug: string): Tool | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}
