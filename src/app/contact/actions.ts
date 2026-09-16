'use server'

import { Resend } from 'resend'

// Het ontvangstadres staat alleen hier, server-side: zo komt het nooit in de
// HTML terecht en kunnen spambots het niet van de pagina schrapen.
const ONTVANGER = process.env.CONTACT_ONTVANGER ?? 'laura-ann.mulder@outlook.com'
// onboarding@resend.dev werkt zonder eigen domein, maar mailt alleen naar de
// eigenaar van het Resend-account. Met een geverifieerd mijnoliver.nl-domein
// kan hier bijvoorbeeld 'Oliver Intelligence <website@mijnoliver.nl>' staan.
const AFZENDER = process.env.RESEND_AFZENDER ?? 'Oliver Intelligence <onboarding@resend.dev>'

export type ContactWaarden = { naam: string; organisatie: string; email: string; bericht: string }

// Bij een fout gaan de ingevulde waarden mee terug: React leegt het formulier
// na elke action, en niemand wil zijn bericht opnieuw typen.
export type ContactStatus =
  | { soort: 'leeg' }
  | { soort: 'gelukt' }
  | { soort: 'fout'; melding: string; waarden: ContactWaarden }

const MAX = { naam: 200, organisatie: 200, email: 320, bericht: 5000 }

function veld(formData: FormData, naam: keyof typeof MAX) {
  return String(formData.get(naam) ?? '').trim().slice(0, MAX[naam])
}

export async function verstuurContactbericht(
  _vorige: ContactStatus,
  formData: FormData
): Promise<ContactStatus> {
  // Honeypot: een verborgen veld dat mensen niet zien en bots wel invullen.
  // Doe alsof het gelukt is, zodat de bot geen reden heeft het opnieuw te proberen.
  if (String(formData.get('website') ?? '') !== '') return { soort: 'gelukt' }

  const naam = veld(formData, 'naam')
  const organisatie = veld(formData, 'organisatie')
  const email = veld(formData, 'email')
  const bericht = veld(formData, 'bericht')
  const waarden = { naam, organisatie, email, bericht }

  if (!naam || !email || !bericht) {
    return { soort: 'fout', melding: 'Vul uw naam, e-mailadres en bericht in.', waarden }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { soort: 'fout', melding: 'Dit e-mailadres lijkt niet te kloppen.', waarden }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contactformulier: RESEND_API_KEY ontbreekt, bericht niet verstuurd.')
    return { soort: 'fout', melding: 'Versturen lukt op dit moment niet. Probeer het later opnieuw.', waarden }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: AFZENDER,
    to: [ONTVANGER],
    replyTo: email,
    subject: `Contactformulier mijnoliver.nl: ${naam}${organisatie ? ` (${organisatie})` : ''}`,
    text: [
      `Naam: ${naam}`,
      `E-mail: ${email}`,
      ...(organisatie ? [`Organisatie: ${organisatie}`] : []),
      '',
      bericht,
    ].join('\n'),
  })

  if (error) {
    console.error('Contactformulier: Resend-fout:', error.name, error.message)
    return { soort: 'fout', melding: 'Versturen is niet gelukt. Probeer het later opnieuw.', waarden }
  }

  return { soort: 'gelukt' }
}
