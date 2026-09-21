'use server'

import { Resend } from 'resend'

// Het ontvangstadres staat alleen hier, server-side, zodat spambots het niet
// van de pagina kunnen schrapen. Tijdens de preview gaan berichten naar
// Laura-Ann; bij livegang UNITEDVISIONS_CONTACT_ONTVANGER=info@unitedvisions.nl.
const ONTVANGER = process.env.UNITEDVISIONS_CONTACT_ONTVANGER ?? 'laura-ann.mulder@outlook.com'
// onboarding@resend.dev werkt zonder eigen domein, maar mailt alleen naar de
// eigenaar van het Resend-account. Na verificatie van unitedvisions.nl in
// Resend: 'United Visions <website@unitedvisions.nl>'.
const AFZENDER = process.env.UNITEDVISIONS_AFZENDER ?? 'United Visions website <onboarding@resend.dev>'

export type ContactWaarden = {
  naam: string
  email: string
  telefoon: string
  onderwerp: string
  datum: string
  bericht: string
}

// Bij een fout gaan de ingevulde waarden mee terug: React leegt het formulier
// na elke action, en niemand wil zijn bericht opnieuw typen.
export type ContactStatus =
  | { soort: 'leeg' }
  | { soort: 'gelukt' }
  | { soort: 'fout'; melding: string; waarden: ContactWaarden }

const MAX = { naam: 200, email: 320, telefoon: 40, onderwerp: 40, datum: 40, bericht: 5000 }

function veld(formData: FormData, naam: keyof typeof MAX) {
  return String(formData.get(naam) ?? '').trim().slice(0, MAX[naam])
}

export async function verstuurAanvraag(_vorige: ContactStatus, formData: FormData): Promise<ContactStatus> {
  // Honeypot: onzichtbaar voor mensen, bots vullen het wel in. Doe alsof het
  // gelukt is, zodat de bot geen reden heeft het opnieuw te proberen.
  if (String(formData.get('website') ?? '') !== '') return { soort: 'gelukt' }

  const waarden: ContactWaarden = {
    naam: veld(formData, 'naam'),
    email: veld(formData, 'email'),
    telefoon: veld(formData, 'telefoon'),
    onderwerp: veld(formData, 'onderwerp'),
    datum: veld(formData, 'datum'),
    bericht: veld(formData, 'bericht'),
  }
  const { naam, email, telefoon, onderwerp, datum, bericht } = waarden

  if (!naam || !email || !bericht) {
    return { soort: 'fout', melding: 'Vul uw naam, e-mailadres en vraag in.', waarden }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { soort: 'fout', melding: 'Dit e-mailadres lijkt niet te kloppen.', waarden }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contactformulier: RESEND_API_KEY ontbreekt, bericht niet verstuurd.')
    return { soort: 'fout', melding: 'Versturen lukt op dit moment niet. Bel of mail ons gerust direct.', waarden }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: AFZENDER,
    to: [ONTVANGER],
    replyTo: email,
    subject: `Aanvraag via de website${onderwerp ? ` (${onderwerp})` : ''}: ${naam}`,
    text: [
      `Naam: ${naam}`,
      `E-mail: ${email}`,
      ...(telefoon ? [`Telefoon: ${telefoon}`] : []),
      ...(onderwerp ? [`Onderwerp: ${onderwerp}`] : []),
      ...(datum ? [`Datum: ${datum}`] : []),
      '',
      bericht,
    ].join('\n'),
  })

  if (error) {
    console.error('Contactformulier: Resend-fout:', error.name, error.message)
    return { soort: 'fout', melding: 'Versturen is niet gelukt. Probeer het later opnieuw, of bel ons.', waarden }
  }

  return { soort: 'gelukt' }
}
