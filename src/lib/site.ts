/**
 * Inhoud van de publieke website (de voorkant van mijnoliver.nl voor wie niet
 * is ingelogd). Staat los van `tools.ts`: dit is wat een bezoeker leest, en
 * daar noemen we bewust geen productnamen. Nieuwe tool erbij? Voeg hier een
 * werkterrein toe of breid een bestaand terrein uit.
 */

export const BEDRIJFSNAAM = 'Oliver Intelligence'

export type Werkterrein = {
  sleutel: string
  titel: string
  kort: string
  lang: string
  punten: string[]
  voorWie: string
}

export const WERKTERREINEN: Werkterrein[] = [
  {
    sleutel: 'bedrijfsschade',
    titel: 'Bedrijfsschade & verzekeringen',
    kort:
      'Een onderbouwd bedrijfsschadeprofiel: van brutowinst tot uitkeringstermijn, met een toets op onderverzekering.',
    lang:
      'Bij bedrijfsschade draait alles om de vraag wat een onderneming misloopt als de bedrijfsvoering stilvalt. Wij zetten jaarcijfers om in een helder profiel: de verzekerbare brutowinst, een kruiscontrole op de uitkomst, een passende uitkeringstermijn en een toets of het verzekerde bedrag nog aansluit bij de werkelijkheid.',
    punten: [
      'Brutowinst bepalen volgens een vaste, controleerbare methode',
      'Kruiscontrole zodat rekenfouten en uitschieters opvallen',
      'Uitkeringstermijn afgestemd op de herstelduur van het bedrijf',
      'Onderverzekeringstoets voordat er een schade is',
    ],
    voorWie: 'Assurantieadviseurs, risicomanagers en ondernemers',
  },
  {
    sleutel: 'letselschade',
    titel: 'Letselschade & bedrijfskunde',
    kort:
      'Bedrijfskundige rapportages bij letselschade, sneller en consistenter opgesteld.',
    lang:
      'Als een ondernemer letsel oploopt, moet worden vastgesteld wat dat betekent voor het bedrijf en het inkomen. Dat vraagt om veel dossierwerk. Wij ondersteunen het hele traject: documenten ordenen en classificeren, de relevante cijfers eruit halen en een conceptrapportage opstellen die de deskundige verder aanvult.',
    punten: [
      'Dossiers overzichtelijk op één plek',
      'Automatische classificatie van aangeleverde documenten',
      'Conceptrapportages op basis van de dossierstukken',
      'De deskundige houdt de regie en het laatste woord',
    ],
    voorWie: 'Bedrijfskundig rekenaars, letselschadebureaus en verzekeraars',
  },
  {
    sleutel: 'energie',
    titel: 'Energie & vastgoed',
    kort:
      'Inzicht in kantoorpanden met een openstaande energielabelverplichting, per gebied, label en oppervlakte.',
    lang:
      'Kantoren moeten aan een minimaal energielabel voldoen, en lang niet elk pand doet dat. Wij brengen in kaart welke panden nog niet aan de verplichting voldoen, zodat adviseurs en installateurs gericht eigenaren kunnen benaderen die verduurzaming op hun agenda hebben of zouden moeten hebben.',
    punten: [
      'Zoeken op gebied, energielabel en oppervlakte',
      'Gebaseerd op openbare pand- en labelgegevens',
      'Direct bruikbaar als werkvoorraad voor advies of acquisitie',
    ],
    voorWie: 'Energieadviseurs, installateurs en vastgoedpartijen',
  },
  {
    sleutel: 'markt',
    titel: 'Bedrijfsgegevens & marktinzicht',
    kort:
      'Organisaties in uw doelgroep vinden en verrijken met gegevens uit het Handelsregister en open data.',
    lang:
      'Wie weet waar zijn doelgroep zit, verkoopt gerichter. Wij koppelen gegevens uit het Handelsregister aan open bronnen zoals de BAG en CBS-cijfers. Het resultaat is een kaart of lijst van organisaties die er voor u toe doen, met de gegevens die nodig zijn om ze te benaderen.',
    punten: [
      'Koppeling met het Handelsregister van de KVK',
      'Verrijking met open data over panden en buurten',
      'Doelgroepen op de kaart, met filters en prioritering',
    ],
    voorWie: 'Beheerders, dienstverleners en commerciële teams',
  },
]

export type Stap = { titel: string; tekst: string }

export const WERKWIJZE: Stap[] = [
  {
    titel: 'Kennismaken',
    tekst: 'We bespreken welk vraagstuk u wilt oplossen en welke gegevens daarbij horen.',
  },
  {
    titel: 'Toegang op maat',
    tekst: 'U krijgt een eigen account met toegang tot precies de omgevingen die u nodig hebt.',
  },
  {
    titel: 'Aan de slag',
    tekst: 'U werkt direct in de browser. Geen installatie, geen eigen servers.',
  },
  {
    titel: 'Samen verbeteren',
    tekst: 'Uw ervaringen uit de praktijk nemen we mee in de volgende versies.',
  },
]

export type Principe = { titel: string; tekst: string }

export const PRINCIPES: Principe[] = [
  {
    titel: 'Herleidbaar',
    tekst:
      'Elke uitkomst is terug te voeren op de bron en de berekening. U moet een conclusie kunnen uitleggen aan uw klant.',
  },
  {
    titel: 'De mens beslist',
    tekst:
      'Onze tools bereiden voor en rekenen door. Het oordeel blijft bij de professional die het dossier kent.',
  },
  {
    titel: 'Zorgvuldig met gegevens',
    tekst:
      'Toegang is per persoon en per omgeving geregeld. U ziet alleen wat voor u bedoeld is.',
  },
  {
    titel: 'Gebouwd voor de praktijk',
    tekst:
      'Geen generieke software, maar tools voor een specifiek vakgebied, ontwikkeld met mensen uit dat vak.',
  },
]

export type Vraag = { vraag: string; antwoord: string }

export const VRAGEN: Vraag[] = [
  {
    vraag: 'Moet ik iets installeren?',
    antwoord:
      'Nee. Alle omgevingen draaien in de browser. U logt in via mijnoliver.nl en ziet daar de omgevingen waar u toegang toe hebt.',
  },
  {
    vraag: 'Kan ik één onderdeel gebruiken zonder de rest?',
    antwoord:
      'Ja. Toegang wordt per omgeving geregeld, dus u gebruikt alleen wat past bij uw werk.',
  },
  {
    vraag: 'Waar komen de gegevens vandaan?',
    antwoord:
      'Dat hangt af van het werkterrein: uw eigen dossierstukken en jaarcijfers, of openbare bronnen zoals het Handelsregister, de BAG, CBS-cijfers en energielabels.',
  },
  {
    vraag: 'Hoe krijg ik toegang?',
    antwoord:
      'Neem contact met ons op. Na een kort gesprek ontvangt u een uitnodiging per e-mail om uw account te activeren.',
  },
]
