'use client'

import { useActionState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { verstuurContactbericht, type ContactStatus } from '@/app/contact/actions'
import { Knop, Melding, invoerClass, labelClass } from './ui'

const BEGIN: ContactStatus = { soort: 'leeg' }

export function ContactFormulier() {
  const [status, verstuur, bezig] = useActionState(verstuurContactbericht, BEGIN)

  if (status.soort === 'gelukt') {
    return (
      <div className="flex flex-col items-start gap-3 py-6">
        <CheckCircle2 className="size-8 text-merk-accent" aria-hidden />
        <h3 className="text-xl font-semibold tracking-tight">Bedankt voor uw bericht</h3>
        <p className="text-merk-zacht">We nemen zo snel mogelijk contact met u op.</p>
      </div>
    )
  }

  const waarden = status.soort === 'fout' ? status.waarden : undefined

  return (
    // De key forceert een verse render met de teruggegeven waarden na een fout.
    <form key={JSON.stringify(waarden)} action={verstuur} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-naam" className={labelClass}>Naam</label>
          <input id="contact-naam" name="naam" defaultValue={waarden?.naam} required maxLength={200} autoComplete="name" className={invoerClass} />
        </div>
        <div>
          <label htmlFor="contact-organisatie" className={labelClass}>
            Organisatie <span className="font-normal text-merk-zacht">(optioneel)</span>
          </label>
          <input id="contact-organisatie" name="organisatie" defaultValue={waarden?.organisatie} maxLength={200} autoComplete="organization" className={invoerClass} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>E-mailadres</label>
        <input id="contact-email" name="email" defaultValue={waarden?.email} type="email" required maxLength={320} autoComplete="email" className={invoerClass} />
      </div>
      <div>
        <label htmlFor="contact-bericht" className={labelClass}>Bericht</label>
        <textarea
          id="contact-bericht"
          name="bericht"
          defaultValue={waarden?.bericht}
          required
          rows={5}
          maxLength={5000}
          placeholder="Waar kunnen we u mee helpen?"
          className={`${invoerClass} resize-y`}
        />
      </div>

      {/* Honeypot: onzichtbaar voor mensen, zie verstuurContactbericht. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.soort === 'fout' && <Melding soort="fout">{status.melding}</Melding>}

      <Knop type="submit" disabled={bezig} className="self-start px-6 py-3">
        {bezig ? 'Versturen…' : 'Verstuur bericht'}
      </Knop>
    </form>
  )
}
