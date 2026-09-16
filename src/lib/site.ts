import {
  Brain,
  Briefcase,
  Building2,
  Calculator,
  ChartColumn,
  Cloud,
  Database,
  Factory,
  FileSearch,
  FileText,
  Cpu,
  GraduationCap,
  Handshake,
  HardHat,
  HeartPulse,
  Hotel,
  House,
  Landmark,
  Lock,
  Network,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Target,
  Truck,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

/**
 * Inhoud van de publieke website (de voorkant van mijnoliver.nl voor wie niet
 * is ingelogd). Bewust hoogover: geen productnamen en geen opsomming van de
 * huidige tools, maar wat Oliver Intelligence in het algemeen doet. De
 * concrete tools komen alleen terug als voorbeelden onder TOEPASSINGEN.
 */

export const BEDRIJFSNAAM = 'Oliver Intelligence'

export type Item = { titel: string; tekst: string; icoon: LucideIcon }

export type Dienst = Item & { sleutel: string; lang: string; punten: string[] }

export const DIENSTEN: Dienst[] = [
  {
    sleutel: 'data',
    titel: 'Data samenbrengen',
    icoon: Database,
    tekst: 'Interne gegevens, documenten en openbare registers gekoppeld tot één betrouwbaar beeld.',
    lang:
      'Waardevolle informatie zit vaak verspreid over systemen, spreadsheets, documenten en externe bronnen. Wij brengen die samen, schonen ze op en koppelen ze aan elkaar. Zo ontstaat één betrouwbare basis waarop u kunt analyseren, rekenen en beslissen.',
    punten: [
      'Koppelingen met openbare registers en open data',
      'Opschonen, ontdubbelen en verrijken van gegevens',
      'Eén bron van waarheid in plaats van losse bestanden',
    ],
  },
  {
    sleutel: 'analyse',
    titel: 'Analyse & inzicht',
    icoon: ChartColumn,
    tekst: 'Dashboards, kaarten en analyses die laten zien wat er speelt en waar kansen liggen.',
    lang:
      'Cijfers worden pas waardevol als ze iets vertellen. Wij vertalen gegevens naar overzichtelijke dashboards, kaarten en analyses, afgestemd op de vragen die in uw organisatie spelen. Zo ziet u in één oogopslag waar u moet ingrijpen of kunt groeien.',
    punten: [
      'Interactieve dashboards en kaartweergaven',
      'Segmentatie, filters en prioritering',
      'Inzichten die aansluiten op uw eigen KPI’s',
    ],
  },
  {
    sleutel: 'documenten',
    titel: 'Slimme documentverwerking',
    icoon: FileSearch,
    tekst: 'AI die documenten leest, ordent en de relevante informatie eruit haalt.',
    lang:
      'Veel kenniswerk bestaat uit het doorlezen, sorteren en overtypen van documenten. Met AI automatiseren we dat voorwerk: stukken worden herkend en geclassificeerd, en de relevante gegevens komen gestructureerd beschikbaar. Uw specialisten houden tijd over voor het echte werk.',
    punten: [
      'Automatische herkenning en classificatie',
      'Gegevens uit documenten gestructureerd vastleggen',
      'Dossiers overzichtelijk op één plek',
    ],
  },
  {
    sleutel: 'modellen',
    titel: 'Rekenmodellen & risicoanalyse',
    icoon: Calculator,
    tekst: 'Complexe berekeningen vastgelegd in modellen die consistent en controleerbaar zijn.',
    lang:
      'Waar veel rekenwerk handmatig gebeurt, sluipen fouten en verschillen in. Wij leggen vakkennis vast in rekenmodellen met ingebouwde controles. Het resultaat is een uitkomst die elke keer op dezelfde manier tot stand komt, en die u stap voor stap kunt verantwoorden.',
    punten: [
      'Vakinhoudelijke methodes vertaald naar software',
      'Ingebouwde kruiscontroles en signalering',
      'Scenario’s en gevoeligheden doorrekenen',
    ],
  },
  {
    sleutel: 'rapportage',
    titel: 'Automatische rapportage',
    icoon: FileText,
    tekst: 'Van gegevens naar een helder rapport of advies, in een fractie van de tijd.',
    lang:
      'Rapporten schrijven kost veel tijd, terwijl een groot deel steeds terugkeert. Wij genereren conceptrapportages op basis van de gegevens en analyses in uw dossier. De professional vult aan, scherpt aan en geeft het definitieve oordeel.',
    punten: [
      'Conceptrapporten in uw eigen opzet en huisstijl',
      'Onderbouwing direct gekoppeld aan de bron',
      'De professional houdt het laatste woord',
    ],
  },
  {
    sleutel: 'markt',
    titel: 'Markt- & doelgroepinzicht',
    icoon: Target,
    tekst: 'Weten waar uw doelgroep zit, en wie u als eerste moet benaderen.',
    lang:
      'Gericht groeien begint met weten wie uw potentiële klanten zijn. Wij combineren bedrijfsgegevens, vastgoedinformatie en open data tot doelgroepoverzichten en werklijsten. Zo besteden commerciële teams hun tijd aan de organisaties met de meeste kans.',
    punten: [
      'Doelgroepen in kaart op basis van openbare gegevens',
      'Scores en prioriteiten per organisatie of locatie',
      'Direct bruikbaar als werkvoorraad voor sales',
    ],
  },
]

export const SECTOREN: Item[] = [
  { titel: 'Financiële dienstverlening', icoon: Landmark, tekst: 'Banken, verzekeraars en adviseurs' },
  { titel: 'Juridisch', icoon: Scale, tekst: 'Advocatuur, schaderegeling en expertise' },
  { titel: 'Energie & duurzaamheid', icoon: Zap, tekst: 'Energieadvies, installatie en verduurzaming' },
  { titel: 'Vastgoed & wonen', icoon: House, tekst: 'Beheer, beleggers en woningcorporaties' },
  { titel: 'Zakelijke dienstverlening', icoon: Briefcase, tekst: 'Accountancy, consultancy en administratie' },
  { titel: 'Overheid & publieke sector', icoon: Building2, tekst: 'Gemeenten, provincies en uitvoeringsorganisaties' },
  { titel: 'Zorg & welzijn', icoon: HeartPulse, tekst: 'Zorgaanbieders en arbodienstverlening' },
  { titel: 'Bouw & installatie', icoon: HardHat, tekst: 'Aannemers, installateurs en toeleveranciers' },
  { titel: 'Industrie & productie', icoon: Factory, tekst: 'Maakbedrijven en procesindustrie' },
  { titel: 'Transport & logistiek', icoon: Truck, tekst: 'Vervoerders, warehousing en distributie' },
  { titel: 'Retail & handel', icoon: ShoppingBag, tekst: 'Groothandel, detailhandel en e-commerce' },
  { titel: 'Agri & food', icoon: Sprout, tekst: 'Agrarische bedrijven en voedingsindustrie' },
  { titel: 'Onderwijs', icoon: GraduationCap, tekst: 'Scholen, opleiders en kennisinstellingen' },
  { titel: 'ICT & telecom', icoon: Cpu, tekst: 'Softwarebedrijven, IT-dienstverleners en netwerken' },
  { titel: 'Horeca & recreatie', icoon: Hotel, tekst: 'Hotels, restaurants en vrijetijdsbedrijven' },
  { titel: 'Maatschappelijke organisaties', icoon: Users, tekst: 'Stichtingen, verenigingen en brancheorganisaties' },
]

export const TECHNOLOGIE: Item[] = [
  {
    titel: 'Kunstmatige intelligentie',
    icoon: Brain,
    tekst: 'Taalmodellen en machine learning, ingezet waar ze echt tijd besparen.',
  },
  {
    titel: 'Open data & registers',
    icoon: Network,
    tekst: 'Koppelingen met openbare bronnen over bedrijven, gebouwen en gebieden.',
  },
  {
    titel: 'Procesautomatisering',
    icoon: Workflow,
    tekst: 'Terugkerende stappen geautomatiseerd, van invoer tot rapport.',
  },
  {
    titel: 'Veilig in de cloud',
    icoon: Cloud,
    tekst: 'Alles in de browser, met toegang per persoon en per omgeving.',
  },
]

export type Toepassing = { titel: string; tekst: string }

/** Concrete voorbeelden, afgeleid van de bestaande tools maar zonder productnamen. */
export const TOEPASSINGEN: Toepassing[] = [
  {
    titel: 'Risicoprofielen doorrekenen',
    tekst: 'Jaarcijfers omzetten in een onderbouwd risicoprofiel, inclusief controle op onderverzekering.',
  },
  {
    titel: 'Deskundigenrapporten voorbereiden',
    tekst: 'Dossierstukken automatisch ordenen en een conceptrapport opstellen voor de specialist.',
  },
  {
    titel: 'Wettelijke verplichtingen signaleren',
    tekst: 'Panden en organisaties vinden die nog niet aan een verplichting voldoen.',
  },
  {
    titel: 'Doelgroepen op de kaart',
    tekst: 'Bedrijfsgegevens en open data combineren tot een geprioriteerde acquisitielijst.',
  },
]

export type Stap = { titel: string; tekst: string }

export const WERKWIJZE: Stap[] = [
  {
    titel: 'Verkennen',
    tekst: 'We brengen uw vraagstuk, processen en beschikbare gegevens in kaart.',
  },
  {
    titel: 'Ontwerpen',
    tekst: 'We bepalen welke data, analyses en automatisering de meeste waarde opleveren.',
  },
  {
    titel: 'Bouwen & inrichten',
    tekst: 'U krijgt een eigen omgeving, afgestemd op uw werk en uw gebruikers.',
  },
  {
    titel: 'Doorontwikkelen',
    tekst: 'Op basis van het gebruik in de praktijk verbeteren en breiden we verder uit.',
  },
]

export const PRINCIPES: Item[] = [
  {
    titel: 'Herleidbaar',
    icoon: ShieldCheck,
    tekst: 'Elke uitkomst is terug te voeren op de bron en de berekening, zodat u hem kunt uitleggen.',
  },
  {
    titel: 'De mens beslist',
    icoon: Handshake,
    tekst: 'Technologie bereidt voor en rekent door. Het oordeel blijft bij de professional.',
  },
  {
    titel: 'Zorgvuldig met gegevens',
    icoon: Lock,
    tekst: 'Toegang per persoon en per omgeving. U ziet alleen wat voor u bedoeld is.',
  },
  {
    titel: 'Vakkennis centraal',
    icoon: Target,
    tekst: 'Geen generieke software, maar oplossingen die aansluiten op hoe uw vak werkt.',
  },
]

export type Vraag = { vraag: string; antwoord: string }

export const VRAGEN: Vraag[] = [
  {
    vraag: 'Voor welke organisaties is Oliver Intelligence geschikt?',
    antwoord:
      'Voor elke organisatie die veel werkt met gegevens, documenten of berekeningen en daar sneller en consistenter in wil worden. De sector maakt daarbij weinig uit: de aanpak is steeds dezelfde.',
  },
  {
    vraag: 'Moet ik iets installeren?',
    antwoord:
      'Nee. Alle omgevingen draaien in de browser. U logt in via mijnoliver.nl en ziet daar de omgevingen waar u toegang toe hebt.',
  },
  {
    vraag: 'Werken jullie met bestaande oplossingen of met maatwerk?',
    antwoord:
      'Allebei. Een aantal toepassingen is direct beschikbaar; waar uw vraagstuk daar niet in past, richten we een omgeving op maat in.',
  },
  {
    vraag: 'Waar komen de gegevens vandaan?',
    antwoord:
      'Uit uw eigen documenten en systemen, aangevuld met openbare bronnen zoals het Handelsregister, de BAG en CBS-cijfers, afhankelijk van het vraagstuk.',
  },
  {
    vraag: 'Hoe begin ik?',
    antwoord:
      'Stuur ons een bericht via het contactformulier. In een eerste gesprek verkennen we uw vraagstuk en laten we zien wat mogelijk is.',
  },
]
