import type { StaticImageData } from 'next/image'

import podiumWidescreen from '@/klanten/unitedvisions/beeld/podium-widescreen.jpg'
import theaterRegie from '@/klanten/unitedvisions/beeld/theater-regie.jpg'
import kerkDiner from '@/klanten/unitedvisions/beeld/kerk-diner.jpg'
import kerkRegie from '@/klanten/unitedvisions/beeld/kerk-regie.jpg'
import buitenLedscherm from '@/klanten/unitedvisions/beeld/buiten-ledscherm.jpg'
import loungeLicht from '@/klanten/unitedvisions/beeld/lounge-licht.jpg'
import stadion from '@/klanten/unitedvisions/beeld/stadion.jpg'
import cameraRegistratie from '@/klanten/unitedvisions/beeld/camera-registratie.jpg'
import eventproductions from '@/klanten/unitedvisions/beeld/eventproductions.jpg'
import zaalDiner from '@/klanten/unitedvisions/beeld/zaal-diner.jpg'
import uitvaartTechniek from '@/klanten/unitedvisions/beeld/uitvaart-techniek.jpg'
import congresZaal from '@/klanten/unitedvisions/beeld/congres-zaal.jpg'
import zaalLounge from '@/klanten/unitedvisions/beeld/zaal-lounge.jpg'
import ledschermTrailer from '@/klanten/unitedvisions/beeld/ledscherm-trailer.jpg'
import regietafel from '@/klanten/unitedvisions/beeld/regietafel.jpg'
import livestreamRegie from '@/klanten/unitedvisions/beeld/livestream-regie.jpg'
import livestreamLaptop from '@/klanten/unitedvisions/beeld/livestream-laptop.jpg'
import livestreamSet from '@/klanten/unitedvisions/beeld/livestream-set.jpg'
import livestreamOperator from '@/klanten/unitedvisions/beeld/livestream-operator.jpg'
import studio from '@/klanten/unitedvisions/beeld/studio.jpg'
import studioBreed from '@/klanten/unitedvisions/beeld/studio-breed.jpg'
import podcast from '@/klanten/unitedvisions/beeld/podcast.jpg'
import microfoons from '@/klanten/unitedvisions/beeld/microfoons.jpg'
import cameraPubliek from '@/klanten/unitedvisions/beeld/camera-publiek.jpg'
import spot from '@/klanten/unitedvisions/beeld/spot.jpg'
import teamPatrick from '@/klanten/unitedvisions/beeld/team-patrick.jpg'
import teamJorrit from '@/klanten/unitedvisions/beeld/team-jorrit.jpg'
import teamRomy from '@/klanten/unitedvisions/beeld/team-romy.jpg'
import teamFrank from '@/klanten/unitedvisions/beeld/team-frank.jpg'

export const bedrijf = {
  naam: 'United Visions',
  plaats: 'Groningen',
  telefoon: '050 - 313 57 57',
  telefoonLink: '+31503135757',
  email: 'info@unitedvisions.nl',
  livestreamPortaal: 'https://livestream.unitedvisions.nl/',
  instagram: 'https://www.instagram.com/unitedvisionsevents/',
  facebook: 'https://www.facebook.com/unitedvisionslive',
}

// Keuzes in het contactformulier. Niet in actions.ts: een 'use server'-bestand
// mag alleen async functies exporteren.
export const ONDERWERPEN = ['Event', 'Livestream', 'Studio', 'Podcast', 'Iets anders']

export const disciplines = [
  'Licht',
  'Geluid',
  'Beeld',
  'LED-schermen',
  'Livestreams',
  "Studio's",
  'Podcasts',
  'Decor',
]

export type Onderdeel = { titel: string; tekst: string }

export type Dienst = {
  slug: string
  nummer: string
  titel: string
  kort: string
  kop: string
  intro: string[]
  video: string
  beeld: StaticImageData
  onderdelenKop: string
  onderdelen: Onderdeel[]
  galerij: { beeld: StaticImageData; alt: string }[]
}

export const diensten: Dienst[] = [
  {
    slug: 'events',
    nummer: '01',
    titel: 'Events',
    kort: 'Licht, geluid, beeld en decor voor beurzen, congressen, openingen, galadiners en presentaties.',
    kop: 'Een evenement valt of staat met de techniek.',
    intro: [
      'Het juiste licht zet de sfeer, het geluid moet kraakhelder zijn en met het juiste beeld geeft u uw verhaal extra kracht. Techniek bepaalt voor een groot deel wat uw bezoekers ervaren.',
      'Wij denken mee vanaf het concept, bereiden alles voor, verzorgen de techniek tijdens het evenement en zorgen voor een vlekkeloze op- en afbouw. Wilt u vooraf zeker weten dat alles klopt? Dan testen we de opstelling eerst in één van onze studio’s.',
    ],
    video: 'opkomstmeneerpodium.mp4',
    beeld: podiumWidescreen,
    onderdelenKop: 'Alles voor een complete productie',
    onderdelen: [
      {
        titel: 'Beeld',
        tekst:
          'LED-schermen in verschillende formaten, van een scherm naast het podium tot een complete LED-wand. We spelen voorbereide video’s af of brengen een live registratie naar meerdere zalen, inclusief opname, weergave en videoregie.',
      },
      {
        titel: 'Licht',
        tekst:
          'Van showlicht op het podium tot het uitlichten van uw beursstand. Elk evenement vraagt om ander licht: wij maken het lichtplan en voeren het uit.',
      },
      {
        titel: 'Geluid',
        tekst:
          'Op een seminar moet iedere spreker verstaanbaar zijn, op een feest draait het om het volume en live muziek. Met onze Bose-systemen en de juiste audioregie verdelen we het geluid gelijkmatig over alle ruimtes.',
      },
      {
        titel: 'Decor',
        tekst:
          'Aankleding en decor tillen een evenement naar een hoger niveau. Welk thema u ook voor ogen heeft, we denken mee over het concept en de uitvoering.',
      },
    ],
    galerij: [
      { beeld: theaterRegie, alt: 'Theaterzaal met regietafels op de voorgrond en een groot projectiescherm op het podium' },
      { beeld: kerkDiner, alt: 'Galadiner in een kerk, uitgelicht in paars en roze' },
      { beeld: buitenLedscherm, alt: 'Groot LED-scherm aan een monumentaal gebouw met publiek op straat' },
      { beeld: loungeLicht, alt: 'Lounge met rood uitgelichte statafels' },
    ],
  },
  {
    slug: 'livestreams',
    nummer: '02',
    titel: 'Livestreams',
    kort: 'Vergroot het bereik van uw evenement. Vanuit onze studio of live op uw eigen locatie.',
    kop: 'Iedereen erbij, ook op afstand.',
    intro: [
      'Met een livestream maakt u iedereen onderdeel van uw evenement, waar ze ook zijn. Met hoogwaardige apparatuur en de juiste regie verzorgen we een stream die er professioneel uitziet en stabiel blijft draaien, in één van onze studio’s of bij u op locatie.',
      'We registreren met 4K PTZ-camera’s en streamen in full HD via onze eigen zendmast. Is uw evenement besloten? Dan krijgen uw gasten een persoonlijke link en toegangscode. Dankzij onze on-demandservice kunnen zij de uitzending later nog eens terugkijken.',
    ],
    video: 'livestreams.mp4',
    beeld: livestreamRegie,
    onderdelenKop: 'Voor elk moment de juiste stream',
    onderdelen: [
      {
        titel: 'Webinar',
        tekst:
          'Eén spreker of panel, een groot online publiek. Met interactieve mogelijkheden communiceert u live met uw kijkers, vanuit onze studio of vanaf uw eigen locatie.',
      },
      {
        titel: 'Hybride events',
        tekst:
          'Publiek in de zaal én online. We zorgen dat beide groepen zich betrokken voelen, met interactie in twee richtingen.',
      },
      {
        titel: 'Uitvaart',
        tekst:
          'Niet iedereen kan altijd aanwezig zijn bij een afscheid. Met een ingetogen, professionele livestream kunnen familie en vrienden het op afstand toch meebeleven. Een taak die we met zorg en respect uitvoeren.',
      },
      {
        titel: 'Bruiloft',
        tekst:
          'Deel het ja-woord met iedereen die u lief is. We streamen de hele ceremonie, zodat gasten die er niet bij kunnen zijn live meekijken of het later terugzien.',
      },
    ],
    galerij: [
      { beeld: livestreamSet, alt: 'Livestreamopname met presentatoren aan tafel en een regiescherm' },
      { beeld: livestreamOperator, alt: 'Technicus achter de regietafel tijdens een livestream' },
      { beeld: livestreamLaptop, alt: 'Streamingsoftware op een laptop tijdens een uitzending' },
      { beeld: uitvaartTechniek, alt: 'Mobiele regieset voor livestreams op locatie' },
    ],
  },
  {
    slug: 'studio',
    nummer: '03',
    titel: "Studio's",
    kort: 'Professionele studio’s in hartje Groningen. Binnenlopen, plaatsnemen en live gaan.',
    kop: 'Uw eigen tv-studio, zonder gedoe.',
    intro: [
      'Een online evenement organiseren en live gaan op YouTube, Vimeo, Facebook of een ander platform? Gebruik één van onze professionele studio’s in hartje Groningen.',
      'De studio’s zijn strak ingericht, zodat u direct kunt beginnen. Wij regelen de techniek en zorgen dat de stream soepel verloopt. Wilt u een andere setting, van zakelijk tot huiselijk? Dan richten we de studio in zoals u dat wilt.',
    ],
    video: 'studios.mp4',
    beeld: studio,
    onderdelenKop: 'Standaard aan boord',
    onderdelen: [
      { titel: 'HD LED-wand van 12 m²', tekst: 'Een haarscherpe achtergrond voor presentaties, logo’s en live beeld.' },
      { titel: 'Green screen', tekst: 'Filmen met een virtuele achtergrond: elke omgeving die u maar wilt.' },
      { titel: '4K-camera’s', tekst: 'Meerdere camerastandpunten, live geregisseerd.' },
      { titel: 'LED-verlichting', tekst: 'Egaal, flatteus licht dat op camera goed uitkomt.' },
      { titel: 'Draadloze microfoons', tekst: 'Vrij bewegen zonder dat de kwaliteit van het geluid lijdt.' },
      { titel: 'Streaming in HD', tekst: 'Tegelijk naar meerdere platformen, stabiel en in hoge kwaliteit.' },
    ],
    galerij: [
      { beeld: studioBreed, alt: 'Studio met truss, LED-verlichting en United Visions-banner' },
      { beeld: eventproductions, alt: 'United Visions Eventproductions LED-scherm in een foyer' },
      { beeld: regietafel, alt: 'Technicus aan de regietafel' },
      { beeld: cameraPubliek, alt: 'Camera die een zaal met publiek registreert' },
    ],
  },
  {
    slug: 'podcasts',
    nummer: '04',
    titel: 'Podcasts',
    kort: 'Van idee tot publicatie. Opgenomen in onze podcaststudio of bij u op locatie.',
    kop: 'Goed verhaal, goed geluid.',
    intro: [
      'Een podcast luistert u waar en wanneer u wilt, en informatie blijft beter hangen als u ernaar luistert. Maak een informatieve, professionele podcast voor uw bedrijf of vereniging, of een podcast vol humor met vrienden. Het kan allemaal.',
      'Onze podcaststudio beschikt over hoogwaardige apparatuur en alle gemakken. Opnemen op locatie kan ook: dan bouwen we de studio bij u op.',
    ],
    video: 'podcasts.mp4',
    beeld: podcast,
    onderdelenKop: 'In vier stappen online',
    onderdelen: [
      { titel: 'Voorbereiding', tekst: 'We bespreken de podcast vooraf uitgebreid met u: vorm, lengte, gasten en toon.' },
      { titel: 'Opnemen', tekst: 'In onze studio, binnen uw bedrijf of bij u thuis.' },
      { titel: 'Bewerken', tekst: 'We monteren de opname en maken hem klaar voor publicatie.' },
      { titel: 'Online', tekst: 'Wij zetten de podcast online, of u krijgt de bestanden digitaal toegestuurd.' },
    ],
    galerij: [
      { beeld: microfoons, alt: 'Twee studiomicrofoons tegen een zwarte achtergrond' },
      { beeld: spot, alt: 'Studiospot met flappen' },
    ],
  },
]

export function vindDienst(slug: string) {
  return diensten.find((d) => d.slug === slug)
}

// Bijschriften beschrijven wat er te zien is; namen van klanten en locaties
// staan er bewust niet bij, die moet United Visions zelf aanleveren.
export const producties: { beeld: StaticImageData; titel: string; soort: string }[] = [
  { beeld: podiumWidescreen, titel: 'Widescreen op het podium', soort: 'Beeld · Licht' },
  { beeld: kerkDiner, titel: 'Galadiner in de kerk', soort: 'Licht · Geluid' },
  { beeld: buitenLedscherm, titel: 'LED-scherm op straat', soort: 'Beeld · Buitenevent' },
  { beeld: theaterRegie, titel: 'Congres in het theater', soort: 'Regie · Beeld · Geluid' },
  { beeld: stadion, titel: 'Stadionopstelling', soort: 'Geluid · Beeld' },
  { beeld: loungeLicht, titel: 'Lounge in rood licht', soort: 'Licht · Decor' },
  { beeld: livestreamSet, titel: 'Live talkshow', soort: 'Livestream · Studio' },
  { beeld: kerkRegie, titel: 'Regie achter de schermen', soort: 'Licht · Geluid' },
  { beeld: congresZaal, titel: 'Welkom op het congres', soort: 'Beeld · Geluid' },
  { beeld: zaalLounge, titel: 'Presentatie in de zaal', soort: 'Beeld · Licht' },
  { beeld: cameraRegistratie, titel: 'Registratie en livestream', soort: 'Livestream' },
  { beeld: zaalDiner, titel: 'Diner in de balzaal', soort: 'Geluid' },
  { beeld: ledschermTrailer, titel: 'Mobiel LED-scherm', soort: 'Beeld' },
  { beeld: eventproductions, titel: 'Eventproductions', soort: 'Beeld · Decor' },
]

// Rollen zoals op de huidige site (2020). Laten checken bij United Visions.
export const team = [
  { naam: 'Patrick Müller', rol: 'Managing Director', beeld: teamPatrick },
  { naam: 'Jorrit Ludolphy', rol: 'AV Manager', beeld: teamJorrit },
  { naam: 'Romy Müller', rol: 'New Media & Fotografie', beeld: teamRomy },
  { naam: 'Frank Wildeboer', rol: 'Webdesign', beeld: teamFrank },
]

export const werkwijze = [
  { titel: 'Concept', tekst: 'We denken vanaf het eerste idee met u mee. Wat moeten uw gasten voelen, zien en horen?' },
  { titel: 'Voorbereiding', tekst: 'Licht-, geluid- en beeldplan op maat. Waar nodig testen we het eerst in onze studio.' },
  { titel: 'Uitvoering', tekst: 'Onze technici en regisseurs zorgen tijdens het evenement dat alles klopt, tot op de seconde.' },
  { titel: 'Op- en afbouw', tekst: 'Vlekkeloos en op tijd, zodat u zich nergens zorgen over hoeft te maken.' },
]
