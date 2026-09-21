// De site draait als preview onder mijnoliver.nl/unitedvisions. Alle interne
// links en de video's in public/unitedvisions/ gaan via dit voorvoegsel; op een
// eigen domein wordt dit ''.
export const BASIS = '/unitedvisions'

export function publiek(bestand: string) {
  return `${BASIS}/${bestand.replace(/^\//, '')}`
}
